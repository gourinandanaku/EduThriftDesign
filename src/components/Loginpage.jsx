import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Invalid email or password");
        setLoading(false);
        return;
      }

      const { token } = await res.json();
      localStorage.setItem("token", token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("email", payload.email);
      localStorage.setItem("role", payload.role);
      if (payload.role === "admin") navigate("/admin");
      else navigate("/home");
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: isMobile ? "100%" : 400,
          p: 4,
          borderRadius: 3,
          boxShadow:
            "0 4px 10px rgb(0 0 0 / 0.1), 0 8px 30px rgb(0 0 0 / 0.1)",
          background:
            "linear-gradient(135deg, #f0f4ff 0%, #d9e4ff 100%)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: theme.palette.primary.main,
            textAlign: "center",
          }}
        >
          EduThrift Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          sx={{ mb: 4 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleLogin}
          disabled={loading}
          sx={{ fontWeight: "bold" }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Paper>
    </Box>
  );
}
