import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Dining from './Components/Pages/Dining/Dining';
import Resources from './Components/Pages/Resources/Resources';
import Transportation from './Components/Pages/Transportation/Transportation';
import Blog from './Components/Pages/Blog/Blog';
import Profile from './Components/Pages/Profile/Profile';
import Parking from './Components/Pages/Transportation/Parking'
import RoutePage from './Components/Pages/Transportation/Route'

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/transportation" element={<Transportation />} />
        {/* <Route path="/blogs" element={<Blog />} />
        <Route path="/profile" element={<Profile />} /> */}
        <Route path="/parking" element={<Parking />} />
        <Route path="/route" element={<RoutePage />} />
      </Routes>
    </Router>
  );
}

export default App;
