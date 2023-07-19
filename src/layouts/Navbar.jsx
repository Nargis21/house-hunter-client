import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useEffect, useState } from "react";
// import "../styles/navbar.css";
import getAuth from "../hooks/getAuthUser";
import { toast } from "react-toastify";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  const [navbarBgBlur, setNavbarBgBlur] = useState(false);
  const [user, setUser] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const user = await getAuth();
      if (user) {
        setUser(user);
      }
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isScrolled = window.scrollY > 0;
  //     setNavbarBgBlur(isScrolled);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div className={`navbar lg:px-6 md:px-4 shadow-lg`}>
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold"
          >
            <li>
              <Link to="/books">All Books</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className=" hidden lg:flex">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-[50px]" />
            <h1 className="normal-case text-2xl font-thin">
              {" "}
              <span className="font-bold tes">House</span> Hunter
            </h1>
          </div>
        </Link>
      </div>

      <div className="navbar-end ">
        <ul className="menu menu-horizontal px-1 hidden lg:flex text-gray-700 font-semibold text-[16px]">
          {user ? (
            <li>
              <button onClick={handleLogout}> Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <Link to="/" className=" lg:hidden">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-[50px]" />
            <h1 className="normal-case text-xl font-thin">
              {" "}
              <span className="font-bold tes">House</span> Hunter
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
