

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeStartingContent = "Journaling is the pattern of recording personal reflections, insights, and queries on certain specific assigned topics or personal thoughts/experiences/muses.  The journal entries are also a type of reflective writing. As journaling provides the freedom and liberty to examine various ideas and different forms of writing strategies, it can also be termed a type of exploratory writing as well.Apart from the many benefits of journaling, it is also a great way of organizing ideas and thoughts by maintaining a daily journal. Nonetheless, it is not very easy to figure out good topics/content for journaling.";
const aboutContent = "Journaling involves writing down your thoughts and feelings as you navigate everyday life. Journaling can help you understand and work through your emotions, especially when you’re feeling anxious or sad. It can also help you grow, become more self-aware, and gain meaningful insights.The beauty of journaling is that there’s no right or wrong way to do it. It’s a deeply personal experience that can take many forms.One day, journaling could look like a diary entry, similar to the ones you may have written when you were a teenager. The next day it can be a list of things that bring you joy or a list of goals you want to achieve."
const contactContent = "<h1>MAIL</h1>";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

var view = [];


app.get("/", function (req, res) {
  res.render("home", {
    home: homeStartingContent,
    postobject: view,



  })


})
app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent })
})

app.get("/about", function (req, res) {
  res.render("about", { about: aboutContent })
})

app.get("/compose", function (req, res) {
  res.render("compose")
})

app.post("/compose", function (req, res) {

  const post1 = {
    Title: req.body.postTitle,

    Compose: req.body.composeTitle
  }

  view.push(post1)

  res.redirect("/")


})

app.get("/posts/:test", function (req, res) {

  const urlroute = _.lowerCase(req.params.test)

  view.forEach(function (post1) {
    const Title = _.lowerCase(post1.Title)
    const compose = _.lowerCase(post1.Compose)


    if (urlroute === Title) {
      console.log("MATCH FOUND")
      res.render("post", {
        postview: Title,
        postview2: compose
      })
    }

  })




})



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
