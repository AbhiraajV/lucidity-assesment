import Card from './card';
import { Ban, CircleDollarSign, ShapesIcon, ShoppingCartIcon } from 'lucide-react';
import { useProductStore } from '../../store/product.slice';


export const InventoryStats = () => {
  const {productStats} = useProductStore(state=>state);
  if(!productStats) return <></>
  return (
    <div className=' w-full flex flex-col gap-8 justify-start items-start'>
      <span className='text-4xl font-semibold'>Inventory statistics</span>
      <div className='w-full flex flex-wrap gap-10'>
        <Card
          title="Total products" 
          value={productStats.totalProducts} 
          icon={<ShoppingCartIcon color="white" />} 
        />
        <Card 
          title="Total Store Value" 
          value={productStats.totalStoreValue} 
          icon={<CircleDollarSign color="white" />} 
        />
        <Card 
          title="Out of Stock" 
          value={productStats.outOfStock} 
          icon={<Ban color="white" />} 
        />
        <Card 
          title="Unique Categories" 
          value={productStats.totalUniqueCategories} 
          icon={<ShapesIcon color="white" />} 
        />
      </div>
    </div>
  );
};
