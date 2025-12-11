const express = require("express");
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT;

// Middleware

app.use(express.json());
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
   

})

app.post('/', (req, res) => {
    

    const transporter = nodemailer.createTransport({
        service:"gmail",
		auth: {
			user: 'fishmick.callahan@gmail.com',	// My email address
			pass: 'lurxnbzihsjkhmmt'
	}


})
    const mailOptions = {
        from: req.body.email,
        to: 'fishmick.callahan@gmail.com',
        subject: `Message from ${req.body.name}: ${req.body.subject}}`,
        text: req.body.message
    }

   transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		console.log(error);
        res.send('error');
	} else {
		console.log("Email Sent: " + info.response);
        res.send('success');
		}
		
	})})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
