import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function ProductCard({ product }) {
  const backendHost = 'http://localhost:8080';
  const normalizeImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    // new public endpoint
    if (url.startsWith('/api/public/uploads/')) return `${backendHost}${url}`;
    // older uploads path -> map to public endpoint
    if (url.startsWith('/uploads/')) return `${backendHost}/api/public/uploads/${url.substring('/uploads/'.length)}`;
    return `${backendHost}${url}`;
  };
  const imageSrc = normalizeImageUrl(product.imageUrl);
  return (
    <Card sx={{ 
      width: 250, 
      margin: '1rem', 
      textDecoration: 'none' 
    }} 
    component={Link} 
    to={`/products/${product.id}`}
    >
     
      <CardActionArea>
        {imageSrc && (
          <CardMedia
            component="img"
            height="140"
            image={imageSrc}
            alt={product.name}
          />
        )}
        <CardContent>

          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>

      
          <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
            ฿{product.price}
            {product.unit ? (
              <span style={{ fontWeight: 'normal', color: '#000000ff' }}> / {product.unit}</span>
            ) : null}
          </Typography>

         
          <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>

      
          <Typography variant="body2" color="text.secondary">
            Rating: {product.rating ? product.rating : 'N/A'} ⭐
          </Typography>

          {product.manufacturerName && (
            <Typography variant="body2" color="text.secondary">
              By: {product.manufacturerName}
            </Typography>
          )}

        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;