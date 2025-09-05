import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  MobileStepper,
  Button,
} from "@mui/material";

import huzaifa from "../assets/huzaifa.jpg";
import inshera from "../assets/inshera.jpg";

const testimonials = [
  {
    name: "Inshera",
    text: "I’m really thankful to my Chemistry teacher for her constant support during my Unit 1 AS-level IAL exam prep. She helped me work through challenging past paper questions, gave chapter-wise tests, and reviewed each one with detailed feedback. Her guidance cleared all my doubts, boosted my confidence, and helped me achieve a great score. I improved a lot in Chemistry thanks to her dedication and support.",
    subject: "Edexcel, AS Level Chemistry",
    img: inshera,
  },
  {
    name: "Maha",
    text: "Learning with Miss Fatima Hayat has been an incredibly enlightening experience. She made understanding complex topics very easy, especially organic chemistry. I appreciate the constant practice and tests especially during harder topics. I’ve learned a great deal and am glad I got the opportunity to be accompanied by her. If you’re looking for a great teacher to guide you, I’d say she’s the way to go.",
    subject: "Edexcel, IGCSE Chemistry",
    img: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Huzaifa",
    text: "Ma’am Fatima is truly exceptional – she makes even the hardest concepts crystal clear. Her teaching style is engaging, structured, and always tailored to my needs. Thanks to her, my confidence and grades in Chemistry have improved drastically. ",
    subject: "Cambridge, AS Level Chemistry",
    img: huzaifa,
  },
];

export default function Testimonials() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = testimonials.length;

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
    }, 6000); // was 4000
    return () => clearInterval(timer);
  }, [maxSteps]);

  return (
    <Box sx={{ py: 10, px: { xs: 2, sm: 4 }, bgcolor: "#e0f9fc" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 5, fontWeight: "bold", color: "#f48d65" }}
      >
        What My Students Say
      </Typography>

      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 3,
          borderRadius: 3,
          textAlign: "center",
          border: "3px solid #f48d65",
          boxShadow: "none",
          height: { xs: "auto", md: 360 }, // equal height on medium+ screens
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          transition: "all 0.6s ease-in-out", // smooth transition
        }}
      >
        <Avatar
          src={testimonials[activeStep].img}
          alt={testimonials[activeStep].name}
          sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
        />
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2, fontStyle: "italic" }}>
            "{testimonials[activeStep].text}"
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#f48d65" }} // Orange name
          >
            {testimonials[activeStep].name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#f48d65", fontWeight: 500 }} // Cyan subject
          >
            {testimonials[activeStep].subject}
          </Typography>
        </CardContent>
      </Card>

      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          justifyContent: "center",
          bgcolor: "transparent",
          mt: 3,
          "& .MuiMobileStepper-dot": {
            backgroundColor: "#f48d65", // Orange inactive dots
            opacity: 0.5,
          },
          "& .MuiMobileStepper-dotActive": {
            backgroundColor: "#f48d65", // Orange active dot
            opacity: 1,
          },
        }}
        backButton={null}
        nextButton={null}
      />

      {/* Book Demo Button */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f48d65",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            "&:hover": { backgroundColor: "#fbdb75", color: "#333" },
          }}
          onClick={() =>
            window.open("https://calendly.com/scholars_haven/30min", "_blank")
          }
        >
          Book a Free Demo Class
        </Button>
      </Box>
    </Box>
  );
}
