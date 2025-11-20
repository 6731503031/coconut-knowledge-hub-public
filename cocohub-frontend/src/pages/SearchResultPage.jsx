import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'; 
import ProductCard from '../components/ProductCard'; 
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';

function SearchResultPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); 
    const lang = searchParams.get('lang'); 
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (query && lang) { 
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(true); // (ESLint เตือน...
            setError(null); 
            
            const apiUrl = `https://coconut-knowledge-hub-public.onrender.com/api/products?search=${query}&lang=${lang}`;
            
            axios.get(apiUrl)
                .then(response => {
                    setResults(response.data); 
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error searching products:", error);
                    setError("Could not load search results."); 
                    setLoading(false);
                });
        }
    
    }, [query, lang]); 

    // 1. [!!! ลบ !!!] (ย้าย Spinner ลงไปข้างล่าง)
    // if (loading) {
    //   return <div>กำลังค้นหา...</div>;
    // }

    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            ผลการค้นหาสำหรับ: "{query}"
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* 2. [!!! แก้ไข !!!] (ย้าย Logic การ Loading มาไว้ตรงนี้) */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 3 }}>
              {loading ? (
                  <CircularProgress /> // <-- 3. Spinner จะแสดงผลแค่ตรงนี้
              ) : (
                results.length > 0 ? (
                    results.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <Typography>ไม่พบสินค้าที่ตรงกับคำค้นหา</Typography>
                )
              )}
          </Box>
      </Container>
    );
}

export default SearchResultPage;