import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import Cart from './pages/Cart/Cart';
import Item from './pages/Item/Item';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home}/>
          <Route path='/catalog'exact Component={Catalog}/>
          <Route path='/cart' exact Component={Cart}/>
          <Route path='/item/:id' Component={Item}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
