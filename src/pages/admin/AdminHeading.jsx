import React, { useContext } from 'react';
import { GlobalStateContext } from '../../Context/GlobalState';

const AdminHeading = ({setShowUpload}) => {

    const {user} = useContext(GlobalStateContext)

    const upload =()=>{

    }


    return (
        <div className='flex p-3 bg-gray-50 justify-between items-center w-full'>
            <div className='font-bold text-2xl'>
                Welcome back Admin!!! {user.name}
            </div>
            <div>
               <button className='px-3 py-2 border  border-black/50' onClick={()=>setShowUpload(true)}>
                Upload Paper
            </button>  
            </div>
           
        </div>
    );
}

export default AdminHeading;
