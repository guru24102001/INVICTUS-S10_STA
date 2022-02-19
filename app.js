const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const app = express();



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }

});

const Post = mongoose.model("Post", postSchema);



app.get('/', function(req, res) {
  res.render("index", {})
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(3000, function() {
  console.log(`Server started at port ${port} successfully.`);
});
