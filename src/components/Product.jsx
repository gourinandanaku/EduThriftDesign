import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);
  const currentEmail = localStorage.getItem("email");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    // Filter products not owned by current user
    const filtered = storedProducts.filter(p => p.ownerEmail !== currentEmail);
    setProducts(filtered);
  }, [currentEmail]);

  const handleConnect = (contactNumber) => {
    alert(`Contact the owner at: ${contactNumber}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Products From Other Users
      </Typography>

      {products.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products.map((p, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.1), 0 8px 30px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.15), 0 12px 40px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={p.image || "/default-image.png"}
                  alt={p.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {p.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1, minHeight: "48px" }}
                  >
                    {p.description.length > 80
                      ? p.description.substring(0, 77) + "..."
                      : p.description}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Price: ₹{p.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {p.state}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Owner: {p.ownerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dept: {p.department}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleConnect(p.contactNumber)}
                  >
                    Connect
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
