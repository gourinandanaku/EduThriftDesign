import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dummyUsers = [
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "user@example.com", password: "user123", role: "user" },
    { email: "gouri@gmail.com", password: "gouri123", role: "user" }
  ];

  const handleLogin = () => {
  const foundUser = dummyUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (foundUser) {
    // Save dummy token + role + email in localStorage
    localStorage.setItem("token", "dummyToken123");
    localStorage.setItem("role", foundUser.role);
    localStorage.setItem("email", foundUser.email);

    if (foundUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  } else {
    alert("Invalid email or password");
  }
}


  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Paper sx={{ p: 4, width: 350, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
