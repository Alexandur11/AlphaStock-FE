import Cookies from "js-cookie";

export const login_service = 'http://127.0.0.1:8000';
export const alpha_stock_service = 'http://127.0.0.1:8002';



export const handleLogout = async () => {
      Cookies.remove('refresh_token');
      Cookies.remove('access_token');
      navigate('/login');
      console.error('Error:', error);

      navigate('/login'); 
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
        {method: 'GET',headers: {'Authorization': `Bearer ${accessToken}`}});
    

      if (accessTokenVerificationResponse.status === 200) {return accessToken;} 


      else {
        const refreshToken = Cookies.get('refresh_token');
        const refreshTokenVerificationResponse = await fetch(`${login_service}/verify_refresh_token`, 
          { method: 'GET', headers: { 'Authorization': `Bearer ${refreshToken}`}});


        const refreshTokenData = await refreshTokenVerificationResponse.json();

        if (refreshTokenData.status === 401){
          Cookies.remove('refresh_token');
          Cookies.remove('access_token');
          navigate('/login');
        }

        if (refreshTokenData.Validity !== 'Expires') 
          {setToken(refreshTokenData.token, 'access_token'); return refreshTokenData.token;} 

        else {
          const newRefreshTokenResponse = await fetch(`${login_service}/refresh_refresh_token`, 
            { method: 'GET',headers: {'Authorization': `Bearer ${refreshToken}`}});

            const newAccessTokenResponse = await fetch(`${login_service}/refresh_access_token`, 
              { method: 'GET',headers: {'Authorization': `Bearer ${refreshToken}`}});
    
          const newRefreshTokenData = await newRefreshTokenResponse.json();
          const newAccessTokenData = await newAccessTokenResponse.json();

          setToken(newAccessTokenData.token, 'access_token');
          setToken(newRefreshTokenData.token, 'refresh_token');
          
          return newAccessTokenData.token;
        }
      }
    };
    




  export const setToken = async (token, name) => {
    Cookies.set(name, token, { secure: true });
};

export const authorizeAccessLevel = async => {
  const refreshToken = Cookies.get('refresh_token');

  if (!refreshToken) {
    return false;
  }

  return true;
}