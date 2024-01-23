const express = require('express');
const router = express.Router({mergeParams:true});
const Comment = require('../models/Comment');

router.get('/', (req, res, next) => {
      console.log(req.params);
      return res.status(200)
            .json({
                  success: true,
                  message: 'Comment route'
            });
});

module.exports = router;