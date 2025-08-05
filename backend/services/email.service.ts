import  nodemailer from  "nodemailer"
import Otp  from "../Utils/token"


const transport = nodemailer.createTransport({
	service:"gmail",
	auth:{
		user: "owner email",
		pass:"owner password" 
	}, 
})

const sendOtpEmail  = async (to:string , otp:string) => {
	const mailOption ={ 
		from:"owner email" ,
		to:to,
		subject:"Your Otp code" ,
		html:`<p> Your Otp code is ${otp}</p>`
	}

	await transport.sendMail(mailOption)	
}

export default sendOtpEmail


