import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import dp from "../assets/dp.jpg"; // adjust path if needed

export default function About() {
  return (
    <Box
      id="about"
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#fff3e0", // light orange background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 6, md: 10 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "1400px",
          width: "100%",
        }}
      >
        {/* Image */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src={dp}
            alt="Profile"
            style={{
              width: "100%",
              maxWidth: "350px",
              borderRadius: "16px",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              border: "4px solid #28d2e4", // accent border
            }}
          />
        </Box>

        {/* Text */}
        <Box sx={{ flex: 2 }}>
          {/* Heading */}
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
            <Box component="span" sx={{ color: "#28d2e4" }}>
              About
            </Box>{" "}
            <Box component="span" sx={{ color: "#f48d65" }}>
              Me
            </Box>
          </Typography>

          {/* Paragraph */}
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.1rem" },
              color: "#333",
              mb: 3,
            }}
          >
            I graduated at the top of my class with a degree in{" "}
            <Box component="span" sx={{ color: "#28d2e4", fontWeight: "600" }}>
              Biotechnology
            </Box>
            , driven by a passion for understanding life at the molecular level.
            Being a Conventarian myself, I understand the pressures faced by
            students in first-rate schools and know how to navigate them to take
            a balanced approach to life and studies. For the past eight years, I
            have dedicated myself to teaching{" "}
            <Box component="span" sx={{ color: "#f48d65", fontWeight: "600" }}>
              Chemistry
            </Box>{" "}
            and{" "}
            <Box component="span" sx={{ color: "#f48d65", fontWeight: "600" }}>
              Biology
            </Box>{" "}
            to O and A Levels students, helping them grasp complex concepts with
            clarity and confidence. My approach combines subject expertise with
            proven exam strategies, enabling students not only to improve their
            grades but also to build a genuine love for science.
          </Typography>

          {/* Exam Boards Chips */}
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Chip
              label="Edexcel"
              sx={{ bgcolor: "#28d2e4", color: "#fff", fontWeight: "bold" }}
            />
            <Chip
              label="Cambridge"
              sx={{ bgcolor: "#fbdb75", color: "#333", fontWeight: "bold" }}
            />
            <Chip
              label="AQA"
              sx={{ bgcolor: "#f48d65", color: "#fff", fontWeight: "bold" }}
            />
            <Chip
              label="OCR"
              sx={{ bgcolor: "#28d2e4", color: "#fff", fontWeight: "bold" }}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
