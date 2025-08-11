import  nodemailer , { Transporter,SendMailOptions }from  "nodemailer"

const transport: Transporter = nodemailer.createTransport({
	service:"gmail",
	auth:{
		user:process.env.GMAIL, 
		pass:process.env.USER_PASSWORD,
	}, 
})

const sendOtpEmail = async (to: string, otp: string) => {
  const mailOption: SendMailOptions = {
    from: `"CodeSync" <${process.env.GMAIL}>`,
    to: to,
    subject: "Your OTP Code - from  CodeSync",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f7f8fa; padding: 30px; text-align: center;">
        
        <h1 style="color: #4A90E2; font-size: 28px; margin-bottom: 10px;">
          <span style="background-color:#4A90E2; color:#fff; padding:8px 14px; border-radius:6px;">
            CodeSync
          </span>
        </h1>

        <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; max-width: 400px; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #333; font-size: 20px;">Your OTP Code</h2>
          <p style="color: #555; font-size: 15px; line-height: 1.5;">
            Use the following code to complete your verification process:
          </p>
          <div style="margin: 20px 0;">
            <span style="display: inline-block; background-color: #4A90E2; color: #fff; padding: 12px 20px; font-size: 22px; letter-spacing: 4px; border-radius: 6px;">
              ${otp}
            </span>
          </div>
          <p style="color: #888; font-size: 13px;">
            This code will expire in 5 minutes. Please do not share it with anyone.
          </p>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          &copy; ${new Date().getFullYear()} CodeSync. All rights reserved.
        </p>
      </div>
    `,
  };
	transport.sendMail(mailOption)	
};

export default sendOtpEmail


