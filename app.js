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

mongoose.connect("mongodb://localhost:27017/InvictusDB", {
  useNewUrlParser: true,
});


// Mongoose Schema

// const reviewSchema = new mongoose.Schema({
//   reviews: {
//     type: String,
//     required: true
//   }
// });
// const Review = mongoose.model("Review", reviewSchema);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  // reviews: [reviewSchema]

  reviews: {
        type: [String], default: []
    }
});

const Post = mongoose.model("Post", postSchema);






app.get('/', function(req, res) {
  res.render("index", {})
});
app.get('/about', function(req, res){
  res.render('forum', {});
});
app.get('/community', function(req, res){
  res.render('', {})
});
app.get('/forum', function(req, res){

  Post.find({}, function(err, result){
    if(!err){
      res.render('forum', {result:result});


    }
  })
});



app.post('/forum', function(req, res){
  console.log(req.body);
  Post.findById(req.body.post_id, function(err, result){
    if(!err){
      // console.log(result);

      result.reviews.push(req.body.review);
      result.save();
    }
    else{
      console.log(err);
    }

  });
  res.redirect("/");
});


app.get('/admin', function(req, res){
  res.render('admin', {});
})
app.post('/admin', function(req, res){
  // console.log(req.body);



  const post1 = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post1.save();
  res.redirect("/");

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(3000, function() {
  console.log(`Server started at port ${port} successfully.`);
});
