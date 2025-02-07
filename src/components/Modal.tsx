import { useModalStore } from "../store/modal.slice"
import { EditProductForm } from "./product-form";


function Modal() {
  const {currentModal} = useModalStore(state=>state);
  if(!currentModal) return;
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-[#00000067] flex items-center justify-center">
        <EditProductForm/>
    </div>
  )
}

export default Modal