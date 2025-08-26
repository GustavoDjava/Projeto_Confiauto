import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AnalisarData from './pages/AnalisarData';




function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/test-server' element={<AnalisarData />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
