var mongoose = require('mongoose')


var articlesSchema = mongoose.Schema({

        author: String,
        title: String,
        description: String,
        url: String,
        urlToImage: String,
        publishedAt: String,
        content: String   

})


var usersSchema = mongoose.Schema({
    
        name : String,
        email: String,
        password: String,
        token: String,
        language: String,
        wishes: [articlesSchema]
    
});

var usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel;