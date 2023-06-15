import React, { useEffect, useRef, useState } from 'react';

import DropdownMenu from './DropdownMenu';

const HamburgerButton = () => {
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

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-button" onClick={handleClick} ref={ref}>
      <div className="hamburger-line" />
      <div className="hamburger-line" />
      <div className="hamburger-line" />
      <DropdownMenu isOpen={isOpen} />
    </div>
  );
};

export default HamburgerButton;