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

module.exports = mongoose.model("Comment", CommentSchema);