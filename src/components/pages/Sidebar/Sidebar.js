import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { RiDashboard3Line, RiAccountCircleLine, RiStore3Line, RiAddCircleLine, RiContactsBook2Line, RiSettings2Line, RiMessage2Line, RiSearchLine, RiFolder2Line, RiLogoutBoxLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import control from '../../../assets/control.png';
import logo from '../../../assets/logo.png';
const Sidebar = () => {
    // side bar left right
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // log out Function

    const logOut = async () => {
        // const clear = localStorage.removeItem('token')
        await fetch('https://wehatbazar.thecell.tech/api/logout', {
            method: "post",
            headers: {
                "content-type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "authorization": `Bearer ${localStorage.getItem("token")}`             
            },
            
        }).then(res =>res.json() )
        .then(data =>{
            if (data) {
                toast.success(data.message);
                localStorage.removeItem('token')
                navigate('/login')
            }
        })
        .then(err => {
            console.log(err)
        })
    }

    // menu items 

    const menus = [

        { title: "Home", src: <RiDashboard3Line />, to: '/' },
        { title: "Profile", src: <RiAccountCircleLine />, to: '/profile' },
        { title: "Add Shop", src: <RiAddCircleLine />, gap: true, to: '/shop' },
        { title: "Add Category", src: <RiStore3Line />, to: '/add-category' },
        { title: "Product", src: <RiContactsBook2Line />, to: '/products' },
        { title: "Search", src: <RiSearchLine />, to: '/search' },
        { title: "Message", src: <RiMessage2Line />, to: '/message' },
        { title: "Files ", src: <RiFolder2Line />, gap: true, to: '/file' },
        { title: "Setting", src: <RiSettings2Line />, to: '/setting' },
    ];



    return (
        <div className="fixed top-0 left-0 z-30">
            <div className={` ${open ? "w-72" : "w-20"} bg-[#F3F3F3] h-screen  shadow-2xl p-5 pt-8 relative duration-300 `}>
                <img src={control} alt='' className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                <div className="flex gap-x-4 items-center">
                    <img src={logo} alt='' className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
                    <Link className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`} >
                        Dashboard
                    </Link>
                </div>
                <ul className="pt-6">
                    {menus.map((menu, index) => (
                        <Link key={index} to={menu.to}>
                            <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#0D0D0D] hover:text-gray-300 text-neutral text-sm items-center gap-x-4 ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}>
                                <span className='text-2xl font-bold'>{menu.src}</span>
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {menu.title}
                                </span>
                            </li>
                        </Link>


                    ))}
                    <Link onClick={logOut} className='origin-left text-left'>
                        <li className='flex rounded-md p-2 cursor-pointer hover:bg-[#0D0D0D] hover:text-gray-300 text-neutral text-sm items-center gap-x-4' >
                            <span className='text-2xl font-bold'><RiLogoutBoxLine></RiLogoutBoxLine></span>
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                Logout
                            </span>
                        </li>
                    </Link>
                </ul>
            </div>
            <Toaster />
        </div>
    );
};

export default Sidebar;