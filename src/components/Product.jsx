import React from 'react';
import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Button, Typography } from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);
  const currentEmail = localStorage.getItem("email");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const filtered = storedProducts.filter(p => p.ownerEmail !== currentEmail);
    setProducts(filtered);
  }, []);

  const handleConnect = (contactNumber) => {
    alert(`Contact the owner at: ${contactNumber}`);
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.map((p, index) => (
        <Card key={index} sx={{ width: 300 }}>
          <CardMedia
            component="img"
            height="140"
            image={p.image}
            alt={p.name}
          />
          <CardContent>
            <Typography variant="h6">{p.name}</Typography>
            <Typography>{p.description}</Typography>
            <Typography>Price: ₹{p.price}</Typography>
            <Typography>Status: {p.state}</Typography>
            <Typography>Owner: {p.ownerName}</Typography>
            <Typography>Dept: {p.department}</Typography>
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={() => handleConnect(p.contactNumber)}
            >
              Connect
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
