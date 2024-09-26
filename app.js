const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res) => {
    res.render("index");
});

app.get('/show',async (req,res) => {
    let users = await userModel.find();
    res.render('show',{users});
});

app.get('/edit/:id',async (req,res) => {
    let user = await userModel.findOne({id:req.params.userid});
    res.render('edit',{user});
});

app.post('/update/:id',async (req,res) => {
    let {name,image,email} = req.body ;
    let user = await userModel.findOneAndUpdate({id:req.params.userid},{name,image,email},{new:true});
    res.redirect('/show');
});

app.get('/delete/:id',async (req,res) => {
    let users = await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/show');
});

app.post('/create',async (req,res) => {
    let {name,email,image} = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image
    })
    res.redirect('/show');

});
app.listen(3000);