/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VarietyCard from '../components/VarietyCard';
import { useTranslation } from 'react-i18next';

import {
  Container, Box, Typography, Button,
  CircularProgress, Alert, TextField
} from '@mui/material';

const TYPES = ['Tall', 'Dwarf', 'Hybrid'];

function VarietyDatabase() {
  const [varieties, setVarieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.append('lang', currentLang);
    if (filterType !== 'All') {
      params.append('type', filterType);
    }
    if (debouncedSearchTerm) {
      params.append('search', debouncedSearchTerm);
    }
    const apiUrl = `http://localhost:8080/api/varieties?${params.toString()}`;

    axios.get(apiUrl)
      .then(response => {
        setVarieties(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching varieties:", err);
        setError("Could not load variety data.");
        setLoading(false);
      });
  }, [filterType, currentLang, debouncedSearchTerm]);

  const handleFilterChange = (type) => {
    setFilterType(type);
    setSearchTerm('');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setFilterType('All');
  };

  const getTypeChipColor = (type) => {
    switch (type) {
      case 'Tall': return "success";
      case 'Dwarf': return "info";
      case 'Hybrid': return "warning";
      default: return "default";
    }
  };



  return (
    <Box sx={{ mt: 4, px: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        🌴 Varieties Coconut (FR-06 & FR-07)
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          label="Search Variety Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth={false}
          sx={{ width: { xs: '100%', sm: 300 } }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="span" sx={{ mr: 2 }}>
          Filter by Type:
        </Typography>
        <Button
          variant={filterType === 'All' ? 'contained' : 'outlined'}
          onClick={() => handleFilterChange('All')}
          sx={{ mr: 1 }}
        >
          All
        </Button>
        {TYPES.map(type => (
          <Button
            key={type}
            variant={filterType === type ? 'contained' : 'outlined'}
            onClick={() => handleFilterChange(type)}
            sx={{ mr: 1 }}
            color={getTypeChipColor(type)}
          >
            {type}
          </Button>
        ))}
      </Box>

      <hr />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}


      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        mt: 2
      }}>
        {loading ? (
          <CircularProgress />
        ) : (
          varieties.length > 0 ? (
            varieties.map(variety => (
              <VarietyCard key={variety.id} variety={variety} />
            ))
          ) : (
            <Typography>No varieties found for this filter or search term.</Typography>
          )
        )}
      </Box>
    </Box>
  );
}

export default VarietyDatabase;