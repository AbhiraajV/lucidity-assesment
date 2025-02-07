
import './App.css'
import ParentLoader from './components/ParentLoader';
import Navbar from './components/Navbar';
import { InventoryStats } from './components/inventory-stats';
import { ProductTable } from './components/ProductsTable';
import Modal from './components/Modal';

function App() {
  // const {products,productStats} = useProductStore(state=>state);
  return (
    <ParentLoader>
        <Navbar/>
        <InventoryStats/>
        <ProductTable/>
        <Modal/>
    </ParentLoader>
  )
}

export default App
