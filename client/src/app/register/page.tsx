import Link from "next/link"
import "../../styles/globals.css"

const Register = () => {
  return (
		<div className="w-full h-screen flex items-center justify-center relative">
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-black">
  <div className="absolute top-3 left-5">
      <h1 className="text-2xl font-bold leading-none">CodeSync!</h1>
      </div>


      <h1 className="text-3xl font-bold leading-none m-0">Welcome!</h1>
	<p className="text-white ml-1">Register to continue to CodeSync</p>

       <div className="flex flex-col items-center justify-center mt-4 gap-3">	
       <div className="flex items-center justify-center">	
	<button className="bg-black text-white border border-[#333] rounded cursor-pointer px-36 py-2 font-semibold hover:bg-[#333] transition duaration-300">
        Login with Google 
	</button>
	</div>
       <div className="flex items-center justify-center">	
	<button className="bg-black text-white border border-[#333] rounded cursor-pointer px-36 py-2 font-semibold hover:bg-[#333] transition duaration-300">
        Login with Github 
	</button>
	</div>
	</div>
	    <div className="flex items-center justify-center mt-6">
		<span className="bg-white  w-23 mr-1 md:w-32 h-0.5"></span>
					Or
		<span className="bg-white  w-23 ml-1 md:w-32 h-0.5"></span>
	</div>
      <form className="p-6 m-1 rounded shadow-md w-[30rem] ">
	<div className="mb-4">
         <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email </label> <input placeholder="Your email address"  className="w-full p-3 mb-1 placeholder-white border-1 outline-none focus:ring-1 border-purple-200 rounded"/>
						<div className="flex items-center justify-between">
	<label className="block text-white mt-1 text-sm font-bold mb-2" htmlFor="password">Password</label>
 	<Link href="#" className="text-purple-200 text-sm hover:underline">Forgot password?</Link>
	</div>
	  <input type="password" placeholder="Your password"
	    className="w-full px-3 py-2  border rounded focus:outline-none focus:ring-1 focus:accent-purple-200" />
	</div>
	<div className="mb-4">
<button className="bg-black text-white border border-[#333] rounded cursor-pointer px-45 py-2 font-semibold hover:bg-[#333] transition duaration-300">
						Register
	</button>

	<Link href="/login" className="text-purple-200 ml-30  text-sm hover:underline mt-7">Already have an account? Login</Link>
	</div>
      </form>
  </div>
			<div className="hidden md:flex w-full items-center text-white justify-center mt-4">
			 this one is image
			 </div>
  </div>
)}
export default Register;
