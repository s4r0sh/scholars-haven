import React from "react";
import Navbar from "./components/Navbar";
import Cover from "./components/Cover";
import Subjects from "./components/Subjects";
import Teachers from "./components/Teachers";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

export default function App() {
  return (
    <Box>
      <Navbar />

      <Box id="cover">
        <Cover />
      </Box>
      <Box id="subjects">
        <Subjects />
      </Box>
      <Box id="teachers">
        <Teachers />
      </Box>
      <Box id="services">
        <Services />
      </Box>
      <Box id="testimonials">
        <Testimonials />
      </Box>
      <Box id="contact">
        <Contact />
      </Box>

      <Box id="footer">
        <Footer />
      </Box>
    </Box>
  );
}
