import React, { useEffect, useState } from 'react'
import Burger from './Burger';
import Link from 'next/link';
let ignoreClickOnMeElement;
const NavBar = () => {

    const toggleNavClickAway = (event) => {
        console.log(event.target);
    };
    const [toggleNav, setToggleNav] = useState(false);
    useEffect(() => {
        //Just reloading this thing whenever toggleNav is changed.
        //I hate react strict mode
        let navbarExpand = document.getElementById("navbar-expand");
        if (toggleNav)
        {
            navbarExpand.classList.remove("contracted");
            navbarExpand.classList.add("expanded");
        }
        else
        {
            navbarExpand.classList.remove("expanded");
            navbarExpand.classList.add("contracted");
        }
    }, [toggleNav])
    useEffect(() => {
        let navbarExpand = document.getElementById("navbar-expand");
        navbarExpand.classList.remove("contracted");
        navbarExpand.classList.remove("expanded");

        ignoreClickOnMeElement = document.getElementById('nav');

        document.addEventListener('click', function(event) {
        var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
        if (!isClickInsideElement) {
            setToggleNav(false);
        }
});
    }, [])
    
  return (
    <div id="nav" className="relative w-full flex justify-between items-center z-10">
        <div className="mb-5 bg-black text-white w-full h-16 flex justify-between items-center z-10">
            <Link href="/"><a><div className="px-4">GET</div></a></Link>
            <div className="px-4"><Burger toggleNav={toggleNav} setToggleNav={setToggleNav}></Burger></div>
        </div>
        <div className="absolute mt-[-100%] w-full z-5 top-0" onClick = {(e) => {toggleNavClickAway(e)}} id = "navbar-expand">
            <div className="relative top-16 bg-black h-auto w-full px-5 text-white flex flex-col justify-start items-around overflow-hidden">
                <Link href="/"><a><div className="my-3 text-lg">View Glossary<hr></hr></div></a></Link>
                <Link href="/contact"><a><div className="my-3 text-lg">Request Term Addition<hr></hr></div></a></Link>
                <Link href="/about"><a><div className="my-4 text-lg">About GET<hr></hr></div></a></Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar;