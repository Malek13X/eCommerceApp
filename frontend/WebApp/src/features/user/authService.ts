import axios from 'axios';

const API_URL = '/api/users';

// Sign-Up/Register user
const signUp = async (userData: any) => {
   const response = await axios.post(API_URL + '/register', userData);

   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
   }
   return response.data;
};

// Sign-In/Login user
const signIn = async (userData: any) => {
   const response = await axios.post(API_URL + '/login', userData);

   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
   }

   return response.data;
};

// Sign-Out/Logout user
const signOut = async () => {
   localStorage.removeItem('user');
};

const authService = {
   signUp,
   signIn,
   signOut
};

export default authService;
