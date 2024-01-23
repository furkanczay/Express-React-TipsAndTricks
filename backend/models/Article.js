const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
      title: {
            type: String,
            required: [true, "Başlık alanı zorunludur"],
            minlength: [10, "Başlık alanı en az 10 karakter olmalıdır"]
      },
      slug: {
            type: String,
            required: [true, "slug alanı zorunludur"],
            unique: true
      },
      content: {
            type: String,
            required: [true, "İçerik alanı zorunludur"],
            minlength: [20, "İçerik alanı en az 20 karakter olmalıdır"]
      },
      createdAt: {
            type: Date,
            default: Date.now()
      },
      author: {
            type: mongoose.Schema.ObjectId,
            required: [true, "Yazar alanı zorunludur"],
            ref: "User"
      }
})

module.exports = mongoose.model("Article", ArticleSchema);