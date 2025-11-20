/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import { useTranslation } from 'react-i18next';

import { 
  Container, Box, Typography, 
  CircularProgress, Alert, Button, 
  TextField 
} from '@mui/material';


const CATEGORIES = ['News', 'Guide', 'Research'];

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  
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
    if (filterCategory !== 'All') {
      params.append('category', filterCategory);
    }
    if (debouncedSearchTerm) {
      params.append('search', debouncedSearchTerm);
    }
    const apiUrl = `https://coconut-knowledge-hub-public.onrender.com/api/articles?${params.toString()}`;

    axios.get(apiUrl)
      .then(response => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching articles:", err);
        setError("Could not load articles.");
        setLoading(false);
      });
  }, [filterCategory, currentLang, debouncedSearchTerm]);
  const handleFilterChange = (category) => {
    setFilterCategory(category);
    setSearchTerm('');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setFilterCategory('All');
  };


  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        📰 บทความและข่าวสาร (FR-09)
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          label="Search Article Title"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth={false}
          sx={{ width: { xs: '100%', sm: 300 } }}
        />
      </Box>

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
          articles.length > 0 ? (
            articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <Typography>No articles found for this filter or search term.</Typography>
          )
        )}
      </Box>
    </Container>
  );
}

export default ArticleList;