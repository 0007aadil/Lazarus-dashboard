// import React , {useState} from "react";
// import {Link} from "react-router-dom";


// const Menu = () => {
//   const [selectedMenu , setSelectedMenu] = useState(0);
//   const [isProfileDropdownOpen ,setIsProfileDropdown] = useState(false);

//   const handleMenuClick  = (index) => {
//     setSelectedMenu(index);
//   };

//   const handleProfileClick = (index) => {
//     setIsProfileDropdown(!isProfileDropdownOpen);
//   };


//   const menuClass = "menu";
//   const activeMenuClass = "menu selected";


//   return (
//     <div className="menu-container">
      
//       <div className="menus">
//       <div className="profile" onClick={handleProfileClick}>
//           <div className="avatar">LA</div>
//           <p className="username">USERID</p>
//         </div>
//         &nbsp;&nbsp;&nbsp;
//         <hr />
//         <ul>
//           <li>
//             <Link style={{textDecoration : "none"}} to="/" onClick={() => handleMenuClick(0)}>
//             <p className={selectedMenu===0 ? activeMenuClass : menuClass}>Dashboard</p>
//             </Link>
//           </li>
//           <li>
//           <Link style={{textDecoration : "none"}} to="/orders" onClick={() => handleMenuClick(1)}>
//             <p className={selectedMenu===1 ? activeMenuClass : menuClass}>Order</p>
//             </Link>
//           </li>
//           <li>
//           <Link style={{textDecoration : "none"}} to="/holdings" onClick={() => handleMenuClick(3)}>
//             <p className={selectedMenu===3 ? activeMenuClass : menuClass}>Holdings</p>
//             </Link>
//           </li>
//           <li>
//           <Link style={{textDecoration : "none"}} to="/positions" onClick={() => handleMenuClick(4)}>
//             <p className={selectedMenu===4 ? activeMenuClass : menuClass}>Positions</p>
//             </Link>
//           </li>
//           <li>
//           <Link style={{textDecoration : "none"}} to="/funds" onClick={() => handleMenuClick(5)}>
//             <p className={selectedMenu===5 ? activeMenuClass : menuClass}>Funds</p>
//             </Link>
//           </li>
//           <li>
//           <Link style={{textDecoration : "none"}} to="/apps" onClick={() => handleMenuClick(6)}>
//             <p className={selectedMenu===6 ? activeMenuClass : menuClass}>Apps</p>
//             </Link>
//           </li>
//         </ul>
        
        
        
//       </div>
//       <img src="logo.png" style={{ width: "50px" }} />
      
//     </div>
    
    
//   );
// };

// export default Menu;





import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdown] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdown(!isProfileDropdownOpen);
  };

  // Logout function
  const handleLogout = () => {
    // Clear user authentication (e.g., remove token from localStorage)
    localStorage.removeItem("token"); // Adjust this line based on your auth strategy
    // Redirect to the specified URL
    window.location.href = "http://lazarus-lac.vercel.app";
  };

  // Combine menu classes based on selection
  const getMenuClass = (index) => (selectedMenu === index ? "menu selected" : "menu");

  return (
    <div className="menu-container">
      <div className="menus">
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">LA</div>
          <p className="username"> Go-Out :)</p>
        </div>
        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <ul>

              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
        <hr />
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={getMenuClass(0)}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={getMenuClass(1)}>Order</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={getMenuClass(2)}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={getMenuClass(3)}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={getMenuClass(4)}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(5)}>
              <p className={getMenuClass(5)}>Apps</p>
            </Link>
          </li>
        </ul>
      </div>
      <img src="logo.png" alt="Logo" style={{ width: "50px" }} />
    </div>
  );
};

export default Menu;
