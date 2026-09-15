import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";

const SUBJECTS = [
  {
    name: "Mathematics",
    accent: "#28d2e4",
    blurb:
      "Build the reasoning behind the method — why a technique works, not just how to apply it — so unfamiliar problems stop feeling unfamiliar.",
    levels: "GCSE · IGCSE · AS & A Level",
  },
  {
    name: "Physics",
    accent: "#f48d65",
    blurb:
      "Connect the equation to what's actually happening physically, with an engineer's problem-solving mindset behind every explanation.",
    levels: "GCSE · IGCSE · AS & A Level",
  },
  {
    name: "Chemistry",
    accent: "#fbdb75",
    blurb:
      "Understand the principles behind chemical behaviour, paired with exam strategy, so marks aren't lost to technique rather than knowledge.",
    levels: "O & A Levels · Edexcel · Cambridge · AQA · OCR",
  },
  {
    name: "Biology",
    accent: "#28d2e4",
    blurb:
      "Grasp complex concepts with clarity rather than relying on memorisation, building both grades and a genuine interest in the subject.",
    levels: "O & A Levels · Edexcel · Cambridge · AQA · OCR",
  },
];

export default function Subjects() {
  return (
    <Box
      id="subjects"
      sx={{
        width: "100%",
        bgcolor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 6, md: 10 },
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ maxWidth: "800px", textAlign: "center", mb: { xs: 5, md: 7 } }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          <Box component="span" sx={{ color: "#28d2e4" }}>
            Our
          </Box>{" "}
          <Box component="span" sx={{ color: "#f48d65" }}>
            STEM Subjects
          </Box>
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#333" }}>
          Four subjects, taught as one connected way of thinking — not four separate boxes to tick.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 3,
          width: "100%",
          maxWidth: "1300px",
        }}
      >
        {SUBJECTS.map((subject) => (
          <Box
            key={subject.name}
            sx={{
              borderRadius: "16px",
              border: "1px solid #eee",
              borderTop: `4px solid ${subject.accent}`,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: subject.accent }}>
              {subject.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#555", lineHeight: 1.7, flexGrow: 1 }}>
              {subject.blurb}
            </Typography>
            <Chip
              label={subject.levels}
              size="small"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "#f5f5f5",
                color: "#666",
                fontSize: "0.7rem",
                height: "auto",
                py: 0.5,
                "& .MuiChip-label": { whiteSpace: "normal", px: 1 },
              }}
            />
          </Box>
        ))}
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: { xs: 5, md: 6 } }}>
        <Typography variant="body2" sx={{ color: "#888", textAlign: "center", maxWidth: 560 }}>
          Whichever subject your child starts with, the same approach carries through: understand it,
          reason through it, apply it, and solve problems independently.
        </Typography>
      </Stack>
    </Box>
  );
}
