const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

//root
//route

//gunakan  ejs 
app.set('view engine', 'ejs');


//Third party Middlware
app.use(expressLayouts);
app.use(morgan('dev'));

//built-in middleware
app.use(express.static('public'));

//Application level middleware
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

app.get('/',(req,res) => {
    //res.sendFile('./index.html', {root: __dirname});

 const mahasiswa = [
        {
            nama: 'Sandhika Galih',
            email: 'sandhikagalih@gmail.com',
        },
        {
            nama: 'Erik',
            email: 'erik@gmail.com',
        },
        {
            nama: 'Dody',
            email: 'dody@gmail.com',
            title: 'Halaman Home',
          
        }
    ];


    res.render('index', {
        nama: 'Sandhika Galih', 
        title: 'Halaman Home', 
        mahasiswa,
        layout: 'layout/main-layout'
});
 
});
app.get('/about',(req,res, next ) => {
    res.render('about', {
        layout : 'layout/main-layout',
        title : 'Halaman About'
    });
    next();
});
app.get('/contact',(req,res) => {
    res.render('contact', {
        layout : 'layout/main-layout',
        title : 'Halaman Contact'
    });
});

app.get('/product/:id', (req,res)=>{
    res.send(`Product ID : ${req.params.id} <br> Category ID: ${req.params.idCat}`);
    
})

app.use('/',(req,res)=>{
    res.status(404);
    res.send('<h1>404</h1>');
})
app.listen(port,() =>{
    console.log(`Example app listening at htp://localhost:${port}`);
});