/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { getMyProducts, deleteProduct } from '../services/api';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Box, Typography, Button, Paper, Link,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, CircularProgress, IconButton, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function MyProductList() {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    setDeleteError(null);
    getMyProducts(currentLang)
      .then(response => {
        setMyProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching my products:", err);
        setError("Could not load products.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [currentLang]);

  const handleDelete = (productId) => {
    setDeleteError(null);
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId)
        .then(() => {

          fetchProducts();
        })
        .catch(err => {
          console.error("Error deleting product:", err);
          setDeleteError(err.response?.data || "Could not delete product.");
        });
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;


  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        My Products (FR-12)
      </Typography>

      {deleteError && <Alert severity="error" sx={{ mb: 2 }}>{deleteError}</Alert>}

      {myProducts.length === 0 ? (
        <Typography>You have not added any products yet.</Typography>
      ) : (

        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }}>

            <TableHead sx={{ backgroundColor: '#f4f4f4' }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {myProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">

                    <Link component={RouterLink} to={`/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>฿{product.price} / {product.unit}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell align="right">

                    <IconButton
                      onClick={() => handleDelete(product.id)}
                      color="error"
                      aria-label="delete product"
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

export default MyProductList;