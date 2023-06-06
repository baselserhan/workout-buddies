import React from "react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <NavLink to={"/"}>
          <h2>Workout Buddy</h2>
        </NavLink>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <NavLink
                to={"/login"}
                className={(props) => (props.isActive ? "active" : "")}
              >
                Login <i className="fas fa-sign-in-alt"></i>
              </NavLink>
              <NavLink
                to={"/signup"}
                className={(props) => (props.isActive ? "active" : "")}
              >
                Signup <i className="fas fa-user"></i>
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
