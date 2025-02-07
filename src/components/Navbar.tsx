import { useUserStore } from '../store/user.slice';
import { LogOutIcon } from 'lucide-react';
import { Role } from '../types/user';
import { Switch } from './ui/switch';
import { useProductStore } from '../store/product.slice';

function Navbar() {
      const {user,setUser,resetUser} = useUserStore(state=>state);
      const {revalidate} = useProductStore(state=>state);
    
  return (
    <div className=' h-[40px] top-0 left-0 w-full flex items-center justify-center'>
          <div className='mr-auto font-extrabold text-sm'>
            #{Role[user.role]}{user.id}
          </div>
          <div className='ml-auto flex items-center justify-center gap-8'>
            <div className='text-xs font-bold flex items-center justify-center gap-2'>
              <span>
                User
              </span>
              <Switch checked={user.role === Role.ADMIN} onCheckedChange={(e)=>{
                setUser({...user,role:e ? Role.ADMIN : Role.USER})
              }}/>
              <span>
                Admin
              </span>
            </div>
            <LogOutIcon className='cursor-pointer' onClick={async ()=>{
              await revalidate();
              resetUser();
              window.location.reload();
            }}/>
          </div>
        </div>
  )
}

export default Navbar