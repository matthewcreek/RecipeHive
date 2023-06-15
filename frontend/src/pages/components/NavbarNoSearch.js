import React from 'react';
import './components.css';
import logo from '../images/RecipeHiveicon.png';
import HamburgerButton from './HamburgerButton';


export default function Navbar({ handleSearch }) {
  return (
    <div className='navbar'>
      <HamburgerButton />
      <img className='navbar--logo' src={logo} alt='logo' />
      <h1 className='navbar--title'>Recipe Hive</h1>
    </div>
  );
}