import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Loginpage({ setUserRole }) {
  const [d, setD] = useState({ email: "", password: "" });
  const navigate=useNavigate()
  // Dummy data for login simulation
  const dummyUsers = [
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "user@example.com", password: "user123", role: "user" }
  ];

  const inputHandler = (e) => {
    setD({ ...d, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const foundUser = dummyUsers.find(
      (user) => user.email === d.email && user.password === d.password
    );

    if (foundUser) {
      // Simulate storing login data
      localStorage.setItem("token", "dummy-token-123");
      localStorage.setItem("role", foundUser.role);
      setUserRole(foundUser.role);
      alert(`Login successful! Welcome ${foundUser.role}`);
      navigate('/h')

    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={10}
      component={Paper}
      elevation={4}
      p={4}
      borderRadius={3}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        name="email"
        value={d.email}
        onChange={inputHandler}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={d.password}
        onChange={inputHandler}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, fontWeight: 600 }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
}

export default Loginpage;
