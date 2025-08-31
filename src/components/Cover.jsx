import React from "react";
import { motion } from "framer-motion";
import { Grid, Typography, Box, Stack } from "@mui/material";
import beaker from "../assets/beaker.svg";
import dna from "../assets/dna2.svg";

export default function Cover() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden", // ✅ stop horizontal scroll
        overflowY: "hidden", // ✅ no vertical scroll from bubbles
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          margin: 0,
          maxWidth: "100vw",
          px: 2,
        }}
      >
        {/* Left: Beaker + bubbles */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              position: "relative",
              width: 200,
              height: 250,
              mx: "auto",
            }}
          >
            {/* Beaker */}
            <img
              src={beaker}
              alt="beaker"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0,
              }}
            />

            {/* Floating bubbles */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
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
                    bottom: "40%",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: [
                      "#28d2e4", // cyan
                      "#fbdb75", // yellow
                      "#f48d65", // orange
                      "#4caf50", // green
                    ][i % 4],
                    left: `${20 + i * 20}px`,
                    zIndex: 1,
                  }}
                  animate={{ y: [0, -200], opacity: [1, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Middle: Headline + tagline + exam boards */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" } }}
          >
            <Box component="span" sx={{ color: "#28d2e4", mr: 1 }}>
              Making
            </Box>
            <Box component="span" sx={{ color: "#fbdb75", mr: 1 }}>
              Science
            </Box>
            <Box component="span" sx={{ color: "#f48d65" }}>
              Simple
            </Box>
          </Typography>

          <Typography variant="h6" gutterBottom>
            O & A Level Chemistry and Biology tutoring made engaging and easy.
          </Typography>

          {/* Exam board badges */}
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ mt: 2, flexWrap: "wrap" }}
          >
            <Typography variant="subtitle1" sx={{ color: "#28d2e4" }}>
              Cambridge
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#fbdb75" }}>
              |
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#f48d65" }}>
              Edexcel
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#fbdb75" }}>
              |
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#28d2e4" }}>
              AQA
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#fbdb75" }}>
              |
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#f48d65" }}>
              OCR
            </Typography>
          </Stack>
        </Grid>

        {/* Right: DNA animation */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <motion.img
            src={dna}
            alt="dna helix"
            style={{ width: 250, height: 250 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
