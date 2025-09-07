import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(""); // track active link

  const toggleDrawer =
    (state, reset = false) =>
    () => {
      setOpen(state);
      if (reset) setActive(""); // reset active states when closing manually
    };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActive(id); // set clicked link as active
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        backgroundColor: "rgba(40, 210, 228, 0.85)",
        backdropFilter: "blur(8px)",
        color: "#fff",
        width: "100%",
        boxShadow: "none",
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        {/* Logo + Brand */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              borderRadius: "50%",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontFamily: "'Montserrat', sans-serif",
              color: "#1a237e",
              letterSpacing: 1,
            }}
          >
            Scholars' Haven
          </Typography>
        </Box>

        {/* Desktop Nav */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          {navLinks.map((link) => (
            <Button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                "&:hover": {
                  color: "#1a237e",
                  backgroundColor: "transparent",
                },
              }}
            >
              {link.label}
            </Button>
          ))}
          <Button
            href="https://calendly.com/scholars_haven/30min"
            target="_blank"
            sx={{
              ml: 2,
              fontWeight: "bold",
              color: "white",
              bgcolor: "#f48d65", // orange bg
              borderRadius: "30px",
              px: 2.5,
              textTransform: "none",
              "&:hover": { bgcolor: "#fbdb75", color: "#000" }, // yellow bg, black text
            }}
          >
            Book a Free Demo
          </Button>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for Mobile */}
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false, true)}>
          <Box
            sx={{
              width: 220,
              bgcolor: "#fbdb75",
              height: "100%",
              p: 2,
              display: "flex",
              flexDirection: "column",
              position: "relative", // needed for absolute footer
            }}
          >
            {/* Close Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={toggleDrawer(false, true)}>
                <CloseIcon sx={{ color: "#f48d65" }} />
              </IconButton>
            </Box>

            {/* Links */}
            <List sx={{ flexGrow: 1 }}>
              {navLinks.map((link) => (
                <ListItem
                  button
                  key={link.id}
                  onClick={() => {
                    handleScroll(link.id);
                    toggleDrawer(false)();
                  }}
                  sx={{
                    mb: 1,
                    borderRadius: "8px",
                    textAlign: "center",
                    bgcolor: active === link.id ? "transparent" : "#f48d65",
                    color: active === link.id ? "#f48d65" : "white",
                    border: active === link.id ? "2px solid #f48d65" : "none",
                    "&:hover": { opacity: 0.85 },
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}

              {/* Free Demo in Mobile */}
              <ListItem
                button
                component="a"
                href="https://calendly.com/scholars_haven/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setActive("demo");
                  toggleDrawer(false)();
                }}
                sx={{
                  borderRadius: "8px",
                  mt: 2,
                  textAlign: "center",
                  bgcolor: active === "demo" ? "transparent" : "#28d2e4",
                  color: active === "demo" ? "#28d2e4" : "white",
                  border: active === "demo" ? "2px solid #28d2e4" : "none",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                <ListItemText primary="Book a Free Demo" />
              </ListItem>
            </List>

            {/* Footer - pinned at bottom */}
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 0,
                width: "100%",
                textAlign: "center",
                color: "#e65100",
                fontWeight: "bold",
              }}
            >
              <Typography variant="body2">
                © 2025 Scholars' Haven
                <br />
                All rights reserved.
              </Typography>
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
