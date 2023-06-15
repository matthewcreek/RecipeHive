import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import RecipeList from "./RecipeList";

export default function RecipeListPage() {
    const [searchTerm, setSearchTerm] = useState('');

    function handleSearch(term) {
      setSearchTerm(term);

    }
    return (
        <div>
      <Navbar handleSearch={handleSearch} />           
      <RecipeList searchTerm={searchTerm} />
        </div>
    )
}