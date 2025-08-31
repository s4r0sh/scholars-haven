import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
} from "@mui/material";

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_j6jngvc", // 🔹 replace with EmailJS service ID
        "template_awkavnu", // 🔹 replace with EmailJS template ID
        form.current,
        "ApSvG38LO_jbNfsgU" // 🔹 replace with EmailJS public key
      )
      .then(
        (result) => {
          setStatus("success");
          form.current.reset();
        },
        (error) => {
          setStatus("error");
        }
      );
  };

  return (
    <Box
      id="contact"
      sx={{
        width: "100vw",
        bgcolor: "#fff3e0",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container>
        {/* Heading */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          <Box component="span" sx={{ color: "#28d2e4" }}>
            Contact
          </Box>{" "}
          <Box component="span" sx={{ color: "#f48d65" }}>
            Me
          </Box>
        </Typography>

        {/* Form */}
        <Box
          component="form"
          ref={form}
          onSubmit={sendEmail}
          sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            name="name"
            fullWidth
            label="Your Name"
            margin="normal"
            variant="outlined"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#28d2e4" },
                "&:hover fieldset": { borderColor: "#fbdb75" },
                "&.Mui-focused fieldset": { borderColor: "#f48d65" },
              },
            }}
          />
          <TextField
            name="email"
            fullWidth
            label="Your Email"
            type="email"
            margin="normal"
            variant="outlined"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#28d2e4" },
                "&:hover fieldset": { borderColor: "#fbdb75" },
                "&.Mui-focused fieldset": { borderColor: "#f48d65" },
              },
            }}
          />
          <TextField
            name="message"
            fullWidth
            label="Your Message"
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#28d2e4" },
                "&:hover fieldset": { borderColor: "#fbdb75" },
                "&.Mui-focused fieldset": { borderColor: "#f48d65" },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              bgcolor: "#28d2e4",
              "&:hover": { bgcolor: "#fbdb75", color: "#333" },
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Send Message
          </Button>

          {/* Success / Error Message */}
          {status === "success" && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Message sent successfully!
            </Alert>
          )}
          {status === "error" && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Oops! Something went wrong. Please try again.
            </Alert>
          )}
        </Box>
      </Container>
    </Box>
  );
}
