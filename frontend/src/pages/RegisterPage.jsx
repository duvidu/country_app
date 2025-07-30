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
import bgImage from '../assets/bg2.jpg'; // Import the background image

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ name, email, password });
      const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
      
      localStorage.setItem('token', res.data.token);
      
      toast.success('Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
      toast.error(err.response?.data?.msg || 'Registration failed');
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
            Create Account
          </Typography>
          
          {error && (
            <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
              {error}
            </Typography>
          )}
          
          <TextField
            label="Full Name"
            name="name"
            value={name}
            onChange={onChange}
            required
            fullWidth
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          />
          
          <TextField
            label="Email Address"
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
          
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
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
              fontSize: '1.1rem',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2
              },
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Creating Account...' : 'Register Now'}
          </Button>
          
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
            Already have an account?{' '}
            <Link 
              href="/login" 
              sx={{ 
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;