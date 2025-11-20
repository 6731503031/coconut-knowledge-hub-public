/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PriceChart from '../components/PriceChart';

import { 
    Container, Box, Typography, 
    Button, TextField, CircularProgress, 
    Alert 
} from '@mui/material';

const formatDate = (date) => date.toISOString().split('T')[0];

function PriceTracker() {
    const { t } = useTranslation();
    const [startDate, setStartDate] = useState(() => formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))); // 30 วันก่อนหน้า
    const [endDate, setEndDate] = useState(() => formatDate(new Date()));
    const [priceData, setPriceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPriceData = (start, end) => {
        setLoading(true);
        setError(null);

        const apiUrl = `http://localhost:8080/api/prices?start_date=${start}&end_date=${end}`;
        
        axios.get(apiUrl)
            .then(response => {
                setPriceData(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching price data:", err);
                setError(t('price.fetchError'));
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPriceData(startDate, endDate);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchPriceData(startDate, endDate);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                📈 {t('price.marketPriceTracker')} (FR-08)
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {t('price.description')}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <TextField
                    label={t('price.startDate')}
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label={t('price.endDate')}
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <Button type="submit" variant="contained" disabled={loading}>
                    {t('common.fetch')}
                </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}
            
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <PriceChart priceData={priceData} />
            )}
        </Container>
    );
}

export default PriceTracker;