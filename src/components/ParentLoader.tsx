import React from 'react'
import { useProductStore } from '../store/product.slice';
import { useUserStore } from '../store/user.slice';

type Props = {
    children: React.ReactNode
}

export default function ParentLoader({ children }: Props) {
  const { isProductSessionReady } = useProductStore(state => state);
  const { isUserReady } = useUserStore(state => state);

  if (!isUserReady) return <div>Checking if user exists...</div>;
  if (!isProductSessionReady) return <div>User setup done! Fetching products!...</div>;

  return <div className='bg-slate-950 h-screen text-white px-10'>{children}</div>;
}
