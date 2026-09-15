import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";

const services = [
  {
    title: "Exam Prep",
    price: "\u00a325 / hour",
    badge: "2-month crash course",
    accent: "#f48d65",
    icon: FactCheckIcon,
    description:
      "An intensive 2-month crash course in the run-up to exams \u2014 structured practice with past papers, topic-wise quizzes, and revision strategy to sharpen exam technique, tighten time management, and walk in confident.",
  },
  {
    title: "Homework Help",
    price: "\u00a312 / hour",
    badge: null,
    accent: "#28d2e4",
    icon: MenuBookIcon,
    description:
      "Step-by-step guidance on school assignments and tricky questions. Explanation of concepts while helping you complete your homework, building problem-solving confidence. Ask the questions you were too afraid to ask in the classroom.",
  },
  {
    title: "Complete Syllabus Tutoring",
    price: "\u00a315 / hour",
    badge: null,
    accent: "#fbdb75",
    icon: SchoolIcon,
    description:
      "Step-by-step coverage of the entire syllabus with clear explanations, ensuring strong foundations and exam readiness. Personalised lessons tailored to your learning pace and goals, with complete attention on your needs to ensure mastery in every chapter.",
  },
];

export default function Services() {
  return (
    <Box
      id="services"
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
            How
          </Box>{" "}
          <Box component="span" sx={{ color: "#f48d65" }}>
            Sessions Work
          </Box>
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#333" }}>
          Whichever subject or level, sessions take one of these three shapes — built around
          where the student actually is.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 4,
          width: "100%",
          maxWidth: "1300px",
        }}
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Box
              key={service.title}
              sx={{
                borderRadius: "16px",
                border: "1px solid #eee",
                borderTop: `4px solid ${service.accent}`,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "14px",
                  bgcolor: `${service.accent}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                <Icon sx={{ fontSize: 30, color: service.accent }} />
              </Box>

              <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary" }}>
                {service.title}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: service.accent }}>
                {service.price}
              </Typography>

              {service.badge && (
                <Chip
                  label={service.badge}
                  size="small"
                  sx={{
                    alignSelf: "flex-start",
                    bgcolor: `${service.accent}22`,
                    color: service.accent,
                    fontWeight: 600,
                  }}
                />
              )}

              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                {service.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
