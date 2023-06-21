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
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage/>} />
          <Route path='reset_password' element={<ResetPasswordPage/>} />

          {/* private routes */}
          <Route element={<RequireAuth />}>
            <Route path='/' element={<RecipeListPage/>} />
            <Route path='add' element={<AddRecipePage/>} />
            <Route path='update/:id' element={<UpdateRecipePage/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
