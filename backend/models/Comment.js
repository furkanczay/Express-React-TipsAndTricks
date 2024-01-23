const mongoose = require("mongoose");
const Article = require("./Article");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
      content: {
            type: String,
            required: [true, "Yorum alanı zorunludur"],
            minlength: [10, "Yorum alanı en az 10 karakter olmalıdır"]
      },
      createdAt: {
            type: Date,
            default: Date.now()
      },
      likes: [
            {
                  type: mongoose.Schema.ObjectId,
                  ref: "User"
            }
      ],
      author: {
            type: mongoose.Schema.ObjectId,
            required: [true, "Yazar alanı zorunludur"],
            ref: "User"
      },
      article: {
            type: mongoose.Schema.ObjectId,
            required: [true, "Yorumun hangi makaleye ait olduğu bilgisi zorunludur"],
            ref: "Article"
      }
});

CommentSchema.pre("save", async function(next){
      if(!this.isModified("author")){
            return next();
      }
      try{
            const article = await Article.findById(this.article);

            article.comments.push(this._id);

            await article.save();
            next();
      }catch(err){
            return next(err);
      }
})

module.exports = mongoose.model("Comment", CommentSchema);