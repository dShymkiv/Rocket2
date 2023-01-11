const { ASC, DESC } = require('../../configs/enums/sortOrder.enum');

const buildFilterQuery = (query = {}) => {
  const filterQuery = {};
  const ageFilter = {};
  const dateFilter = {};

  if (query.ageGte) {
    ageFilter.$gte = Number(query.ageGte);
  }

  if (query.ageLte) {
    ageFilter.$lte = Number(query.ageLte);
  }

  if (query.dateGte) {
    dateFilter.$gte = query.dateGte;
  }

  if (query.dateLte) {
    dateFilter.$lte = query.dateLte;
  }

  if (query.searchNameOrEmail) {
    filterQuery.$or = [
      { firstName: { $regex: query.searchNameOrEmail, $options: 'i' } },
      { lastName: { $regex: query.searchNameOrEmail, $options: 'i' } },
      { email: { $regex: query.searchNameOrEmail, $options: 'i' } },
      // i = ignore register   /`${query.searchNameOrEmail}`/i - will not work
    ];
  }

  if (Object.keys(ageFilter).length) {
    filterQuery.age = ageFilter;
  }

  if (Object.keys(dateFilter).length) {
    filterQuery.createdAt = dateFilter;
  }

  return filterQuery;
};

const buildSortQuery = (sortBy, order) => {
  const sortingOrder = order === 'ASC' ? ASC : DESC;

  if(sortBy === 'createdDate') {
    return { '_id': sortingOrder };
  }

  return { [sortBy]: sortingOrder };
};

module.exports = {
  buildFilterQuery,
  buildSortQuery
};

