import './App.css';
import RequireAuth from './pages/components/RequireAuth';
import { Route, Routes } from 'react-router-dom';

import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import RecipeListPage from './pages/recipe-list/RecipeListPage';
import AddRecipePage from './pages/add-recipe/AddRecipePage';
import UpdateRecipePage from './pages/update-recipe/UpdateRecipePage';
import Layout from './Layout.js';
import ForgotPasswordPage from './pages/forgot-password/ForgotPasswordPage';
import ResetPasswordPage from './pages/reset-password/ResetPasswordPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Layout}>
          {/* public routes */}
          <Route path='login' Component={LoginPage} />
          <Route path='register' Component={RegisterPage} />
          <Route path='forgot-password' Component={ForgotPasswordPage} />
          <Route path='reset_password' Component={ResetPasswordPage} />

          {/* private routes */}
          <Route element={<RequireAuth />}>
            <Route path='/' Component={RecipeListPage} />
            <Route path='add' Component={AddRecipePage} />
            <Route path='update/:id' Component={UpdateRecipePage} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
