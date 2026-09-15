import React from "react";
import { motion } from "framer-motion";
import { Typography, Box, Stack } from "@mui/material";
import beaker from "../assets/beaker.svg";
import dna from "../assets/dna2.svg";

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

// Flies the rocket around an ellipse centered on its parent, alternating
// in front of / behind the text depending on which half of the orbit it's in.
function OrbitingRocket({ rx, ry, size, duration, sx }) {
  const POINTS = 28;
  const x = [];
  const y = [];
  const zIndex = [];
  for (let i = 0; i <= POINTS; i++) {
    const a = (i / POINTS) * Math.PI * 2;
    x.push(Math.round(rx * Math.cos(a)));
    y.push(Math.round(ry * Math.sin(a)));
    zIndex.push(Math.sin(a) >= 0 ? 5 : 1); // front on the bottom half, behind on the top half
  }

  return (
    <Box sx={{ position: "absolute", top: "50%", left: "50%", ...sx }}>
      <motion.div
        style={{ position: "absolute", marginLeft: -size / 2, marginTop: -size / 2 }}
        animate={{ x, y, zIndex }}
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
        pt: { xs: 10, md: 8 }, // clear the sticky navbar so bubbles have room to rise
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
          gap: { xs: 3, md: 3 },
          width: "100%",
          maxWidth: "1300px",
          px: 2,
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
            py: { xs: 5, md: 2 },
          }}
        >
          {/* Desktop: giant oval orbit */}
          <OrbitingRocket rx={210} ry={95} size={72} duration={9} sx={{ display: { xs: "none", md: "block" } }} />
          {/* Mobile: small orbit hugging the text closely */}
          <OrbitingRocket rx={95} ry={42} size={34} duration={6} sx={{ display: { xs: "block", md: "none" } }} />

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
            style={{ width: 190, height: 190 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
