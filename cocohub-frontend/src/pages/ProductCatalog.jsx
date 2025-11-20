/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

const CATEGORIES = ['Processed', 'Fresh', 'Equipment'];

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('All');

  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append('lang', currentLang);
    if (filterCategory !== 'All') {
      params.append('category', filterCategory);
    }
    if (searchTerm) {
      params.append('search', searchTerm);
    }

    const apiUrl = `https://coconut-knowledge-hub-public.onrender.com/api/products?${params.toString()}`;

    axios.get(apiUrl)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [filterCategory, currentLang, searchTerm]);

  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        🥥 Product Catalog (FR-03 & FR-05)
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="span" sx={{ mr: 2 }}>
          Filter by:
        </Typography>
        <Button
          variant={filterCategory === 'All' ? 'contained' : 'outlined'}
          onClick={() => handleFilterChange('All')}
          sx={{ mr: 1 }}
        >
          All
        </Button>
        {CATEGORIES.map(category => (
          <Button
            key={category}
            variant={filterCategory === category ? 'contained' : 'outlined'}
            onClick={() => handleFilterChange(category)}
            sx={{ mr: 1 }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <hr />

      {searchTerm && (
        <Typography variant="h6" gutterBottom>
          Search results for: "{searchTerm}"
        </Typography>
      )}

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        mt: 2
      }}>
        {loading ? (
          <CircularProgress />
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Box>
    </Container>
  );
}
export default ProductCatalog;