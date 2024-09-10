import React from 'react';
import logo from '../../assets/new iwemi.png'
import { Link } from 'react-router-dom';
const AdminSidebar = () => {
    return (
        <div className='flex flex-col bg-slate-100 h-full w-full justify-center'>
            <div className='px-2 sm:pl-14 py-3 broder border-black'>
                <Link to='/admin'>
                    <img src={logo} width={100} alt='' />
                </Link>

            </div>
            <div className="w-20 sm:w-80 h-[100vh] relative py-4 border-none">
                <div className='w-[50%] sm:w-[80%] absolute right-0'>
                    <Link to='/admin/product' className='flex item-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-7px_7px_0px_#000000]'>

                        <p>Products</p>
                    </Link>
                    <Link to='/admin/orders' className='mt-5 flex item-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-7px_7px_0px_#000000]'>

                        <p>Orders</p>
                    </Link>
                    <Link to='/admin/users' className='mt-5 flex item-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-7px_7px_0px_#000000]'>

                        <p>Users</p>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default AdminSidebar;
