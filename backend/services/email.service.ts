import  nodemailer , { Transporter,SendMailOptions }from  "nodemailer"

const transport: Transporter = nodemailer.createTransport({
	service:"gmail",
	auth:{
		user:process.env.GMAIL, 
		pass:process.env.USER_PASSWORD,
	}, 
})

const sendOtpEmail  = async (to:string , otp:string) => {
	const mailOption: SendMailOptions ={ 
		from: process.env.GMAIL,
		to:to,
		subject:"Your Otp code" ,
		html:`<p> Your Otp code is ${otp}</p>`
	}
	console.log(mailOption)
	transport.sendMail(mailOption)	
}

export default sendOtpEmail


