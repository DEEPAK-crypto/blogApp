var express = require('express');
methodOverride = require('method-override');
app = express();
bodyParser = require("body-parser");
mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blog_app", { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    create: {
        type: Date,
        default: Date.now
    }
});

var Blog = mongoose.model("Blog", blogSchema);

app.get('/', function(req, res) {
    res.redirect("/blogs");
})

app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {

        if (err)
            console.log(err);
        else
            res.render("index", { blogs: blogs });
    })
});

app.get("/blogs/new", function(req, res) {
    res.render('new');
});

app.post('/blogs', function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err)
            console.log(err);
        else
            res.redirect("/blogs");
    })
})

app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err)
            res.redirect("/blogs");
        else
            res.render('show', { blog: blog });
    });
});

app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err)
            res.redirect('/blogs');
        else
            res.render("edit", { blog: blog });
    });

});

app.put('/blogs/:id', function(req, res) {
    res.send('it worked!');
});


app.listen(3000);