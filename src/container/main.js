import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../component/nav-bar';
import recruitment from '../images/recruitment.jpg';
const About=()=>{
    return (
        <div >
            <p className="md:py-8 ... font-sans ... text-2xl md:text-6xl ... font-medium ... text-left ... px-9 mx-10">
            Get hired by the company of your choice with <strong className = "brand-name">Superfast Recruitment</strong>
            </p>
            <br />
            <NavLink to="/candidatelogin" className="border-solid border-2 border-indigo-600 ... rounded-full py-3 px-6... mx-20  whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Get Started
            </NavLink>
        </div>
    );
}
const Main =()=>{
    localStorage.clear();
    return(
        <div className="h-screen">
            <Navbar />
            <div className="grid grid-cols-1  md:grid-cols-2  gap-4 mt-9 justify-items-center ... h-screen ">
                <div className="justify-self-center ... mx-10 self-start md:self-center ... order-last md:order-first ">
                <About />
                </div>
                <div className="h-200 md:h-full mx-9 self-center">
                    <img src={recruitment} className="h-200 md:h-full ... self-end ..."/>
                </div>
            </div>
           
        </div>


    );
}
export default Main;