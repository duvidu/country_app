import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const config = {
          headers: {
            'x-auth-token': token
          }
        };

        const res = await axios.get('http://localhost:5000/api/auth/user', config);
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">User Profile</Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      
      <List sx={{ bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemText primary="Name" secondary={user.name} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Email" secondary={user.email} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText 
            primary="Favorite Countries" 
            secondary={user.favoriteCountries?.length > 0 
              ? user.favoriteCountries.join(', ') 
              : 'No favorites yet'} 
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default ProfilePage;