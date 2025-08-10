import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Grid,
} from "@mui/material";

export default function Add() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("Available");
  const [ownerName, setOwnerName] = useState("");
  const [className, setClassName] = useState("");
  const [department, setDepartment] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [extraField, setExtraField] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!productName || !description || !price) {
      alert("Please fill in Product Name, Description, and Price.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      productName,
      description,
      price,
      state,
      ownerName,
      className,
      department,
      contactNumber,
      extraField,
      image,
    };

    const existing = JSON.parse(localStorage.getItem("products")) || [];
    existing.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existing));

    alert("Product added successfully!");

    // Reset form
    setProductName("");
    setDescription("");
    setPrice("");
    setState("Available");
    setOwnerName("");
    setClassName("");
    setDepartment("");
    setContactNumber("");
    setExtraField("");
    setImage(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        py: 5,
        px: { xs: 2, sm: 4, md: 6 },
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Add Product
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price (₹)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Not Available">Not Available</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Owner Name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Number"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Extra Field"
              value={extraField}
              onChange={(e) => setExtraField(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ height: 45 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Grid>

          {image && (
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt="Preview"
                  sx={{
                    maxHeight: 250,
                    maxWidth: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleAddProduct}
              sx={{ fontWeight: "bold" }}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
