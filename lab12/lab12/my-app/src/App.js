import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import Cart from './pages/Cart/Cart';
import Item from './pages/Item/Item';
import CheckOut from './pages/CheckOut/CheckOut';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Success from './pages/Success/Success';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>}/>
          <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path='/catalog' element={<PrivateRoute><Catalog/></PrivateRoute>}/>
          <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
          <Route path='/item/:id' element={<PrivateRoute><Item/></PrivateRoute>}/>
          <Route path='/checkout' element={<PrivateRoute><CheckOut/></PrivateRoute>}/>
          <Route path='/success' element={<PrivateRoute><Success/></PrivateRoute>}/>
          <Route path='/login' Component={Login}/>
          <Route path='/register' Component={Register}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
