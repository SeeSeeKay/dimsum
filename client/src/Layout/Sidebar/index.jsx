import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useSignOutUserMutation} from '../../store/user/apiSlice';
import { signOut } from '../../store/user/authSlice';
import { SlLayers, SlPlus, SlEnvolope, SlHome, 
  SlHeart, SlLogout, SlUser, SlBubble, 
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialPintarest} from "react-icons/sl";
import SidebarToggle from '../../components/SidebarToggle';
import {GiCalculator} from "react-icons/gi";

const menuItems = {
  // Main
  main: [
    { name: "Dashboard", icon: <SlLayers/>, link: "/dashboard" },
    { name: "Add Property", icon: <SlPlus/>, link: "/add-property" },
    { name: "Message", icon: <SlEnvolope/>, link: "/dashboard" }
  ],
  // Manage Listing
  manageListing: [
    { name: "My Properties", icon: <SlHome/>, link: "/my-listing" },
    { name: "My Favorites", icon: <SlHeart/>, link: "/fav-listing" },
    { name: "Reviews", icon: <SlBubble/>, link: "/dashboard" },
    { name: "Mortgage Calculator", icon: <GiCalculator />, link: "/mortgage-calculator" }
  ],
  // manageAccount: [
  //   { name: "Profile", icon: <SlUser/>, link: "/profile" },
  //   { name: "Signout", icon: <SlLogout/>, link: "/dashboard" }
  // ]
}

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const {userInfo} = useSelector((state) => state.auth);
  const [signOutUser, { isError }] = useSignOutUserMutation();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {setShowSidebar(!showSidebar)};


  const handleItemClick = (item) => {setSelectedItem(item)};

  const handleSignOut = async () => {
    try {
      await signOutUser().unwrap();
      dispatch(signOut());

      navigate('/signin');

      toast.success("Sign out successfully");
    } catch (error) {
      if (!isError) return;
      toast.error("Failed to sign out: ", error.message);
    }
  };


  return (
    <aside className="bg-gray-100 sidebar relative ">
      {/* Sidebar */}
      <div
        className={`w-64 bg-slate-100 shadow-lg fixed left-0 top-0 h-full ease-in duration-300 z-50 overflow-y-auto
          ${showSidebar ? 'translate-x-0' : '-translate-x-64'} lg:translate-x-0`}>
        <div className='p-10'></div>
        <div>
          <span className='text-gray-600 text-sm p-4 py-2'>Main</span>
          <nav className="mt-2">
            <ul>
              {menuItems.main.map((item, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-200">
                  <Link to={item.link} className={`flex items-center gap-3 ${
                    selectedItem === item ? "text-lime-500" : "hover:text-gray"}`}
                  ><i>{item.icon}</i> {item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Manage Listing */}
        <div className='mt-5'>
          <span className='text-gray-600 text-sm p-4 py-2'>Manage Listing</span>
          <nav className="mt-2">
            <ul>
              {menuItems.manageListing.map((item, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-200">
                  <Link to={item.link} className={`flex items-center gap-3 ${
                    selectedItem === item ? "text-lime-500" : "hover:text-gray"}`}>
                    <i>{item.icon}</i> 
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Manage Account */}
        <div className="w-full mb-5">
          <span className='text-gray-600 text-sm p-4 py-2'>Manage Account</span>
          <nav className="mt-2">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/profile" className="flex items-center gap-3"
                ><i><SlUser/></i> Profile</Link>
              </li>
              
              <li className="px-4 py-2 hover:bg-gray-200">
                <button className="flex items-center gap-3 hover:text-secondary" 
                  onClick={handleSignOut}>
                  <i><SlLogout/></i> 
                  Signout
                  </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>



      {/* Content */}

      <SidebarToggle showSidebar={showSidebar} toggleSidebar={toggleSidebar} />

      {/* Footer */}
      <footer className='lg:pl-64 '>
        <div className="bg-gray-100 w-full">
          <div className="container py-4 px-5 mx-auto flex justify-between items-center sm:flex-row flex-col">
            <p className="text-sm text-gray-500 ">© {new Date().getFullYear()}{" "} Assignment 1 by
              <a href="https://github.com/SeeSeeKay/dimsum" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">DimSum</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <a className="ml-3 text-xl font-extrabold text-white p-2 bg-secondary shadow-lg rounded-lg">
                <SlSocialFacebook />
              </a>
              <a className="ml-3 text-xl font-extrabold text-white p-2 bg-secondary shadow-lg rounded-lg">
                <SlSocialInstagram />
              </a>
              <a className="ml-3 text-xl font-extrabold text-white p-2 bg-secondary shadow-lg rounded-lg">
                <SlSocialPintarest />
              </a>
            </span>
          </div>
        </div>        
      </footer>
    </aside>
  );
};

export default Sidebar;
