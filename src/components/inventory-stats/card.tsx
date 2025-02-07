import React from 'react';

interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className='rounded-lg w-[300px] px-5 py-4 h-[120px] bg-green-950  text-white flex items-start justify-start gap-2'>
      <div>
        {icon}
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-xl font-light'>{title}</span>
        <span className='text-4xl font-extrabold'>{value}</span>
      </div>
    </div>
  );
};

export default Card;
