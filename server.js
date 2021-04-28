const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();
const moment = require('moment');

mongoose.connect('mongodb://localhost/projects', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

app.use((req, res, next) => {
	res.locals.moment = moment;
	next();
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
	const articles = await Article.find().sort({ viabilidade: 'desc' });
	res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(5000);
