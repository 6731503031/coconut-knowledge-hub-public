/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import MUI
import {
  Container, Typography, Box, CircularProgress,
  Alert, Paper, Chip, Link, Breadcrumbs
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    setLoading(true);
    setError(null);
    const apiUrl = `http://localhost:8080/api/articles/${id}?lang=${currentLang}`;

    axios.get(apiUrl)
      .then(response => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching article:", err);
        setError("Could not load article data.");
        setLoading(false);
      });
  }, [id, currentLang]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!article) return <Alert severity="warning">Article not found.</Alert>;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCategoryColor = (category) => {
    if (category === 'News') return 'primary';
    if (category === 'Guide') return 'success';
    if (category === 'Research') return 'info';
    return 'default';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>

      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link component={RouterLink} to="/articles" sx={{ display: 'flex', alignItems: 'center' }}>
          <ArticleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Articles
        </Link>
        <Typography color="text.primary" noWrap>{article.title}</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ padding: 3, overflow: 'hidden' }}>
        {/* Article Image - Full Width Stacked */}
        {article.imageUrl && (
          <Box
            component="img"
            src={article.imageUrl}
            alt={article.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '4px',
              mb: 3
            }}
          />
        )}

        {/* Title Section */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          {article.title}
        </Typography>

        {/* Metadata Section - Stacked Vertically */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              label={article.category} 
              color={getCategoryColor(article.category)}
              size="small"
              variant="outlined"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            <strong>Author:</strong> {article.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Published:</strong> {formatDate(article.publishDate)}
          </Typography>
        </Box>

        {/* Content Section */}
        <Typography
          variant="body1"
          paragraph
          sx={{ whiteSpace: 'pre-line', lineHeight: 1.8, my: 3, textAlign: 'justify' }}
        >
          {article.content}
        </Typography>

        {/* Footer Section - For More Detail Link */}
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0', backgroundColor: '#fafafa', p: 2, borderRadius: '4px' }}>
          {article.externalUrl ? (
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              💡 <strong>For more details:</strong>{' '}
              <Link 
                href={article.externalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Click here to read more
              </Link>
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              💡 <strong>For more details:</strong> Contact us or visit our website for additional information and resources.
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default ArticleDetail;