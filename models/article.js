const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const moment = require('moment');

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	fullname: {
		type: String,
		required: true,
	},
	viabilidade: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	startdate: {
		type: String,
		default: moment(new Date()).locale('pt-br').format('DD/MM/YYYY'),
	},
	enddate: {
		type: String,
		default: moment(new Date()).locale('pt-br').format('DD/MM/YYYY'),
	},
	price: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: String,
		default: moment(new Date()).locale('pt-br').format('DD/MM/YYYY'),
	},
	situation: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
});

articleSchema.pre('validate', function (next) {
	if (this.title) {
		this.slug = slugify(this.title, { lower: true, strict: true });
	}

	next();
});

module.exports = mongoose.model('Article', articleSchema);
