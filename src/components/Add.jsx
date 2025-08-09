import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
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
  const [extraField, setExtraField] = useState(""); // New text field
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
    const newProduct = {
      id: Date.now(), // Unique ID
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
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Add Product
        </Typography>

        <TextField
          fullWidth
          label="Product Name"
          sx={{ mb: 2 }}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          sx={{ mb: 2 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          sx={{ mb: 2 }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          select
          fullWidth
          label="State"
          sx={{ mb: 2 }}
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Not Available">Not Available</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Owner Name"
          sx={{ mb: 2 }}
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Class"
          sx={{ mb: 2 }}
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Department"
          sx={{ mb: 2 }}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <TextField
          fullWidth
          label="Contact Number"
          type="tel"
          sx={{ mb: 2 }}
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />

        {/* New TextField */}
        <TextField
          fullWidth
          label="Extra Field"
          sx={{ mb: 2 }}
          value={extraField}
          onChange={(e) => setExtraField(e.target.value)}
        />

        <Button
          variant="contained"
          component="label"
          sx={{ mb: 2 }}
        >
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>

        {image && (
          <Box sx={{ mb: 2 }}>
            <img src={image} alt="Preview" width="100%" />
          </Box>
        )}

        <Button variant="contained" fullWidth onClick={handleAddProduct}>
          Add Product
        </Button>
      </Paper>
    </Box>
  );
}
