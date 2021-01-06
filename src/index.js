const express = require('express');

require('./database/mongoose');

const path = require('path');
const hbs = require('hbs');
const request = require('postman-request');

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
//registered a helper function to format the object sent to the template differently, usually it formats the object to toString which produces us [object Object] , but by 
//but by using helper function we are formating it by converting to object(doubt converting to string or object) using stringify
hbs.registerHelper('json', function(context){
    return JSON.stringify(context);
})

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
    const listOfItemsUrl = 'http://localhost:3000/listOfMenu';
    request({url:listOfItemsUrl,json:true},(error,response)=>{
        if(error){
            console.log("error dont know why")
        }else
        //    console.log("menuArray",response.body);
       res.render('index',{menuArray:response.body});
        }); 
});



app.listen(port,()=>{
    console.log("listening to the port ",port);
});