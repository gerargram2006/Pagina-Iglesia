import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Horarios from './pages/Horarios';
import QuienesSomos from './pages/QuienesSomos';
import Pastores from './pages/Pastores';
import Eventos from './pages/Eventos';
import Contacto from './pages/Contacto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="horarios" element={<Horarios />} />
          <Route path="quienes-somos" element={<QuienesSomos />} />
          <Route path="pastores" element={<Pastores />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
