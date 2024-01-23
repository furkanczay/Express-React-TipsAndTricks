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

const deleteArticle = asyncErrorWrapper(async (req,res,next) => {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Yazı başarıyla silindi"
    })
});

const likeArticle = asyncErrorWrapper(async (req,res,next) => {
    const { id } = req.params;
    const article = await Article.findById(id);

    // Kullanıcı beğenmişsse
    if(article.likes.includes(req.user.id)){
        return next(new CustomError("Bu yazıyı zaten beğendiniz", 400))
    }
    article.likes.push(req.user.id);
    await article.save();
    return res.status(200).json({
        success: true,
        message: "Beğenme işlemi başarıyla gerçekleşti",
        data: article
    })
});

const undoLikeArticle = asyncErrorWrapper(async (req,res,next) => {
    const { id } = req.params;
    const article = await Article.findById(id);

    // Kullanıcı beğenmişsse
    if(!article.likes.includes(req.user.id)){
        return next(new CustomError("Bu yazıyı beğenmediniz", 400))
    }
    const index = article.likes.indexOf(req.user.id)
    article.likes.splice(req.user.id, 1);
    await article.save();
    return res.status(200).json({
        success: true,
        message: "Beğeni başarıyla geri çekildi",
        data: article
    })
});


module.exports = {
    getAllArticles,
    newArticle,
    getSingleArticle,
    editArticle,
    deleteArticle,
    likeArticle,
    undoLikeArticle
}