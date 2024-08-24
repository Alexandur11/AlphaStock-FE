import Cookies from "js-cookie";

export const login_service = 'http://127.0.0.1:8000';



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

    export const prepareTokenForRequest = async (e) => {
      const accessToken = Cookies.get('access_token');

      const accessTokenVerificationResponse = await fetch(`${login_service}/verify_access_token`, 
        {method: 'GET',headers: {'Authorization': `Bearer ${accessToken}` }});
    

      if (accessTokenVerificationResponse.status === 200) {return accessToken;} 


      else {
        const refreshToken = Cookies.get('refresh_token');
        const refreshTokenVerificationResponse = await fetch(`${login_service}/refresh_access_token`, 
          { method: 'POST', headers: { 'Authorization': `Bearer ${refreshToken}`}});


        const refreshTokenData = await refreshTokenVerificationResponse.json();


        if (refreshTokenData.Validity !== 'Expires') 
          {setToken(refreshTokenData.token, 'access_token'); return refreshTokenData.token;} 


        else {
          const newRefreshTokenResponse = await fetch(`${login_service}/refresh_refresh_token`, 
            { method: 'POST',headers: {'Authorization': `Bearer ${refreshToken}`}});
    
          const newRefreshTokenData = await newRefreshTokenResponse.json();
          setToken(refreshTokenData.token, 'access_token');
          setToken(newRefreshTokenData.token, 'refresh_token');
    
          return refreshTokenData.token;
        }
      }
    };
    




  export const setToken = async (token, name) => {
    Cookies.set(name, token, { secure: true });
};

