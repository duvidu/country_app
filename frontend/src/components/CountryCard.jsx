import React from 'react';
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Chip,
  IconButton,
  Box,
  Tooltip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

const CountryCard = ({ country, onClick, isFavorite: propIsFavorite, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(propIsFavorite || false);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setIsFavorite(propIsFavorite);
  }, [propIsFavorite]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (loading) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Optionally redirect to login or show a message
        return;
      }

      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      };

      const endpoint = isFavorite 
        ? 'http://localhost:5000/api/auth/favorites/remove' 
        : 'http://localhost:5000/api/auth/favorites/add';

      await axios.post(
        endpoint,
        { countryCode: country.cca3 },
        config
      );

      setIsFavorite(!isFavorite);
      if (onFavoriteToggle) {
        onFavoriteToggle();
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={() => onClick(country.cca3)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="160"
          image={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          sx={{
            objectFit: 'cover',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
          }}
        />
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              },
              opacity: hovered || isFavorite ? 1 : 0.7,
              transition: 'opacity 0.2s'
            }}
            onClick={toggleFavorite}
            disabled={loading}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3" noWrap>
          {country.name.common}
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Population:</strong> {country.population.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Region:</strong> {country.region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
          </Typography>
        </Box>

        {country.cca2 && (
          <Chip 
            label={`Code: ${country.cca2}`} 
            size="small" 
            sx={{ mt: 2, fontSize: '0.7rem' }} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CountryCard;