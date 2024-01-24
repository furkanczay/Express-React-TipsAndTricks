const searchHelper = (searchKey, query, req) => {
      if(req.query.search){
            const searchObj = {};
            const regex = new RegExp(req.query.search, "i");
            searchObj[searchKey] = regex;
            return query = query.where(searchObj);
      }
      return query;
};

const populateHelper = (query, population) => {
      return query.populate(population);
};

const articleSortHelper = (query, req) => {
      const sortKey = req.query.sort;
      if(sortKey === "most-comments"){
            return query = query.sort("-commentsCount")
      }
      if(sortKey === "most-liked"){
            return query = query.sort("-likesCount")
      }
      return query.sort("-createdAt");
}

const paginationHelper = async (model,query,req) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const startIndex = ((page - 1) * limit);
      const endIndex = page * limit;

      const pagination = {};
      const total = await model.countDocuments();

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
      return {
            query: query.skip(startIndex).limit(limit),
            pagination: pagination
      }
}

module.exports = {
      searchHelper,
      populateHelper,
      articleSortHelper,
      paginationHelper
}