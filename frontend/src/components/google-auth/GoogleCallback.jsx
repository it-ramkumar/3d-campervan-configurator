import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // Call your backend API to exchange the code for a token
      fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            setToken(data.token);
            setUser(data.user);
            navigate('/profile');
          }
        })
        .catch(error => {
          console.error('Error handling OAuth callback:', error);
          navigate('/login');
        });
    }
  }, [setToken, setUser, navigate]);

  return null;
};

export default GoogleCallback;