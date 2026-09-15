import React from "react";
import { motion } from "framer-motion";
import { Typography, Box, Stack } from "@mui/material";
import beaker from "../assets/beaker.svg";
import dna from "../assets/dna2.svg";

// Rocket points "up" (nose at top, exhaust at bottom) in its own local coordinates.
function RocketSVG({ size }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size, display: "block" }}>
      <path d="M50 5 C65 20, 70 45, 65 65 L35 65 C30 45, 35 20, 50 5 Z" fill="#f48d65" />
      <circle cx="50" cy="35" r="8" fill="#fff" />
      <path d="M35 65 L20 85 L35 75 Z" fill="#28d2e4" />
      <path d="M65 65 L80 85 L65 75 Z" fill="#28d2e4" />
      <motion.path
        d="M42 65 L50 90 L58 65 Z"
        fill="#fbdb75"
        animate={{ scaleY: [1, 1.3, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 65px" }}
      />
    </svg>
  );
}

// Builds a wobbly, irregular loop (not a perfect ellipse) around the origin.
function buildOrbitPoints(rx, ry, count) {
  const pts = [];
  for (let i = 0; i <= count; i++) {
    const a = (i / count) * Math.PI * 2;
    // layered wobble so the path isn't a clean ellipse
    const wobble = 1 + 0.16 * Math.sin(3 * a + 0.6) + 0.08 * Math.sin(5 * a);
    pts.push({
      x: rx * wobble * Math.cos(a),
      y: ry * wobble * Math.sin(a),
    });
  }
  return pts;
}

// Flies the rocket around an irregular loop centered on its parent: nose points
// the direction of travel, exhaust trails behind, and it alternates in front of /
// behind the text depending on which half of the loop it's in. Leaves a dashed
// trail along its own path.
function OrbitingRocket({ rx, ry, size, duration, sx }) {
  const COUNT = 48;
  const pts = buildOrbitPoints(rx, ry, COUNT);

  const x = pts.map((p) => Math.round(p.x));
  const y = pts.map((p) => Math.round(p.y));
  const zIndex = pts.map((p) => (p.y >= 0 ? 5 : 1));

  // Rotation derived from the actual direction of travel between consecutive
  // points, so the nose always leads and the exhaust always trails — works for
  // any path shape, not just a perfect ellipse.
  const rotate = pts.map((p, i) => {
    const next = pts[(i + 1) % pts.length];
    const dx = next.x - p.x;
    const dy = next.y - p.y;
    return (Math.atan2(dy, dx) * 180) / Math.PI + 90; // +90 because the SVG's nose points "up"
  });

  // Dashed trail: a static SVG path tracing the same loop the rocket flies.
  const pad = size + 10;
  const vbW = rx * 2.6 + pad;
  const vbH = ry * 2.6 + pad;
  const cx = vbW / 2;
  const cy = vbH / 2;
  const trailD =
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${(cx + p.x).toFixed(1)} ${(cy + p.y).toFixed(1)}`).join(" ") + " Z";

  return (
    <Box sx={{ position: "absolute", top: "50%", left: "50%", ...sx }}>
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        style={{
          position: "absolute",
          width: vbW,
          height: vbH,
          marginLeft: -vbW / 2,
          marginTop: -vbH / 2,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <path d={trailD} fill="none" stroke="#9aa5b1" strokeWidth="2" strokeDasharray="7 9" opacity="0.4" />
      </svg>
      <motion.div
        style={{ position: "absolute", marginLeft: -size / 2, marginTop: -size / 2 }}
        animate={{ x, y, rotate, zIndex }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
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
          gap: { xs: 1, md: 6 },
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
            py: { xs: 1, md: 2 },
          }}
        >
          {/* Desktop: giant, irregular oval orbit */}
          <OrbitingRocket rx={210} ry={95} size={74} duration={10} sx={{ display: { xs: "none", md: "block" } }} />
          {/* Mobile: smaller orbit hugging the text, bigger rocket than before */}
          <OrbitingRocket rx={100} ry={46} size={50} duration={7} sx={{ display: { xs: "block", md: "none" } }} />

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

        {/* Biology: DNA — bigger now (right flank on desktop, last on mobile) */}
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
