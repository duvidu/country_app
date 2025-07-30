import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../services/api';
import { 
  Button, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Box,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CountryPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      const data = await getCountryByCode(code);
      setCountry(data[0]);
      setLoading(false);
    };
    fetchCountry();
  }, [code]);

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (!country) return <Typography align="center">Country not found</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 4 }}
      >
        Back
      </Button>

      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box component="img" 
              src={country.flags.png} 
              alt={`Flag of ${country.name.common}`} 
              sx={{ width: '100%', height: 'auto' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {country.name.common}
          </Typography>
          
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Native Name:</strong> {Object.values(country.name.nativeName)[0]?.common || 'N/A'}</Typography>
              <Typography><strong>Population:</strong> {country.population.toLocaleString()}</Typography>
              <Typography><strong>Region:</strong> {country.region}</Typography>
              <Typography><strong>Sub Region:</strong> {country.subregion || 'N/A'}</Typography>
              <Typography><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography><strong>Top Level Domain:</strong> {country.tld?.[0] || 'N/A'}</Typography>
              <Typography><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</Typography>
              <Typography><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</Typography>
            </Grid>
          </Grid>

          {country.borders && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Border Countries:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {country.borders.map(border => (
                  <Chip 
                    key={border}
                    label={border}
                    onClick={() => navigate(`/country/${border}`)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CountryPage;    