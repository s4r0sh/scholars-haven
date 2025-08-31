import React from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";

export default function Contact() {
  return (
    <Box
      id="contact"
      sx={{
        width: "100vw",
        bgcolor: "#fff3e0", // light orange background
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
            fullWidth
            label="Your Name"
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#28d2e4" },
                "&:hover fieldset": { borderColor: "#fbdb75" },
                "&.Mui-focused fieldset": { borderColor: "#f48d65" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Your Email"
            type="email"
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#28d2e4" },
                "&:hover fieldset": { borderColor: "#fbdb75" },
                "&.Mui-focused fieldset": { borderColor: "#f48d65" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Your Message"
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#28d2e4" },
                "&:hover fieldset": { borderColor: "#fbdb75" },
                "&.Mui-focused fieldset": { borderColor: "#f48d65" },
              },
            }}
          />
          <Button
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
        </Box>
      </Container>
    </Box>
  );
}
