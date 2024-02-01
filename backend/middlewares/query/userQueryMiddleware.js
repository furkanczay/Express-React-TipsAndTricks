const asyncErrorWrapper = require("express-async-handler");
const { searchHelper, paginationHelper } = require("./queryMiddlewareHelpers");

const userQueryMiddleware = function(model, options){
      return asyncErrorWrapper(async function(req,res,next){
            let query = model.find();

            // Search by username
            query = searchHelper("username", query, req);

            const paginationRes = await paginationHelper(model, query, req);
            query = paginationRes.query;
            const pagination = paginationRes.pagination;

            const queryResults = await query;

            res.queryResults = {
                  success: true,
                  count: queryResults.length,
                  pagination: pagination,
                  data: queryResults
            };

            next();
      })
};

module.exports = userQueryMiddleware;
