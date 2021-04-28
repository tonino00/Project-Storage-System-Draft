const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveAndRedirect('edit'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveAndRedirectEdit('new'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.startdate = req.body.startdate,
        article.enddate = req.body.enddate,
        article.fullname = req.body.fullname,
        article.title = req.body.title,
        article.viabilidade = req.body.viabilidade,
        article.description = req.body.description,
        article.price = req.body.price,
        article.situation = req.body.situation
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            res.render(`articles/${path}`, { article: article })
        }
    }
}

function saveAndRedirectEdit(path) {
    return async (req, res) => {
        let article = req.article
        article.viabilidade = req.body.viabilidade,
        article.description = req.body.description,
        article.situation = req.body.situation
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            res.render(`articles/${path}`, { article: article })
        }
    }
}

module.exports = router