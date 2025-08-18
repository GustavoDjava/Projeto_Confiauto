import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Upload_Arquivo from './components/Upload_Arquivo';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/teste' element={<Upload_Arquivo />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
