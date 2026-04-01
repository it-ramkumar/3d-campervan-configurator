export const checkAuth = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  };
  
  export const getAuthHeaders = () => {
    return {
      'Authorization': localStorage.getItem('token')
    };
  };