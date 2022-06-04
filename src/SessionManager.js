//save login response > (user's name and token) to session storage
export const authenticate = (response, accessToken, next) => {
  if (window !== 'undefined') {
    // console.log('authenticate', response)
    sessionStorage.setItem('token', JSON.stringify(accessToken));
    sessionStorage.setItem('id', JSON.stringify(response.data.id));
  }
  next();
};

//save login response > (user's name and token) to session storage
export const authenticateCustomer = (response, next) => {
  if (window !== 'undefined') {
    sessionStorage.setItem('User ID', JSON.stringify(response.data._id));
  }
  next();
};

//access access name from session storage
export const getToken = () => {
  if (window !== 'undefined') {
    if (sessionStorage.getItem('token')) {
      return JSON.parse(sessionStorage.getItem('token'));
    } else {
      return false;
    }
  }
};

//access user's name from session storage
export const getUser = () => {
  if (window !== 'undefined') {
    if (sessionStorage.getItem('User ID')) {
      return JSON.parse(sessionStorage.getItem('User ID'));
    } else {
      return false;
    }
  }
};

//access customer user's name from session storage
export const getCustomerUser = () => {
  if (window !== 'undefined') {
    if (sessionStorage.getItem('userId')) {
      return JSON.parse(sessionStorage.getItem('userId'));
    } else {
      return false;
    }
  }
};

//remove token from session storage
export const logout = (next) => {
  if (window !== 'undefined') {
    sessionStorage.removeItem('User ID');
  }
  // next();
};

//remove token from session storage customer
export const customerLogout = (next) => {
  if (window !== 'undefined') {
    sessionStorage.removeItem('userId');
  }
  // next();
};
