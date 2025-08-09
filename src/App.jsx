import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Loginpage from './components/Loginpage';

import Add from './components/Add';
import Product from './components/Product';
import Profile from './components/Profile'; 

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Loginpage setUserRole={setUserRole} />} />
      <Route path="/h" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/product" element={<Product />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
