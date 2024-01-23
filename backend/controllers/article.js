const Article = require("../models/Article");
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');

const getAllArticles = (req, res, next) => {
    res.status(200).json({
        success: true
    })
};

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
})


module.exports = {
    getAllArticles,
    newArticle
}