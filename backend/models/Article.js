const mongoose = require("mongoose");
const slugify = require("../helpers/slugify");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
      title: {
            type: String,
            required: [true, "Başlık alanı zorunludur"],
            minlength: [10, "Başlık alanı en az 10 karakter olmalıdır"]
      },
      slug: {
            type: String,
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
      },
      likes: [
            {
                  type: mongoose.Schema.ObjectId,
                  ref: "User"
            }
      ],
      likesCount:{
            type: Number,
            default: 0
      }
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true } });

ArticleSchema.virtual("commentsCount", {
      ref: "Comment",
      count: true,
      justOne: false,
      localField: "_id",
      foreignField: "article"
});

ArticleSchema.virtual("comments", {
      ref: "Comment",
      justOne: false,
      localField: "_id",
      foreignField: "article"
});

ArticleSchema.pre("find", function(next){
      this.populate("commentsCount");
      next();
});
ArticleSchema.pre("findOne", function(next){
      this.populate("commentsCount");
      next();
});

ArticleSchema.pre("save", function(next){
      if(!this.isModified("title")){
            next();
      }
      this.slug = this.slug ? this.slug : this.makeSlug();
      next();
});

ArticleSchema.methods.makeSlug = function(){
      const slug = slugify(this.title);
      return slug;
}

module.exports = mongoose.model("Article", ArticleSchema);