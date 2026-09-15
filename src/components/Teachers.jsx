import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import fatimaPhoto from "../assets/dp.jpg";
import saroshPhoto from "../assets/sarosh.webp";

function TeacherProfile({ photo, alt, reverse, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6,
        flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" },
        maxWidth: "1400px",
        width: "100%",
        mb: { xs: 8, md: 10 },
      }}
    >
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Box
          component="img"
          src={photo}
          alt={alt}
          sx={{
            width: "100%",
            maxWidth: "350px",
            aspectRatio: "350 / 403",
            objectFit: "cover",
            objectPosition: "top center",
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            border: "4px solid #28d2e4",
            display: "block",
          }}
        />
      </Box>
      <Box sx={{ flex: 2 }}>{children}</Box>
    </Box>
  );
}

export default function Teachers() {
  return (
    <Box
      id="teachers"
      sx={{
        width: "100%",
        bgcolor: "#fff3e0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 6, md: 10 },
        boxSizing: "border-box",
      }}
    >
      {/* Unifying intro */}
      <Box sx={{ maxWidth: "900px", textAlign: "center", mb: { xs: 6, md: 8 } }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          <Box component="span" sx={{ color: "#28d2e4" }}>
            Different subjects.
          </Box>{" "}
          <Box component="span" sx={{ color: "#f48d65" }}>
            One way of learning.
          </Box>
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, fontSize: { xs: "1rem", md: "1.1rem" }, color: "#333" }}
        >
          Whether it's algebra, mechanics, organic chemistry or genetics, the goal at Scholar's Haven
          is always the same: understand it, reason through it, apply it, and solve problems
          independently — not just memorise the answer. Mathematics, Physics, Chemistry and Biology
          are taught here as one connected way of thinking, by two teachers who share that same
          philosophy.
        </Typography>
      </Box>

      {/* Fatima */}
      <TeacherProfile photo={fatimaPhoto} alt="Fatima Hayat">
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          <Box component="span" sx={{ color: "#28d2e4" }}>
            Fatima
          </Box>{" "}
          <Box component="span" sx={{ color: "#f48d65" }}>
            Hayat
          </Box>
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#666", mb: 2 }}>
          Chemistry & Biology
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, fontSize: { xs: "1rem", md: "1.1rem" }, color: "#333", mb: 3 }}
        >
          I graduated at the top of my class with a degree in{" "}
          <Box component="span" sx={{ color: "#28d2e4", fontWeight: "600" }}>
            Biotechnology
          </Box>
          , driven by a passion for understanding life at the molecular level. Being a Conventarian
          myself, I understand the pressures faced by students in first-rate schools and know how to
          navigate them to take a balanced approach to life and studies. For the past eight years, I
          have dedicated myself to teaching{" "}
          <Box component="span" sx={{ color: "#f48d65", fontWeight: "600" }}>
            Chemistry
          </Box>{" "}
          and{" "}
          <Box component="span" sx={{ color: "#f48d65", fontWeight: "600" }}>
            Biology
          </Box>{" "}
          to O and A Levels students, helping them grasp complex concepts with clarity and
          confidence. My approach combines subject expertise with proven exam strategies, enabling
          students not only to improve their grades but also to build a genuine love for science.
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Chip label="Edexcel" sx={{ bgcolor: "#28d2e4", color: "#fff", fontWeight: "bold" }} />
          <Chip label="Cambridge" sx={{ bgcolor: "#fbdb75", color: "#333", fontWeight: "bold" }} />
          <Chip label="AQA" sx={{ bgcolor: "#f48d65", color: "#fff", fontWeight: "bold" }} />
          <Chip label="OCR" sx={{ bgcolor: "#28d2e4", color: "#fff", fontWeight: "bold" }} />
        </Stack>
      </TeacherProfile>

      {/* Sarosh */}
      <TeacherProfile photo={saroshPhoto} alt="Sarosh Muhammad" reverse>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          <Box component="span" sx={{ color: "#28d2e4" }}>
            Sarosh
          </Box>{" "}
          <Box component="span" sx={{ color: "#f48d65" }}>
            Muhammad
          </Box>
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#666", mb: 2 }}>
          Engineer | Mathematics & Physics
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, fontSize: { xs: "1rem", md: "1.1rem" }, color: "#333", mb: 3 }}
        >
          Sarosh is an{" "}
          <Box component="span" sx={{ color: "#28d2e4", fontWeight: "600" }}>
            engineer
          </Box>{" "}
          with a professional background spanning aviation, engineering systems and reliability, and
          holds{" "}
          <Box component="span" sx={{ color: "#f48d65", fontWeight: "600" }}>
            CMRP
          </Box>{" "}
          (Certified Maintenance & Reliability Professional) certification. His approach to{" "}
          <Box component="span" sx={{ color: "#f48d65", fontWeight: "600" }}>
            Mathematics
          </Box>{" "}
          and{" "}
          <Box component="span" sx={{ color: "#f48d65", fontWeight: "600" }}>
            Physics
          </Box>{" "}
          is grounded in understanding how things actually work — not memorising formulas. He brings
          an engineer's problem-solving mindset into every lesson.
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Chip label="Engineer" sx={{ bgcolor: "#28d2e4", color: "#fff", fontWeight: "bold" }} />
          <Chip label="CMRP Certified" sx={{ bgcolor: "#fbdb75", color: "#333", fontWeight: "bold" }} />
        </Stack>
      </TeacherProfile>
    </Box>
  );
}
