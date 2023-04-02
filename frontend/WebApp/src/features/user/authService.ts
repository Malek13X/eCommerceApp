import axios from 'axios';

const API_URL = '/api/users';

// Sign-Up/Register user
const signUp = async (userData: any) => {
   const response = await axios.post(API_URL + '/register', userData);

   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
   }
   return response.data;
};

// Sign-In/Login user
const signIn = async (userData: any) => {
   const response = await axios.post(API_URL + '/login', userData);

   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
   }

   return response.data;
};

// Sign-Out/Logout user
const signOut = async () => {
   localStorage.removeItem('user');
};

// Update user profile
const updateUserProfile = async (userData: any, token: any) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      }
   };
   console.log(token);

   const response = await axios.put(API_URL + '/profile', userData, config);

   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);

      return response.data;
   }
};

const authService = {
   signUp,
   signIn,
   signOut,
   updateUserProfile
};

export default authService;
