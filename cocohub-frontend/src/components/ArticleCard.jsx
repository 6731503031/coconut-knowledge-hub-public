import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Import MUI
import { 
  Card, CardContent, Typography, 
  CardActionArea, Chip, CardMedia, Box
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import placeholderImage from '../assets/react.svg';

function ArticleCard({ article }) {
  
  const getCategoryColor = (category) => {
    if (category === 'News') return 'primary';
    if (category === 'Guide') return 'success';
    if (category === 'Research') return 'info';
    return 'default';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card 
      sx={{ width: 300, margin: '1rem', textDecoration: 'none', display: 'flex', flexDirection: 'column' }} 
      component={RouterLink} 
      to={`/articles/${article.id}`}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="180"
          image={article.imageUrl || placeholderImage}
          alt={article.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Box sx={{ mb: 1 }}>
            <Chip 
              icon={<ArticleIcon />}
              label={article.category} 
              color={getCategoryColor(article.category)}
              size="small" 
              sx={{ mr: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              {formatDate(article.publishDate)}
            </Typography>
          </Box>

          <Typography gutterBottom variant="h6" component="div" noWrap>
            {article.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            By: {article.author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ArticleCard;