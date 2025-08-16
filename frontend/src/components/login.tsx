import Link from "next/link"
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { formTypeLogin } from "../types/form";
import { validateFormData } from "../utils/formValidate"
import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {
	toogle: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({ toogle }: Props) => {
	const router = useRouter() 
	const { register, handleSubmit, reset, watch, formState: { errors } } = useForm < formTypeLogin > ()

          const passwordValue = watch("password") || "";
          const emailValue = watch("email") || "";




	const SubmitFormData = async (formData: formTypeLogin) => {
		try {
			const response = await axios.post("http://localhost:5000/api/auth/login", formData,   { withCredentials: true });
			toast.success(response.data.message + ", now verify OTP");

			await axios.post("http://localhost:5000/api/auth/sendOtp", {email:formData.email});

			localStorage.setItem("email",formData.email)
			router.push("/verifyOtp");
		} catch (err) {
			if (axios.isAxiosError(err)) {
				console.error(err.response);
				toast.error(err.response?.data.message);
			} else {
				toast.error("An unexpected error occurred come back later");
			}
		}
	};


	const formSubmit = (data: formTypeLogin): void | formTypeLogin => {
		if (!validateFormData(data)) {
			toast.error("Invalid form data")
			return;
		}

		SubmitFormData(data)
		reset()
	}

	return (

		<div className="w-full h-screen flex items-center justify-center relative">
			<div className="flex flex-col w-full items-center justify-center min-h-screen bg-black">


				<div className="absolute top-3 left-5 ">
					<h1 className="hidden md:flex text-2xl font-bold leading-none">CodeSync!</h1> </div>

				<h1 className="text-3xl font-bold leading-none m-0">Welcome!</h1>
				<p className="text-white ml-1">Login to continue to CodeSync</p>
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

				<form onSubmit={handleSubmit(formSubmit)} className="p-6 m-1 rounded shadow-md w-[30rem] ">
					<div className="mb-4">
						<label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email </label>
						<input data-testid="testid_email_login"  {...register("email", {
							required: "email is mandatory"
						})} placeholder="Your email address" className="w-full p-3 mb-1 placeholder-white border-1 outline-none focus:ring-1 border-purple-200 rounded" />
						<p className="text-red-500">{errors.email ? errors.email.message : ""}</p>
						<div className="flex items-center justify-between">
							<label className="block text-white mt-1 text-sm font-bold mb-2" htmlFor="password">Password</label>
							<Link href="/forgotPassword" className="text-purple-200 text-sm hover:underline">Forgot password?</Link>
						</div>

						<input data-testid="testid_password_login"
							{...register("password", {
								required: "password is mandatory",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters"
								},
								maxLength: {
									value: 30,
									message: "Password must be less than 20 characters"
								},
							})}
							placeholder="Your password " className="w-full p-3 mb-1 placeholder-white border-1 outline-none focus:ring-1 border-purple-200 rounded" />
						<p className="text-red-500">{errors.password ? errors.password.message : ""}</p>
					</div>
					<div className="mb-4">
<button
  disabled={passwordValue.length < 6 || emailValue.length < 10}
  data-testid="testid_login_button"
  className={`${
     passwordValue.length < 6 || emailValue.length < 10 ? "cursor-not-allowed text-gray-500 bg-gray-600"
      : "bg-black text-white border border-[#333] rounded cursor-pointer hover:bg-[#333] transition duration-300"
  } px-48 py-2 font-semibold`}
>
  Login
</button>

						<div data-testid="DontHave_Account" onClick={() => toogle(false)} className="text-purple-200 ml-30 cursor-pointer text-sm hover:underline mt-7">Don't Have an Account? Register</div>
					</div>
				</form>


			</div >
		</div >
	)
}
export default Login;
