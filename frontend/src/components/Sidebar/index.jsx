import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUserShield, FaChartBar, FaSignOutAlt, FaBars } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const [aberta, setAberta] = useState(false);
    const sidebarRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const toggleSidebar = () => {
        setAberta(!aberta);
    };

    // Fecha ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setAberta(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <button className="menu-toggle" onClick={toggleSidebar}>
                <FaBars />
            </button>

            <aside ref={sidebarRef} className={`sidebar ${aberta ? "open" : ""}`}>
                <div className="sidebar-header">
                    {aberta && <h2 className="sidebar-logo">Menu</h2>}
                </div>

                <div className="sidebar-content">
                    <nav className="sidebar-menu">
                        <NavLink
                            to="/home"
                            onClick={() => setAberta(false)}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <FaHome className="sidebar-icon" />
                            Home
                        </NavLink>

                        <NavLink
                            to="/admin"
                            onClick={() => setAberta(false)}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <FaUserShield className="sidebar-icon" />
                            Painel Admin
                        </NavLink>

                        <NavLink
                            to="/dashboard"
                            onClick={() => setAberta(false)}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <FaChartBar className="sidebar-icon" />
                            Dashboard
                        </NavLink>
                    </nav>

                    <div className="sidebar-footer">
                        <button className="logout-button" onClick={handleLogout}>
                            <FaSignOutAlt className="sidebar-icon" />
                            Sair
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;