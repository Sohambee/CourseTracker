const jwt = require('jsonwebtoken');
const JWT_SECRET = 'as09d0a030-sczkc,kk,220120-';
const mongoose = require('mongoose');
let User = require('../models/user.model');

module.exports = (req,res,next) => {
	const {authorization} = req.headers;
	//authorization === Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
	if (!authorization) {
		res.status(401).json({error:"You must be logged in"});
	}
	const token = authorization.replace("Bearer ","");

	jwt.verify(token, JWT_SECRET, (err,payload) => {
		if (err) {
			return res.status(401).json({error:"You must be logged in"});
		}

		const {_id} = payload;
		User.findById(_id).then(userdata => {
			req.user = userdata;
			next();
		});
	})
}