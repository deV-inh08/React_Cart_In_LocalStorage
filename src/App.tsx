import './App.css'
import { Container } from 'react-bootstrap';
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home.tsx"
import Store from "./components/Store/Store.tsx";
import Navbar from './components/Navbar/Navbar.tsx';
import About from "./components/About/About.tsx";
import { ShoppingCartProvider } from './context/ShoppingCartContext.tsx';

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar></Navbar>
      <div className='container'>
        <Container className='mb-4' >
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/store' element={<Store />}></Route>
            <Route path='/about' element={<About />}></Route>
          </Routes>
        </Container>
      </div>
    </ShoppingCartProvider>

  )
};

export default App;
