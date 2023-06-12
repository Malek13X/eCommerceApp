import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Test from './pages/Test';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Nav from './components/NavBar//Nav';

import { darkTheme, lightTheme } from './components/data';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';

const App: React.FC = () => {
   const { themeMode } = useSelector((state: any) => state.UI);
   const theme = themeMode === 'dark' ? darkTheme : lightTheme;

   return (
      <>
         <Router>
            <div
               className={`min-h-screen    ${theme.bgColor} ${theme.textColor} `}
            >
               <Nav />
               <Routes>
                  <Route path="/" element={<Home theme={theme} />} />
                  <Route path="/signup" element={<SignUp theme={theme} />} />
                  <Route path="/signin" element={<SignIn theme={theme} />} />
                  <Route path="/profile" element={<Profile theme={theme} />} />
                  <Route path="/test" element={<Test theme={theme} />} />
                  <Route
                     path="/dashboard"
                     element={<AdminDashboard theme={theme} />}
                  />
               </Routes>
               <Footer theme={theme} />
            </div>
         </Router>
         {/* <ToastContainer /> */}
      </>
   );
};

export default App;
