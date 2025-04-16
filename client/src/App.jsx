import React from 'react';
import './App.css';
import  {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import WeatherPage from './pages/WeatherPage';
import TodoPage from './pages/TodoPage';

export default function App() {
    return (
        <Router>
            <nav className="nav-bar">
                <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/todo">To-Do</Link></li>
                <li><Link to="/weather">Weather</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<TodoPage />} />
                <Route path="/weather" element={<WeatherPage />} />
            </Routes>
        </Router>
    );
}
