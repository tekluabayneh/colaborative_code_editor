"use client"
import Image from "next/image"
import "../../styles/globals.css"
import Register from "../../components/register"
import Login from "../../components/login"
import { useState } from "react"
import image from "../../../../assets/loginimage2.png"
const Auth = () => {
    const [isLogin, setisLogin] = useState<boolean>(true);

    return (
        <div className="w-full h-screen flex items-center justify-center relative">
            <div className="w-full">
                {isLogin ?
                    <Login toogle={setisLogin} /> :
                    <Register toogle={setisLogin} />}
            </div>
            <div className="hidden md:flex w-full items-center text-white justify-center mt-4">
                <Image src={image} alt="Description of image" className="w-full h-screen object-cover" />
                <p className="absolute bottom-4 text-white text-sm">© 2025 CodeSync. All rights reserved.</p>
            </div>
        </div>

    )
}

export default Auth
