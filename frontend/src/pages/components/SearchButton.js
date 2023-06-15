import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ handleSearch }) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpen])

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleChange(event) {
    handleSearch(event.target.value);
  }

  return (
    <div className='search-bar' ref={ref}>
      <FaSearch onClick={handleClick} />
      {isOpen && <input type="text" placeholder='Search' onChange={handleChange} />}
    </div>
  );
}

export default SearchBar;
