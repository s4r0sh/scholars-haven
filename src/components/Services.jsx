import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import examHelpImg from "../assets/exam_help.jpg";
import homeworkHelpImg from "../assets/homework_help.jpg";
import tutoringImg from "../assets/tutoring.webp";

export default function Services() {
  const services = [
    {
      title: "Exam Prep",
      price: "£15 / hour",
      description:
        "Structured practice with past papers and revision strategies including topic-wise quizzes to sharpen exam technique and boost grades. Focused on exam-style thinking and time management.",
      image: examHelpImg,
    },
    {
      title: "Homework Help",
      price: "£10 / hour",
      description:
        "Step-by-step guidance on school assignments and tricky questions. Explanation of concepts while helping you complete your homework, building problem-solving confidence. Feel free to ask questions you were too afraid to ask in the classroom.",
      image: homeworkHelpImg,
    },
    {
      title: "Complete Syllabus Tutoring",
      price: "£12 / hour",
      description:
        "Step-by-step coverage of the entire syllabus with clear explanations, ensuring strong foundations and exam readiness. Personalized lessons tailored to your learning pace and goals, with complete attention on your needs to ensure mastery in every chapter.",
      image: tutoringImg,
    },
  ];

  return (
    <Box
      id="services"
      sx={{
        width: "100vw",
        minHeight: "100vh",
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
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 6, color: "text.primary" }}
      >
        Services
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 4,
          width: "100%",
          maxWidth: "1400px",
        }}
      >
        {services.map((service, idx) => (
          <Card
            key={idx}
            sx={{
              flex: 1,
              borderRadius: "16px",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0px 8px 30px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={service.image}
              alt={service.title}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "medium", mb: 2, color: "primary.main" }}
              >
                {service.price}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                {service.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
