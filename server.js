require('dotenv').config();

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const email = process.env.email;
const superSecretPwd = process.env.superSecretPwd;
const tokenFb = process.env.tokenAccesoFB

//API FB CODE
// const bizSdk = require('facebook-nodejs-business-sdk');

// const accessToken = 'EAADBHK9HAXYBAB7tJ0BBGHiZCybGKZBlfQoHIghuhZBmUeDcrdWEzzuHJOLorqs5mVuejKxAsbZCpOgAtDw3RINEHsYN2aVeyZBFSTsucAWvq0WUBqJL4YwJsKTR8RE37PCawE8ceLSytyMhzaiYNnK5gnqAKjZAN8VjhSqyLY5okIR8ZBUZBFOy';
// const accountId = '1047063985845101';

// const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
// const AdAccount = bizSdk.AdAccount;
// const Campaign = bizSdk.Campaign;

// const account = new AdAccount(accountId);
// var campaigns;

// account.read([AdAccount.Fields.name])
//     .then((account) => {
//         return account.getCampaigns([Campaign.Fields.name], { limit: 10 }) // fields array and params
//     })
//     .then((result) => {
//         campaigns = result
//         campaigns.forEach((campaign) => console.log(campaign.name))
//     }).catch(console.error);


// Create an instance of the express app.
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Redirect to  https://www.akkaconsulting.com.mx
// const targetBaseUrl = 'https://www.akkaconsulting.com.mx/inicio';



// Routes
app.get('/', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('inicio')

});
// app.get('/:params?', function (req, res) {
//     var params = req.params.params;
//     res.render(params);
// })
app.get('/inicio', function (req, res) {
    res.render('inicio')
});
app.get('/privacidad', function (req, res) {
    res.render('privacidad');
});
app.get('/gracias', function (req, res) {
    res.render('gracias')
});


// Nodemailer route

app.post("/ajax/email", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    var htmlBody = `<h2>Correo de contacto</h2><p>Nombre: ${request.body.name} </p><p> Correo electr??nico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>N??mero de contacto:${request.body.number} </p><p>D??a de llegada: ${request.body.date}</p><p>N??mero de d??as: ${request.body.secondate}</p>`;
    var mail = {
        from: '"Team: Xyncs Web Studio',
        to: 'kaak_naab@hotmail.com',
        subject: '??Alguien ha dejado sus datos en kaabnaab.com!',
        html: htmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    });
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});