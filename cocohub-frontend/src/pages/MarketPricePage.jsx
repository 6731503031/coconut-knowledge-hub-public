/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; 

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import {
  Typography, Box, CircularProgress,
  Alert, Paper,
  TextField, Button 
} from '@mui/material';


const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const getPastDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
};


function MarketPricePage() {
  const { t } = useTranslation(); 
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(getPastDate(30));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const fetchPriceData = (start, end) => {
    setLoading(true);
    setError(null);

    const apiUrl = `http://localhost:8080/api/prices?startDate=${start}&endDate=${end}`;

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


  const handleSubmit = (e) => {
    e.preventDefault(); 
    fetchPriceData(startDate, endDate); 
  };

  return (
    <Box sx={{ mt: 4, px: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        📈 {t('price.marketPriceTracker')} (FR-11)
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t('price.description')}
      </Typography>

      <Paper elevation={2} sx={{ padding: 2, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
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
            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading} 
            >
              {loading ? t('common.loading') : t('common.fetch')}
            </Button>
          </Box>
        </form>
      </Paper>


      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('price.chartTitle')}
        </Typography>

        <Box sx={{ width: '100%', height: 400 }}> 
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            priceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label) => t('common.date') + ": " + label}
                    formatter={(value, name) => [value, t(`price.region.${name}`)]}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="centralPrice" name="central" stroke="#8884d8" />
                  <Line type="monotone" dataKey="southPrice" name="south" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="northeastPrice" name="northeast" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography>{t('price.noData')}</Typography>
              </Box>
            )
          )}
        </Box>
      </Paper>
    </Box>
  );
}
export default MarketPricePage;