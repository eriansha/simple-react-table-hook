export function formatGetParams(state) {
  let getParams = "";
  if (state.filters) getParams = getParams + filterParams(state.filters);
  if (state.pageSize || state.pageIndex) getParams = getParams + paginationParams(state.pageSize, state.pageIndex);
  // if (state.sorted) getParams = getParams + sortParams(state.sorted);
  return getParams;
}

/** returns "per_page=10&page=2" */
export function paginationParams(pageSize, pageIndex) {
  const per_page_param = "per_page=" + pageSize.toString();
  const page_param = "page=" + (pageIndex + 1).toString();
  return page_param + "&" + per_page_param;
}

/** filtered: type array */
export function filterParams(filters) {
  let filter_params = "";

  filters.forEach(filter => {
    const value = filter.value
    const id = filter.id
    filter_params = `${filter_params}&${id}=${value}`
  })

  return filter_params;
}
/**
 * sorted is an array of objects
 *    object structure:
 *    {
 *      id: coloumn_id_of_react_table
 *      desc: true
 *    }
 */
export function sortParams(sorted) {
  let sort_params = "";

  // only add if there a fields to sort by
  if (sorted.length > 0) {
    sort_params = "&order_by=";
    // for every sorted column, add it to the url string
    for (var i = 0; i < sorted.length; i++) {
      const sort = sorted[i];
      const id = sort.id;
      let sort_order = "";
      if (sort.desc) sort_order = "-";
      else sort_order = "";
      sort_params = sort_params + sort_order + id;
      //if we only have 1 column or at the last column in the array to sort, add the comma
      if (sorted.length > 1 && sorted.length - 1 !== i)
        sort_params = sort_params + ",";
    }
  }

  return sort_params;
}
