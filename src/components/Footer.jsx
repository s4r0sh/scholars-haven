import React from "react";
import { Box, Typography, Link, IconButton, Container } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Email } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "#f48d65",
        color: "#fff",
        py: { xs: 6, md: 10 },
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        {/* Logo / Name */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
        >
          <Box component="span" sx={{ color: "#28d2e4" }}>
            Scholars'
          </Box>{" "}
          <Box component="span" sx={{ color: "#fbdb75" }}>
            Haven
          </Box>
        </Typography>

        {/* Social Links */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            mb: 3,
          }}
        >
          <IconButton
            component={Link}
            href="#"
            sx={{
              color: "#fff",
              bgcolor: "#28d2e4",
              "&:hover": { bgcolor: "#fbdb75" },
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            component={Link}
            href="#"
            sx={{
              color: "#fff",
              bgcolor: "#28d2e4",
              "&:hover": { bgcolor: "#fbdb75" },
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            component={Link}
            href="#"
            sx={{
              color: "#fff",
              bgcolor: "#28d2e4",
              "&:hover": { bgcolor: "#fbdb75" },
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            component={Link}
            href="mailto:youremail@example.com"
            sx={{
              color: "#fff",
              bgcolor: "#28d2e4",
              "&:hover": { bgcolor: "#fbdb75" },
            }}
          >
            <Email />
          </IconButton>
        </Box>

        {/* Copyright */}
        <Typography variant="body2" sx={{ color: "#fff" }}>
          &copy; {new Date().getFullYear()} Scholars' Haven. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
}
