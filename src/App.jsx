import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Loginpage from './components/Loginpage';
import AdminHome from './components/AdminHome';
import Adduser from './components/Adduser';
import Add from './components/Add.jsx';
import Product from './components/Product.jsx'; // ✅ real product page
import Profile from './components/Profile.jsx'; // ✅ real profile page

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Loginpage setUserRole={setUserRole} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/product" element={<Product />} /> {/* ✅ real component */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/adduser" element={<Adduser />} />
    </Routes>
  );
}

export default App;
