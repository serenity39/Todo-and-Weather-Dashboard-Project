import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import Home from './pages/Home';
import WeatherPage from './pages/WeatherPage';
import TodoPage from './pages/TodoPage';

export default function App() {
    return (
        <Router>
            <div className="app-container">
                <nav className="nav-bar">
                    <div className="nav-content">
                        <NavLink to="/" className="logo-link">
                            <div className="logo">Dashboard</div>
                        </NavLink>
                        <ul className="nav-links">
                            <li><NavLink to="/todo">To-Do</NavLink></li>
                            <li><NavLink to="/weather">Weather</NavLink></li>
                        </ul>
                    </div>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/todo" element={<TodoPage />} />
                        <Route path="/weather" element={<WeatherPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
