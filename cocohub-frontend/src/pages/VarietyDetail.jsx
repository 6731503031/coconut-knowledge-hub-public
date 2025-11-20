/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import placeholderImage from '../assets/react.svg';
import HomeIcon from '@mui/icons-material/Home';
import GrassIcon from '@mui/icons-material/Grass';


const getTypeChipColor = (type) => {
  switch (type) {
    case 'Tall': return "success";
    case 'Dwarf': return "info";
    case 'Hybrid': return "warning";
    default: return "default";
  }
};

function VarietyDetail() {
  const { id } = useParams();
  const [variety, setVariety] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `http://localhost:8080/api/varieties/${id}?lang=${currentLang}`;
    axios.get(apiUrl)
      .then(response => {
        setVariety(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching variety:", err);
        setError("Could not load variety data.");
        setLoading(false);
      });
  }, [id, currentLang]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!variety) return <Alert severity="warning">Variety not found.</Alert>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>

      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link component={RouterLink} to="/varieties" sx={{ display: 'flex', alignItems: 'center' }}>
          <GrassIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Varieties
        </Link>
        <Typography color="text.primary">{variety.name}</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ padding: 4 }}>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          {/* Top: image */}
          <Box sx={{ width: '100%' }}>
            <img
              src={variety.imageUrl || variety.image_url || placeholderImage}
              alt={variety.name}
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
            <Chip 
              label={variety.type} 
              color={getTypeChipColor(variety.type)} 
              sx={{ mt: 1 }}
            />
          </Box>

          {/* Stacked textual info */}
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {variety.name}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" sx={{textAlign: 'left'}}paragraph>
              {variety.description}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              Common Usage
            </Typography>
            <Typography variant="body1" sx={{textAlign: 'left'}} paragraph>
              {variety.usage}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Geographic Distribution (FR-08)
              </Typography>

              {/* Map image stacked above process text */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box>
                  <img
                    src={variety.mapImageUrl || placeholderImage}
                    alt={`Map of ${variety.name}`}
                    style={{ width: '100%', height: 'auto', borderRadius: 6 }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Process
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: 'left'}} paragraph>
                    {variety.originStory || variety.origin_story || 'Geographic/process information not available.'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

      </Paper>
    </Container>
  );
}

export default VarietyDetail;