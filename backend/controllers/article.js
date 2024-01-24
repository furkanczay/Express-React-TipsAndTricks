const Article = require("../models/Article");
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');

const getAllArticles = asyncErrorWrapper(async (req,res,next) => {
    console.log(req.query.search);
    let query = Article.find()
    const populate = true;
    const populateObj = {
        path: "author",
        select: "username email profileImage firstName lastName"
    }
    // Search
    if(req.query.search){
        const searchObj = {};
        // Başlığa göre sorgula - searhValue
        const regex = new RegExp(req.query.search, "i");
        searchObj["title"] = regex;
        query = query.where(searchObj);
    }

    // Populate
    if(populate){
        query = query.populate(populateObj).populate({
            path: "comments",
            select: "_id -article"
        })
    }

    // Sayfalama
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = ((page - 1) * limit);
    const endIndex = page * limit;

    const pagination = {};
    const total = await Article.countDocuments();

    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit: limit,
        }
    }
    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }
    query = query.skip(startIndex).limit(limit);
    // Mongoose - skip metodu skip(0) -- skip(2)
    // Mongoose - limit(2)

    const articles = await query;
    //const articles = await Article.find().where({ title: "Articles 3 - Title" });
    return res.status(200).json({
        success: true,
        count: articles.length,
        pagination: pagination,
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