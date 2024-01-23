const Article = require("../models/Article");
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');

const getAllArticles = asyncErrorWrapper(async (req,res,next) => {
    const articles = await Article.find();
    return res.status(200).json({
        success: true,
        data: articles
    })
})

const getSingleArticle = asyncErrorWrapper(async (req,res,next) => {
    const article = req.dataArticle;
    return res.status(200).json({
        success: true,
        data: article
    })
})

const newArticle = asyncErrorWrapper(async (req,res,next) => {
    const information = req.body;
    const article = await Article.create({
        ...information,
        author: req.user.id
    });

    return res.status(201).json({
        success: true,
        message: "Başarıyla oluşturuldu",
        data: article
    })
});

const editArticle = asyncErrorWrapper(async (req,res,next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const article = await Article.findByIdAndUpdate(id, {
        title, 
        content
    }, { new: true, runValidators: true })
    return res.status(200).json({
        success: true,
        message: "Yazı başarıyla güncellendi",
        data: article
    })
})


module.exports = {
    getAllArticles,
    newArticle,
    getSingleArticle,
    editArticle
}