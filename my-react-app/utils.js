export const backend_url = 'http://127.0.0.1:8000';


export const handleLogout = async () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');

      navigate('/login');
      console.error('Error:', error);
      // Optionally handle the error, e.g., show a message
      navigate('/login'); // Ensure user is redirected to login
    }

  


  export const evaluateStockValue = async (value) => {
      if (value < 0.5) {
        return `Fair Value = ${value}. Stock is VERY Over-Valued`;
      } else if (value >= 0.5 && value < 1) {
        return `Fair Value = ${value}. Stock is Over-Valued`;
      } else if (value >= 1 && value < 2) {
        return `Fair Value = ${value}. Stock is Fairly-Valued`;
      } else if (value >= 2 && value < 3) {
        return `Fair Value = ${value}. Stock is Under-Valued`;
      } else if (value >= 3) {
        return `Fair Value = ${value}. Stock is VERY Under-Valued`;
      } else {
        return "Invalid value";
      }
    };