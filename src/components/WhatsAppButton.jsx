import React from "react";
import { Box, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WHATSAPP_NUMBER = "923200238206"; // +92 320 0238206
const DEFAULT_TEXT = "Hi Scholar's Haven, I'd like to know more about tutoring.";

export function whatsappLink(text = DEFAULT_TEXT) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function trackWhatsAppClick() {
  if (typeof window === "undefined") return;
  if (window.fbq) window.fbq("track", "Contact");
  if (window.gtag) window.gtag("event", "whatsapp_click");
}

// Floating WhatsApp button, fixed to the bottom-right of the viewport on every page.
export default function WhatsAppButton() {
  return (
    <Tooltip title="Message us on WhatsApp" placement="left">
      <Box
        component="a"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsAppClick}
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 28 },
          right: { xs: 20, md: 28 },
          width: 58,
          height: 58,
          borderRadius: "50%",
          bgcolor: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 4px 16px rgba(0,0,0,0.25)",
          zIndex: 1200,
          transition: "transform 0.2s ease",
          "&:hover": { transform: "scale(1.08)" },
        }}
      >
        <WhatsAppIcon sx={{ color: "#fff", fontSize: 32 }} />
      </Box>
    </Tooltip>
  );
}
