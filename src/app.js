const express = require('express'); 
const path = require('path');
const hbs = require('hbs');
const app = express();
const port =3000;

//public static path
const staticPath =path.join(__dirname,'../public');
const template_path =path.join(__dirname,'../templates/views');
const partials_path = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');

app.use(express.static(staticPath));
app.set('views',template_path);
hbs.registerPartials(partials_path);



app.get('/',(req,res)=> {

    // res.send("This is Index.");
    res.render('index');
})

app.get('/about',(req,res)=> {

    res.render('about');
})
app.get('/weather',(req,res)=> {

    res.render('weather');
})

app.get('*',(req,res)=> {

    res.render('404',{
    errorMsg:'oops Page Not Found !'
    
    });
    // res.send("404 PAGE NOT FOUND!");
})




app.listen(port,()=>{
    console.log(`server start on ${port}`);
})