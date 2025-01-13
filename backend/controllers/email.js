import nodemailer from 'nodemailer'

// this is essentially the set up for the person who'll receive the email
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAILPORT,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
}});

// process of sending the email to that specific email
const sendMail = async ({message, subject}) => {
    //TODO: ERROR CATCHING FOR THIS FUNCTION
    // waits for the set up to finish
    await transporter.sendMail({
        from: 'no-reply-HR-Query@yses.org',
        to: process.env.EMAIL,
        subject: "Hey guy",
        // adding flair to the message, There's also a text option, I'm open to suggestions
        //TODO IMPROVE UPON THE DESIGN 
        html: `<div style = "width: 100%; background-color: #f3f9ff; padding: 5rem 0">
	<div style = " maxwidth: 700px; background-color:#1a1a1a; margin: auto 20px auto 20px">
		<div style="width: 100%; background-color: #2b9dd6 ; padding: 20px 0">
		</div>

		<div style = "width: 100%; gap: 10px; padding: 70px 0; display: grid">
			<div style = "font-size: 15px; margin: 0 30px; color: #4c4c4c; text-align: center; font-family: Arial">
				<p>Insert text here</p>
			</div>
		</div>
</div>
</div>`,
        });
}

export default sendMail
