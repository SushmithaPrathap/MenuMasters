import axios from "axios";  //import axios for api calls
import { useEffect, useState } from "react";  //importing useEffect and useState functions from react
import { Link } from "react-router-dom";   //importing link from react-router-dom
import "../../Style/blogsidebar.scss";  //importing blogsidebar scss file

//Function SideBar renders the sidebar component
export default function Sidebar() {
//   const [cats, setCats] = useState([]);

//   useEffect(() => {
//     const getCats = async () => {
//       const res = await axios.get("/categories");
//       setCats(res.data);
//     };
//     getCats();
//   }, []);

//returns the sidebar component 
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          necessitatibus nostrum illum reprehenderit.
        </p>
      </div>
      {/* <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div> */}
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}