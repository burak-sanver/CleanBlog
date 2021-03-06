const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');

const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageController');
const app = express();

mongoose
  .connect(
    'mongodb+srv://burak:Xbs1GiTwCd3GIRqy@cluster0.q3h8ef2.mongodb.net/cleanblog-db?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

// TEMPLATE ENGINE

app.set('view engine', 'ejs');

// MIDDLEWARES

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/post', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
