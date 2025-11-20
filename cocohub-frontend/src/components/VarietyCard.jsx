import React from 'react';
import placeholderImage from '../assets/react.svg';
import { Link as RouterLink } from 'react-router-dom';

import { 
  Card, CardContent, Typography, 
  CardActionArea, Chip, CardMedia 
} from '@mui/material';

const getTypeChipColor = (type) => {
  switch (type) {
    case 'Tall': return "success";
    case 'Dwarf': return "info";
    case 'Hybrid': return "warning";
    default: return "default";
  }
};

function VarietyCard({ variety }) {
  return (
    <Card 
      sx={{ width: 280, margin: '1rem', textDecoration: 'none' }} 
      component={RouterLink} 
      to={`/varieties/${variety.id}`}
    >
      <CardActionArea>
        {/** Show image if available, otherwise placeholder */}
        <CardMedia
          component="img"
          height="160"
          image={variety.imageUrl || variety.image_url || placeholderImage}
          alt={variety.name}
        />

        <CardContent>

          <Typography gutterBottom variant="h6" component="div">
            {variety.name}
          </Typography>

          <Chip 
            label={variety.type} 
            color={getTypeChipColor(variety.type)} 
            size="small" 
            sx={{ mb: 1 }}
          />

          <Typography variant="body2" color="text.secondary" noWrap>
            {variety.description}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default VarietyCard;