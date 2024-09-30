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

export const fetchDataAndTransform = async (url, transformFn) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return transformFn ? transformFn(data) : data; // Apply transformation if provided
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
    return { error: error.message }; // Return error message for display
  }
};

export const transformToChartData = (data) => {
  return Object.keys(data).map(date => ({
    date: date,         // Keep the date as is; you may format it if needed
    value: data[date]   // Get the corresponding value for the date
  }));
};
