import React from "react";
import { motion, useTime, useTransform } from "framer-motion";
import { Typography, Box, Stack } from "@mui/material";
import beaker from "../assets/beaker.svg";
import dna from "../assets/dna2.svg";

// 15 mathematical symbols — a mix of Greek letters and other math notation.
const SYMBOLS = ["\u03c0", "\u03a3", "\u03b8", "\u0394", "\u03bb", "\u03a9", "\u03c6", "\u03b1", "\u222b", "\u221e", "\u221a", "\u2202", "\u00b1", "\u2207", "\u2248"];

// Irregular (wobbly) radius multiplier at angle a — shared by the rocket and its exhaust,
// so everything follows the exact same non-uniform loop instead of a clean ellipse.
function wobble(a) {
  return 1 + 0.16 * Math.sin(3 * a + 0.6) + 0.08 * Math.sin(5 * a);
}
function orbitXY(a, rx, ry) {
  const w = wobble(a);
  return { x: rx * w * Math.cos(a), y: ry * w * Math.sin(a) };
}

// Rocket points "up" (nose at top, exhaust at bottom) in its own local coordinates.
function RocketSVG({ size }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size, display: "block", overflow: "visible" }}>
      <path d="M50 5 C65 20, 70 45, 65 65 L35 65 C30 45, 35 20, 50 5 Z" fill="#f48d65" />
      <circle cx="50" cy="35" r="8" fill="#fff" />
      <path d="M35 65 L20 85 L35 75 Z" fill="#28d2e4" />
      <path d="M65 65 L80 85 L65 75 Z" fill="#28d2e4" />
      {/* exhaust flame */}
      <motion.path
        d="M42 65 L50 92 L58 65 Z"
        fill="#fbdb75"
        animate={{ scaleY: [1, 1.35, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 65px" }}
      />
    </svg>
  );
}

// One exhaust symbol: ejected from the flame at a fixed point on the loop (wherever the
// rocket happens to be at that moment in its cycle). It does NOT keep travelling with the
// rocket — it stays put right there, starts tiny, grows steadily larger, spins slowly, and
// fades out toward the end of its life, before firing again next lap.
function ExhaustSymbol({ rx, ry, size, time, duration, spawnAngle, delaySeconds, life, symbol }) {
  const spawnPos = orbitXY(spawnAngle, rx, ry);

  const age = useTransform(time, (t) => {
    const cyclePos = (((t / 1000 - delaySeconds) % duration) + duration) % duration;
    return Math.min(cyclePos / life, 1);
  });
  // super tiny at birth, grows across most of its life, fades right at the end
  const scale = useTransform(age, [0, 0.35, 1], [0.05, 0.9, 1.7]);
  const opacity = useTransform(age, [0, 0.08, 0.82, 1], [0, 1, 1, 0]);
  // slow continuous spin while it grows
  const rotate = useTransform(age, (a) => a * 260);
  const zIndex = spawnPos.y >= 0 ? 4 : 0;

  return (
    <motion.div
      style={{
        position: "absolute",
        x: spawnPos.x,
        y: spawnPos.y,
        marginLeft: -size * 0.22,
        marginTop: -size * 0.22,
        opacity,
        scale,
        rotate,
        zIndex,
        fontSize: size * 0.42,
        fontWeight: 300,
        fontFamily: "'Georgia', serif",
        color: "#9aa5b1",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {symbol}
    </motion.div>
  );
}

// Flies the rocket around an irregular loop centered on its parent. Position is driven
// by a continuously-computed parametric function (not preset keyframes), so rotation
// is always the true instantaneous direction of travel — no wraparound, no somersault.
// Progress is quantized into discrete steps so the motion visibly moves in small
// increments rather than gliding smoothly. 15 math symbols are ejected from the exhaust
// flame at fixed points all around the loop, each growing and slowly spinning in place.
function OrbitingRocket({ rx, ry, size, duration, steps = 30, sx }) {
  const time = useTime();
  const rawProgress = useTransform(time, (t) => (t / 1000 / duration) % 1);
  const progress = useTransform(rawProgress, (p) => Math.floor(p * steps) / steps);
  const angle = useTransform(progress, (p) => p * Math.PI * 2);

  const x = useTransform(angle, (a) => orbitXY(a, rx, ry).x);
  const y = useTransform(angle, (a) => orbitXY(a, rx, ry).y);
  const zIndex = useTransform(y, (yv) => (yv >= 0 ? 5 : 1));
  const rotate = useTransform(angle, (a) => {
    const EPS = 0.02;
    const p1 = orbitXY(a, rx, ry);
    const p2 = orbitXY(a + EPS, rx, ry);
    return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI + 90; // +90: SVG nose points "up"
  });

  const puffCount = SYMBOLS.length;
  const puffLife = duration * 0.55;

  return (
    <Box sx={{ position: "absolute", top: "50%", left: "50%", ...sx }}>
      {SYMBOLS.map((symbol, i) => (
        <ExhaustSymbol
          key={i}
          rx={rx}
          ry={ry}
          size={size}
          time={time}
          duration={duration}
          spawnAngle={(i / puffCount) * Math.PI * 2}
          delaySeconds={(i / puffCount) * duration}
          life={puffLife}
          symbol={symbol}
        />
      ))}
      <motion.div
        style={{
          position: "absolute",
          x,
          y,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          rotate,
          zIndex,
        }}
      >
        <RocketSVG size={size} />
      </motion.div>
    </Box>
  );
}

export default function Cover() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
        overflowY: "hidden",
        pt: { xs: 10, md: 8 },
        pb: { xs: 6, md: 4 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 6 },
          width: "100%",
          maxWidth: "1300px",
          px: { xs: 2, md: 8 },
          mx: "auto",
        }}
      >
        {/* Chemistry: beaker + bubbles (left flank on desktop, first on mobile) */}
        <Box sx={{ flex: "0 0 auto", textAlign: "center" }}>
          <Box sx={{ position: "relative", width: 190, height: 280, mx: "auto" }}>
            <img
              src={beaker}
              alt="beaker"
              style={{
                width: "100%",
                height: "70%",
                objectFit: "contain",
                position: "absolute",
                bottom: 0,
                left: 0,
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "30%",
                left: 0,
                right: 0,
                height: "100%",
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: ["#28d2e4", "#fbdb75", "#f48d65", "#4caf50"][i % 4],
                    left: `${10 + i * 20}px`,
                    zIndex: 1,
                  }}
                  animate={{ y: [0, -150], opacity: [1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Physics + headline: rocket orbits the text (second on mobile, center on desktop) */}
        <Box
          sx={{
            position: "relative",
            flex: "1 1 380px",
            minWidth: 0,
            display: "flex",
            justifyContent: "center",
            py: { xs: 0, md: 2 },
          }}
        >
          {/* Desktop: giant, irregular oval orbit — rocket 50% bigger */}
          <OrbitingRocket rx={210} ry={95} size={111} duration={10} sx={{ display: { xs: "none", md: "block" } }} />
          {/* Mobile: enlarged orbit, rocket 100% bigger (double) */}
          <OrbitingRocket rx={175} ry={145} size={100} duration={9} sx={{ display: { xs: "block", md: "none" } }} />

          <Box sx={{ position: "relative", zIndex: 3, textAlign: "center", maxWidth: 460 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" } }}
            >
              <Box component="span" sx={{ color: "#28d2e4", mr: 1 }}>
                Understand
              </Box>
              <Box component="span" sx={{ color: "#fbdb75" }}>
                STEM.
              </Box>
            </Typography>

            <Typography variant="h6" gutterBottom>
              Don't just memorise it — personalised Mathematics, Physics, Chemistry and
              Biology tutoring, taught by real teachers.
            </Typography>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mt: 2, flexWrap: "wrap" }}
            >
              <Typography variant="subtitle1" sx={{ color: "#28d2e4" }}>
                GCSE
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#fbdb75" }}>
                |
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#f48d65" }}>
                IGCSE
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#fbdb75" }}>
                |
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#28d2e4" }}>
                AS & A Level
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* Biology: DNA (right flank on desktop, last on mobile) */}
        <Box sx={{ flex: "0 0 auto", textAlign: "center" }}>
          <motion.img
            src={dna}
            alt="dna helix"
            style={{ width: 240, height: 240 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
