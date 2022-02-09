const User = require('../models/user');

// Gets all users from the database ==> /api/users
exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users)
}

// Creates a new user ==> /api/users
exports.createUser = async (req, res, next) => {
    const { username } = req.body;

    const user = await User.create({
        username
    })
    
    res.json({
        success: true,
        user
    })
}