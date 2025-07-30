import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const Header = ({ isAuthenticated }) => {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          Country Info App
        </Typography>
        
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};