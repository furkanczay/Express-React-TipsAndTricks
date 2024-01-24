const asyncErrorWrapper = require("express-async-handler");
const { searchHelper, populateHelper, articleSortHelper, paginationHelper } = require("./queryMiddlewareHelpers");
const articleQueryMiddleware = function(model, options){
      return asyncErrorWrapper(async function(req,res,next){
            // Initial Query
            let query = model.find();

            //Search
            query = searchHelper("title", query, req);

            // Populate
            if(options && options.population){
                  query = populateHelper(query, options.population);
            }

            // Sort
            query = articleSortHelper(query, req);

            // Pagination

            const paginationRes = query = await paginationHelper(model,query,req);
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
}

module.exports = articleQueryMiddleware;