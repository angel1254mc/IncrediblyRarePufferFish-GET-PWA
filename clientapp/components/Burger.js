import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
function Burger({toggleNav, setToggleNav}) {
    const handleToggleNav = (e) => {
        e.preventDefault();
        console.log("You just clicked to toggle");
        setToggleNav(!toggleNav);
    }
  return (
    <div>
        <button onClick = {(e) => handleToggleNav(e)}>
            <MenuIcon></MenuIcon>
        </button>
    </div>
  )
}

export default Burger