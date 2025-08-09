import { 
  Box, Typography, Paper, Drawer, List, ListItem, 
  ListItemButton, ListItemText, Toolbar, AppBar 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { text } from 'stream/consumers';

const drawerWidth = 220;

export default function AdminHome() {
  const navigate = useNavigate();
  const [open] = useState(true);
  const [user, setUser] = useState(null);

  // Dummy users - must match login page data
  const dummyUsers = [
    { email: "admin@example.com", role: "admin" },
    { email: "user@example.com", role: "user" }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email'); // we will store this in Loginpage too

    if (!token || !email) {
      navigate('/'); // redirect if not logged in
    } else {
      // Match dummy user to show their details
      const foundUser = dummyUsers.find(u => u.email === email && u.role === role);
      setUser(foundUser || { email, role });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/');
  };

  const navItems = [
    { text: 'Add Product', path: '/add' },
    { text: 'Product', path: '/product' },
    { text: 'Profile', path: '/profile' },
    {text: 'Adduser', path: '/adduser'  }

  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(90deg, #1e3a8a 0%, #f59e42 100%)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            EduThrift
          </Typography>
          {user && (
            <Typography variant="body1">
              Logged in as: <strong>{user.email}</strong> ({user.role})
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Navigation */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
          },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          ml: `${drawerWidth}px`,
          mt: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Welcome {user ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
          </Typography>
          <Typography align="center" color="text.secondary">
            Use the side navigation to explore features.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
