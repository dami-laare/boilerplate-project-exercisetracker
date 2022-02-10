const { findOneAndReplace } = require('../models/user');
const User = require('../models/user');

// Gets all users from the database ==> /api/users
exports.getAllUsers = async (req, res, next) => {
    const users = await User.find().select('username _id');
    res.status(200).json(users)
}

// Creates a new user ==> /api/users
exports.createUser = async (req, res, next) => {
    const { username } = req.body;

    const user = await User.create({
        username
    })
    
    res.json({
        'username' :user.username,
        "_id": user._id
    })
}

// Logs an exercise to the database of a user ==> api/users/:id/exercises
exports.createExercise = async (req, res, next) => {
    let { description, duration, date } = req.body;

    if(!date) {
        date = Date.now();
    }
    let user = await User.findById(req.params.id);

    if(!user) {
        return res.send("User does not exist!!!");
    }

    const dateFinal = new Date(date);

    const newUserData = {
            description,
            duration: Number(duration),
            date: dateFinal.toDateString()
            };

    user.log.push(newUserData);

    await user.save();

    res.json({
        username: user.username,
        description,
        duration: Number(duration),
        date: dateFinal.toDateString(),
        _id: user._id
    });

    
}

// Get exercise log for a user by ID ==> api/users/:id/logs
exports.getLog = async (req, res, next) => {
    let user = await User.findById(req.params.id);

    if(!user) {
        return res.send("User not found!!!")
    }
    
    // This part handles the response in the event that the queries exist in the request headers
    if(Object.keys(req.query).length > 0) {
        let { from, to, limit } = req.query;  
        // Get dates in ms
        from = Date.parse(from);
        to = Date.parse(to);

        
        let finalUserLogs = user.log;


        // Filter using the query dates
        finalUserLogs = finalUserLogs.filter(userLog => {
            const dateInMs = Date.parse(userLog.date)

            if(!from || !to){
                return dateInMs<= to || dateInMs >= from;
            }
            if(!from && !to){
                return true
            }
            return dateInMs >= from && dateInMs <= to;
        })
        let finalUserLogsFinal = [];

        // Limit the amount of results in the final response
        if(limit){
            for(let i = 0; i < limit; i++){
                finalUserLogsFinal.push(user.log[i])
            }
        }else{
            finalUserLogsFinal= finalUserLogs
        }
        
        return res.json({
                    username: user.username,
                    count: finalUserLogsFinal.length,
                    _id: user._id,
                    log: finalUserLogsFinal
                })    

    }

    res.json({
        username: user.username,
        count: user.log.length,
        _id: user._id,
        log: user.log
    })    
}