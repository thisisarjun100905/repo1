//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const post=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.render("home",{para1: homeStartingContent, posts: post});
})
app.get("/about",function(req,res){
  res.render("about",{para2:aboutContent});
})
app.get("/contact",function(req,res){
  res.render("contact",{para3:contactContent})
})
app.get("/compose",function(rreq,res){
  res.render("compose");
})
app.get("/posts/:topic", function(req,res){
  // console.log(req.params.topic);
  const requestTittle = _.lowerCase(req.params.topic);
  post.forEach(element => {
    if (requestTittle===_.lowerCase(element.tittle) ){
      // res.redirect("/");
      var Tittle=element.tittle;
      // var tittle=_.lowerCase(element.tittle)
      var Content=element.para;
      res.render("post",{tittle:Tittle, content:Content});
      console.log("match found");
    }
    else{
      console.log("Match not found");
    }
  });
})
app.post("/compose",function(req,res){
  // console.log(req.body.paraTitle);
  let content ={
    tittle: req.body.paraTitle,
    para: req.body.paraContent};
  
  // console.log(content.tittle);
  // console.log(content.para)
  post.push(content);
  // console.log(post.para);
  res.redirect("/");
}
)



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
