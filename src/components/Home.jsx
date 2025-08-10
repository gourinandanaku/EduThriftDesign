import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const dummyUsers = [
    { email: "admin@example.com", role: "admin" },
    { email: "user@example.com", role: "user" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      navigate("/");
    } else {
      const foundUser = dummyUsers.find(
        (u) => u.email === email && u.role === role
      );
      setUser(foundUser || { email, role });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/");
  };

  const navItems = [
    { text: "Add Product", path: "/add" },
    { text: "Product", path: "/product" },
    { text: "Profile", path: "/profile" },
  ];

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (!isMdUp) setMobileOpen(false);
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ color: "#ff5252" }}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(90deg, #1e3a8a 0%, #f59e42 100%)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {!isMdUp && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            EduThrift
          </Typography>
          {user && (
            <Typography variant="body1" sx={{ whiteSpace: "nowrap" }}>
              Logged in as: <strong>{user.email}</strong> ({user.role})
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation folders"
      >
        {/* Temporary drawer for mobile */}
        {!isMdUp && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                background:
                  "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {/* Permanent drawer for desktop */}
        {isMdUp && (
          <Drawer
            variant="permanent"
            open
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                background:
                  "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: "64px",
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            maxWidth: 600,
            width: "100%",
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
            Welcome {user ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""}
          </Typography>
          <Typography color="text.secondary">
            Use the side navigation to explore features.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
