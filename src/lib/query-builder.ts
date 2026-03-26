export type QueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  [key: string]: any;
};

export const buildQueryString = (params: QueryParams) => {
  const query = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });
  
  return query.toString();
};

export const parseQueryParams = (searchParams: { [key: string]: string | string[] | undefined }): QueryParams => {
  const params: QueryParams = {};
  
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      if (key === "page" || key === "limit") {
        params[key] = parseInt(value, 10);
      } else {
        params[key] = value;
      }
    }
  });
  
  return params;
};
