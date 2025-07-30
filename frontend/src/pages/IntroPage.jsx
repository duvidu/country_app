import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundVideo from '../assets/background.mp4'; // Direct import from assets

const IntroPage = () => {
  return (
    <Box sx={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background Video */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          top: 0,
          left: 0,
          // Fallback background if video fails
          backgroundColor: 'background.default'
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        {/* Fallback content */}
        <Typography 
          component="span" 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'text.secondary'
          }}
        >
          Background video not supported
        </Typography>
      </Box>

      {/* Dark overlay with gradient */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
        zIndex: -1
      }} />

      {/* Content Container */}
      <Container maxWidth="sm" sx={{ 
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        color: 'common.white',
        px: 3,
        py: 4,
        backdropFilter: 'blur(2px)'
      }}>
        <Box sx={{ 
          mb: 6,
          animation: 'fadeIn 1s ease-out'
        }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              letterSpacing: 1.5,
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              '@media (max-width:600px)': {
                fontSize: '2.5rem'
              }
            }}
          >
            Welcome to Country Info App
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              opacity: 0.9,
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              mb: 4
            }}
          >
            Explore countries around the world
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
          justifyContent: 'center',
          animation: 'slideUp 0.8s ease-out'
        }}>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/register"
            sx={{
              minWidth: 200,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Register
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            component={Link} 
            to="/login"
            sx={{
              minWidth: 200,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'common.white',
              borderColor: 'common.white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.15)',
                borderColor: 'common.white',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Login
          </Button>
        </Box>
      </Container>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default IntroPage;