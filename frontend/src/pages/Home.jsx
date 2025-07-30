import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getAllCountries, getCountryByName, getCountriesByRegion } from '../services/api';
import CountryCard from '../components/CountryCard';
import Search from '../components/Search';
import Filter from '../components/Filter';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  CircularProgress,
  Button
} from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useOutletContext();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    fetchAllCountries();
    fetchUserFavorites();
  }, [isAuthenticated, navigate]);

  const fetchAllCountries = async () => {
    setLoading(true);
    try {
      const data = await getAllCountries();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/auth/user', {
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUserFavorites(userData.favoriteCountries || []);
      }
    } catch (error) {
      console.error('Error fetching user favorites:', error);
    }
  };

  const handleSearch = async (name) => {
    if (!name.trim()) {
      fetchAllCountries();
      return;
    }
    setLoading(true);
    try {
      const data = await getCountryByName(name);
      setCountries(data);
    } catch (error) {
      console.error('Error searching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (region) => {
    if (!region) {
      fetchAllCountries();
      return;
    }
    setLoading(true);
    try {
      const data = await getCountriesByRegion(region);
      setCountries(data);
    } catch (error) {
      console.error('Error filtering countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorites = () => {
    setFavoritesOnly(!favoritesOnly);
  };

  const displayedCountries = favoritesOnly
    ? countries.filter(country => userFavorites.includes(country.cca3))
    : countries;

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        mb: 4
      }}>
        <Search onSearch={handleSearch} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Filter onFilter={handleFilter} />
          {isAuthenticated && (
            <Button 
              variant={favoritesOnly ? "contained" : "outlined"}
              onClick={toggleFavorites}
              sx={{ minWidth: 120 }}
            >
              {favoritesOnly ? 'All Countries' : 'Favorites'}
            </Button>
          )}
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : displayedCountries.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          {favoritesOnly ? 'No favorite countries yet' : 'No countries found'}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {displayedCountries.map(country => (
            <Grid item key={country.cca3} xs={12} sm={6} md={4} lg={3}>
              <CountryCard 
                country={country} 
                onClick={(code) => navigate(`/country/${code}`)}
                isFavorite={userFavorites.includes(country.cca3)}
                onFavoriteToggle={fetchUserFavorites}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;