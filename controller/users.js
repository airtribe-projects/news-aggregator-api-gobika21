const express = require('express');
const User = require('../models/users');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    const body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    const dbUser = await User.create(body);
    res.send({newUser: dbUser, message:'User created successfully'});
};

const login = async (req,res) => {
    const {email,password} = req.body;
    const dbUser = await User.findOne({email});
    if(!dbUser){
        return res.status(404).send({message:'Email not found'});
    }
    const isSamePassword = await bcrypt.compareSync(password,dbUser.password);
    if(!isSamePassword){
        return res.status(404).send({message:'Password incorrect'});
    }
    const token = jwt.sign({ name: dbUser.name, email: dbUser.email, role: dbUser.role },process.env.JWT_SECRET,{expiresIn:'1h'});
    res.send({message:'Login successful', token});
};


module.exports = {register, login};