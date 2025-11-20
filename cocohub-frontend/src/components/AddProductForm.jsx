import React, { useState } from 'react';
import { createProduct, uploadImage } from '../services/api';
import { useTranslation } from 'react-i18next'; // (1. เพิ่ม Import)
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
const CATEGORIES = ['Processed', 'Fresh', 'Equipment'];

function AddProductForm({ onProductAdded }) { // (2. รับ onProductAdded)
  const initialFormState = {
    name: '',
    description: '',
    price: 0,
    unit: 'piece',
    category: 'Fresh',
    stockQuantity: 1
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 3. (ดึงภาษา)
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    // 4. (สร้าง productData)
    // build payload: keep legacy top-level fields (name/description) for backend AddProductDTO
    // and also include a translations array so future endpoints/readers can use localized data
    const productData = {
      category: formData.category,
      price: Number(formData.price),
      unit: formData.unit,
      stockQuantity: Number(formData.stockQuantity),
      imageUrl: formData.imageUrl || null,
      // keep name/description for current backend AddProductDTO
      name: formData.name,
      description: formData.description,
      // also send translations explicitly
      translations: [
        {
          lang_code: currentLang,
          title: formData.name,
          description: formData.description
        }
      ]
    };

    // If an image file was selected, upload it first and set imageUrl
    try {
      if (imageFile) {
        const uploadResp = await uploadImage(imageFile);
        productData.imageUrl = uploadResp.data.imageUrl;
      }
      const response = await createProduct(productData, currentLang);
      setLoading(false);
      setMessage(`สินค้า '${formData.name}' (ID: ${response.data.id}) ถูกเพิ่มเรียบร้อย!`);
      setFormData(initialFormState);
      setImageFile(null);
      setImagePreview(null);
      if (onProductAdded) onProductAdded();
    } catch (error) {
      setLoading(false);
      console.error("Error creating product:", error);
      setError("เกิดข้อผิดพลาด: " + (error.response?.data?.message || "ไม่สามารถเพิ่มสินค้าได้"));
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Add New Product (FR-12)
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files && e.target.files[0];
            setImageFile(f || null);
            setImagePreview(f ? URL.createObjectURL(f) : null);
          }}
          style={{ marginTop: 8 }}
        />
        {imagePreview && <img src={imagePreview} alt="preview" style={{ maxWidth: 200, marginTop: 8 }} />}
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Unit (e.g., piece, kg, 500ml)"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock Quantity"
          name="stockQuantity"
          type="number"
          value={formData.stockQuantity}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={formData.category}
            label="Category"
            onChange={handleChange}
          >
            {CATEGORIES.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Product"}
        </Button>

        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    </Paper>
  );
}

export default AddProductForm;