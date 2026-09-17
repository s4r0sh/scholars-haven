import React, { useState } from "react";
import emailjs from "emailjs-com";
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Alert,
  Stack,
  Link,
} from "@mui/material";
import { whatsappLink } from "./WhatsAppButton";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#28d2e4" },
    "&:hover fieldset": { borderColor: "#fbdb75" },
    "&.Mui-focused fieldset": { borderColor: "#f48d65" },
  },
};

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology"];
const LEVELS = ["GCSE", "IGCSE", "O Level", "AS Level", "A Level", "Not sure yet"];
const EXAM_BOARDS = ["Cambridge (CAIE)", "Edexcel", "AQA", "OCR", "Not sure"];

const initialForm = {
  name: "",
  role: "Parent",
  email: "",
  phone: "",
  subject: "",
  level: "",
  examBoard: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    // Compose the full structured submission into the message body so it reaches
    // the destination email regardless of which merge fields the EmailJS template
    // itself references.
    const composedMessage = [
      `Name: ${form.name} (${form.role})`,
      `Email: ${form.email}`,
      `WhatsApp/Phone: ${form.phone}`,
      `Subject: ${form.subject}`,
      `Level: ${form.level}`,
      form.examBoard ? `Exam board: ${form.examBoard}` : null,
      form.message ? `Message: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    emailjs
      .send(
        "service_j6jngvc", // 🔹 EmailJS service ID (unchanged)
        "template_awkavnu", // 🔹 EmailJS template ID (unchanged)
        {
          name: form.name,
          email: form.email,
          message: composedMessage,
        },
        "ApSvG38LOjbNfsgU" // 🔹 EmailJS public key (unchanged)
      )
      .then(
        () => {
          setStatus("success");

          // Fire conversion events for the ad campaign (Meta Pixel + GA4).
          // Safe no-ops until the real Pixel/GA4 IDs are added in index.html.
          if (typeof window !== "undefined") {
            if (window.fbq) {
              window.fbq("track", "Lead", {
                content_name: form.subject,
                content_category: form.level,
              });
            }
            if (window.gtag) {
              window.gtag("event", "generate_lead", {
                subject: form.subject,
                level: form.level,
              });
            }
          }

          setForm(initialForm);
          setSending(false);
        },
        () => {
          setStatus("error");
          setSending(false);
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
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          <Box component="span" sx={{ color: "#28d2e4" }}>
            Book a
          </Box>{" "}
          <Box component="span" sx={{ color: "#f48d65" }}>
            Free Assessment
          </Box>
        </Typography>
        <Typography align="center" sx={{ color: "#666", maxWidth: 560, mx: "auto", mb: 1 }}>
          Tell us a bit about the subject and level, and we'll get back to you to arrange a free
          assessment — no obligation.
        </Typography>
        <Typography align="center" sx={{ color: "#999", fontSize: "0.9rem", mb: 3 }}>
          Prefer WhatsApp?{" "}
          <Link
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#25D366", fontWeight: 600 }}
          >
            Message us directly
          </Link>{" "}
          instead.
        </Typography>

        <Box
          component="form"
          onSubmit={sendEmail}
          sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            label="Parent or Student Name"
            variant="outlined"
            required
            sx={fieldSx}
          />

          <TextField
            name="role"
            value={form.role}
            onChange={handleChange}
            select
            fullWidth
            label="I am the"
            variant="outlined"
            required
            sx={fieldSx}
          >
            <MenuItem value="Parent">Parent</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </TextField>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              required
              sx={fieldSx}
            />
            <TextField
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              label="WhatsApp / Phone"
              variant="outlined"
              required
              sx={fieldSx}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              name="subject"
              value={form.subject}
              onChange={handleChange}
              select
              fullWidth
              label="Subject"
              variant="outlined"
              required
              sx={fieldSx}
            >
              {SUBJECTS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="level"
              value={form.level}
              onChange={handleChange}
              select
              fullWidth
              label="Level / Year"
              variant="outlined"
              required
              sx={fieldSx}
            >
              {LEVELS.map((l) => (
                <MenuItem key={l} value={l}>
                  {l}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <TextField
            name="examBoard"
            value={form.examBoard}
            onChange={handleChange}
            select
            fullWidth
            label="Exam Board (optional)"
            variant="outlined"
            sx={fieldSx}
          >
            <MenuItem value="">
              <em>Not sure / prefer not to say</em>
            </MenuItem>
            {EXAM_BOARDS.map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="message"
            value={form.message}
            onChange={handleChange}
            fullWidth
            label="Anything else we should know? (optional)"
            multiline
            rows={3}
            variant="outlined"
            sx={fieldSx}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={sending}
            sx={{
              mt: 1,
              bgcolor: "#28d2e4",
              "&:hover": { bgcolor: "#fbdb75", color: "#333" },
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {sending ? "Sending…" : "Book a Free Assessment"}
          </Button>

          {status === "success" && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Thanks! We've received your details and will be in touch shortly.
            </Alert>
          )}
          {status === "error" && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Oops! Something went wrong. Please try again, or message us on WhatsApp instead.
            </Alert>
          )}
        </Box>
      </Container>
    </Box>
  );
}
