import { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import axios from 'axios';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            'x-auth-token': token
          }
        };

        await axios.get('http://localhost:5000/api/auth/user', config);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={isAuthenticated} />
      <main className="pb-8">
        <Outlet context={{ isAuthenticated, setIsAuthenticated }} />
      </main>
    </div>
  );
};

export default App;