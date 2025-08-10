import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Adduser() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const currentRole = localStorage.getItem("role");
  if (currentRole !== "admin") {
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Access Denied. Admins only.
        </Typography>
      </Box>
    );
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Auto-hide alert after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("user");
    setPhone("");
    setEditIndex(null);
  };

  const handleAddOrUpdateUser = () => {
    if (!name || !email || (!password && editIndex === null) || !role) {
      setMessageType("error");
      setMessage("Please fill in all required fields.");
      return;
    }

    if (editIndex === null && users.some((u) => u.email === email)) {
      setMessageType("error");
      setMessage("User with this email already exists.");
      return;
    }

    if (
      editIndex !== null &&
      users.some((u, idx) => u.email === email && idx !== editIndex)
    ) {
      setMessageType("error");
      setMessage("Another user with this email already exists.");
      return;
    }

    let updatedUsers = [...users];
    const userData = {
      name,
      email,
      password: password || users[editIndex]?.password,
      role,
      phone,
    };

    if (editIndex !== null) {
      updatedUsers[editIndex] = userData;
      setMessageType("success");
      setMessage("User updated successfully.");
    } else {
      updatedUsers.push(userData);
      setMessageType("success");
      setMessage("User added successfully.");
    }

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    resetForm();
  };

  const handleEdit = (index) => {
    const user = users[index];
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setRole(user.role);
    setPhone(user.phone || "");
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (
      window.confirm(
        `Are you sure you want to delete user: ${users[index].email}?`
      )
    ) {
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setMessageType("success");
      setMessage("User deleted successfully.");
      if (editIndex === index) resetForm();
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6, px: 2 }}>
      <Paper sx={{ p: { xs: 3, sm: 4 }, mb: 6 }}>
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          {editIndex !== null ? "Edit User" : "Add User"}
        </Typography>

        {message && (
          <Alert
            severity={messageType}
            onClose={() => setMessage(null)}
            sx={{ mb: 3 }}
          >
            {message}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={editIndex !== null}
              autoComplete="email"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={
                editIndex !== null
                  ? "New Password (leave blank to keep current)"
                  : "Password"
              }
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={editIndex === null}
              autoComplete={editIndex === null ? "new-password" : "off"}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth={isSmallScreen}
            onClick={handleAddOrUpdateUser}
          >
            {editIndex !== null ? "Update User" : "Add User"}
          </Button>

          {editIndex !== null && (
            <Button
              variant="outlined"
              fullWidth={isSmallScreen}
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Paper>

      <Typography variant={isSmallScreen ? "h6" : "h5"} gutterBottom fontWeight="bold">
        Existing Users
      </Typography>

      {users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 440, overflowX: "auto" }}
        >
          <Table stickyHeader size={isSmallScreen ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u, idx) => (
                <TableRow key={u.email}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>{u.phone || "-"}</TableCell>
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    <IconButton onClick={() => handleEdit(idx)} color="primary" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(idx)}
                      color="error"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
