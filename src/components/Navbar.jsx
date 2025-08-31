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
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const navLinks = ["About", "Services", "Contact"];

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
              key={link}
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                "&:hover": { color: "#1a237e", backgroundColor: "transparent" },
              }}
            >
              {link}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for Mobile */}
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <List sx={{ width: 200 }}>
            {navLinks.map((text) => (
              <ListItem button key={text} onClick={toggleDrawer(false)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
