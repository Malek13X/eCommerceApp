import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate
} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Test from './pages/Test';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';
import Nav from './components/NavBar/Nav';

import { darkTheme, lightTheme } from './components/data';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import OrdersHistory from './pages/OrdersHistory';

const App: React.FC = () => {
   const { themeMode } = useSelector((state: any) => state.UI);
   const { user } = useSelector((state: any) => state.auth);
   const theme = themeMode === 'dark' ? darkTheme : lightTheme;

   const isAdmin = user && user.role === 'admin';

   return (
      <>
         <Router>
            <div
               className={`flex min-h-screen flex-col justify-between ${theme.bgColor} ${theme.textColor} `}
            >
               <Nav />
               <div>
                  <Routes>
                     <Route path="/" element={<Home theme={theme} />} />
                     <Route path="/signup" element={<SignUp theme={theme} />} />
                     <Route path="/signin" element={<SignIn theme={theme} />} />
                     <Route
                        path="/account"
                        element={<Account theme={theme} />}
                     />
                     <Route path="/test" element={<Test theme={theme} />} />
                     <Route
                        path="/orders"
                        element={<OrdersHistory theme={theme} />}
                     />
                     <Route
                        path="/admin/dashboard"
                        element={
                           isAdmin ? (
                              <AdminDashboard theme={theme} />
                           ) : (
                              <Navigate to="/signin" />
                           )
                        }
                     />

                     <Route
                        path="/art"
                        element={<CategoryPage category="Art" theme={theme} />}
                     />
                     <Route
                        path="/electronics"
                        element={
                           <CategoryPage category="Electronics" theme={theme} />
                        }
                     />
                     <Route
                        path="/entertainment"
                        element={
                           <CategoryPage
                              category="Entertainment"
                              theme={theme}
                           />
                        }
                     />
                     <Route
                        path="/fashion"
                        element={
                           <CategoryPage category="Fashion" theme={theme} />
                        }
                     />
                     <Route
                        path="/food"
                        element={<CategoryPage category="Food" theme={theme} />}
                     />
                     <Route
                        path="/gifts"
                        element={
                           <CategoryPage category="Gifts" theme={theme} />
                        }
                     />
                     <Route
                        path="/health"
                        element={
                           <CategoryPage category="Health" theme={theme} />
                        }
                     />
                     <Route
                        path="/home"
                        element={<CategoryPage category="Home" theme={theme} />}
                     />
                     <Route
                        path="/jewelry"
                        element={
                           <CategoryPage category="Jewelry" theme={theme} />
                        }
                     />
                     <Route
                        path="/kids"
                        element={<CategoryPage category="Kids" theme={theme} />}
                     />
                     <Route
                        path="/furniture"
                        element={
                           <CategoryPage category="Furniture" theme={theme} />
                        }
                     />
                     <Route
                        path="/pet"
                        element={<CategoryPage category="Pet" theme={theme} />}
                     />
                     <Route
                        path="/sports"
                        element={
                           <CategoryPage category="Sports" theme={theme} />
                        }
                     />
                     <Route
                        path="/tools"
                        element={
                           <CategoryPage category="Tools" theme={theme} />
                        }
                     />
                  </Routes>
               </div>

               <Footer theme={theme} />
            </div>
         </Router>
         {/* <ToastContainer /> */}
      </>
   );
};

export default App;
