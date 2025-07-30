import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link 
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import bgImage from '../assets/bg1.jpg'; // Import the background image

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ email, password });
      const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
      
      localStorage.setItem('token', res.data.token);
      
      toast.success('Login successful! Redirecting...');
      
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      toast.error(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      py: 8
    }}>
      {/* Dark overlay for better readability */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 0
      }} />
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          component="form" 
          onSubmit={onSubmit} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            p: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: 3
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Login
          </Typography>
          
          {error && (
            <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
              {error}
            </Typography>
          )}
          
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            required
            fullWidth
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          />
          
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            required
            fullWidth
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            fullWidth
            disabled={loading}
            sx={{ 
              py: 1.5,
              fontWeight: 'bold',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2
              },
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Don't have an account? <Link href="/register" sx={{ fontWeight: 'bold' }}>Register</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;