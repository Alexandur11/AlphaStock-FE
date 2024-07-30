export const backend_url = 'http://127.0.0.1:8000';


export const handleLogout = async () => {
    try {
      const response = await fetch(`${backend_url}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem('token');
      localStorage.removeItem('role');

      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      // Optionally handle the error, e.g., show a message
      navigate('/login'); // Ensure user is redirected to login
    }
  };
  