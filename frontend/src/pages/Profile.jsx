import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Chip,
  CircularProgress,
  Avatar,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setUser(response.data);
      } catch (error) {
        handleApiError(error, 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleApiError = (error, defaultMessage) => {
    console.error(error);
    const message = error.response?.data?.message || defaultMessage;
    const status = error.response?.status;
    
    if (status === 401) {
      logout();
      navigate('/login');
    }
    
    setSnackbar({
      open: true,
      message,
      severity: 'error'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          My Profile
        </Typography>
        
        {user && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mr: 3,
                  bgcolor: 'primary.main',
                  fontSize: '2rem'
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h5">{user.username}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <List>
              <ListItem>
                <ListItemText 
                  primary="Account Created" 
                  secondary={new Date(user.createdAt).toLocaleDateString()} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Favorite Countries" 
                  secondary={
                    user.favoriteCountries?.length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {user.favoriteCountries.map(code => (
                          <Chip 
                            key={code} 
                            label={code}
                            onClick={() => navigate(`/country/${code}`)}
                            clickable
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No favorite countries yet
                      </Typography>
                    )
                  } 
                />
              </ListItem>
            </List>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button 
                variant="contained" 
                color="error"
                onClick={handleLogout}
                sx={{ px: 4 }}
              >
                Logout
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;  