var mongoose = require('mongoose')
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology:true
}

mongoose.connect('mongodb+srv://admin:admin@cluster0.6cs2a.mongodb.net/morningnews?retryWrites=true&w=majority',
  options,
  function(err) {
    console.log(err);
  }
  );
