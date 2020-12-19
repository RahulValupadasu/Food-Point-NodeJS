const express = require('express');

require('./database/mongoose');

const path = require('path');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000

const publicDirectoeryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
//serving static assets
app.use(express.static(publicDirectoeryPath));
//seting up hbs to views engine
app.set("view engine","hbs");
//setting up viewsPath to views,
app.set("views",viewsPath);
//registering partials to hbs 
hbs.registerPartials(partialsPath);

const aboutUsRouter = require('./routers/aboutUs');
app.use(aboutUsRouter);

const paymentRouter = require('./routers/paymentsPage');
app.use(paymentRouter);

const userRouter = require('./routers/user');
app.use(userRouter);

const menuRouter = require('./routers/menu');
app.use(menuRouter);

const orderRouter = require('./routers/order');
app.use(orderRouter);




app.get('', (req,res)=>{
   res.render('index',{});
});



app.listen(port,()=>{
    console.log("listening to the port ",port);
});