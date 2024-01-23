const Article = require("./models/Article");
const Comment = require("./models/Comment");
const User = require("./models/User");
const fs = require("fs");
const connectDatabase = require("./helpers/database/connectDatabase");
const dotenv = require("dotenv");
const dummyPath = "./dummy/";
const prompt = require('prompt-sync')();

const dummyUsers = JSON.parse(fs.readFileSync(dummyPath + "users.json" ));
const dummyArticles = JSON.parse(fs.readFileSync(dummyPath + "articles.json" ));
const dummyComments = JSON.parse(fs.readFileSync(dummyPath + "comments.json" ));

dotenv.config({
      path : "./config/env/config.env"
});

connectDatabase();

const importAllDummyData = async function(){
      try {
          await User.create(dummyUsers);
          await Article.create(dummyArticles);
          await Comment.create(dummyComments);
          console.log("Dummy datalar başarıyla import edildi");
      }   
      catch(err) {
          console.log("Dummy datalar import edilirken bir hata oluştu");
          if(err.code === 11000){
            return console.log('Dummy datalar zaten import edilmiş!');
          }
          console.log(err);   
      }
      finally {
          process.exit();
      }
  };
  
  const deleteAllDummyData = async function(){
      await connectDatabase();
      try {
          await User.deleteMany({
            _id: {
                $in: dummyUsers.map(user => user._id)
            }
          });
          await Article.deleteMany({
            _id: {
                $in: dummyArticles.map(article => article._id)
            }
          });
          await Comment.deleteMany({
            article: {
                $in: dummyArticles.map(article => article._id)
            }
          });
          console.log("Dummy datalar başarıyla silindi");
  
  
      }   
      catch(err) {
          console.log(err);
          console.err("Dummy datalar silinirken bir hata oluştu");
      }
      finally {
          process.exit();
      }
};

const createSuperUser = async function(){
      const firstName = prompt('İsim? > ');
      const lastName = prompt('Soyisim? > ');
      const username = prompt('Kullanıcı Adı? > ');
      const email = prompt('E-posta Adresi? > ');
      const password = prompt.hide('Şifre? > ');
      try{
            const admin = await User.create({
                  firstName,
                  lastName,
                  username,
                  email,
                  password,
                  role: "admin"
            });
            console.log("Admin başarıyla oluşturuldu");
      }catch(err){
            if(err.code === 11000){
                  console.log("Böyle bir kayıt zaten mevcut!");
            }else{
                  console.log(err);
            }
      }
      process.exit();
}

if (process.argv[2] == "--dummy" && process.argv[3] == "--generate"){
        importAllDummyData();
}
else if (process.argv[2] == "--dummy" && process.argv[3] == "--delete"){
        deleteAllDummyData();
}
else if(process.argv[2] == "create-super-user"){
      createSuperUser();
}
else{
      console.log("Geçersiz işlem lütfen şunlardan birini kullanın:\n'--import-all'\n'--delete-all'");
      process.exit();
}