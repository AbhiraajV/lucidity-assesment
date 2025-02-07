import React from 'react'
import { useProductStore } from '../store/product.slice';
import { useUserStore } from '../store/user.slice';

type Props = {
    children: React.ReactNode
}

export default function ParentLoader({ children }: Props) {
  const { isProductSessionReady,productFetchError } = useProductStore(state => state);
  const { isUserReady } = useUserStore(state => state);

  if (!isUserReady) return <div className='text-white font-extrabold text-md'>Checking if user exists...</div>;
  if (!isProductSessionReady) return <div className='text-white font-extrabold text-md'>User setup done! Fetching products!... {productFetchError.length > 0 ? `${productFetchError}, please try again later!`: ``}</div>;

  return <div className='bg-[#0c0327] h-screen text-white px-1 md:px-10'>{children}</div>;
}
