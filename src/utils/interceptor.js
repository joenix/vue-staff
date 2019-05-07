export default (
  Axios,
  configure,
  requestTransform = () => {},
  responseTransform = () => {},
  errorTransform = () => {}
) => {
  // Instance
  const http = Axios.create(configure);

  // Interceptor Request
  http.interceptors.request.use(
    // Handler
    config => {
      // Credential Token
      config.withCredentials = true;

      // Content Type
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";

      // Transform
      requestTransform(
        config.method === "get" ? config.params : config.data,
        config.headers
      );

      // Result
      return config;
    },

    // Error
    error => Promise.reject(errorTransform(error))
  );

  // Interceptor Response
  http.interceptors.response.use(
    // Handler
    response => {
      // Transform
      responseTransform(response.data);
      // Result
      return response;
    },

    // Error
    error => Promise.reject(errorTransform(error))
  );

  // API
  const API = {
    // Get
    get: (uri, params) => http.get(uri, { params }),
    // Post
    post: (uri, params) => http.post(uri, params),
    // Put
    put: (uri, params) => http.put(uri, params),
    // Delete
    delete: (uri, params) => http.delete(uri, params)
  };

  // Export API
  return {
    // Auto Http
    auto(uri, params, method = "get", exp = new RegExp(/\![a-zA-Z]{3,6}$/g)) {
      // Check Method with End
      uri = uri.replace(exp, w =>
        (m => {
          if (m in API) return (method = m), "";
        })(w.substr(1))
      );
      // Use Method in API
      return API[method](uri, params);
    },
    // Merge
    ...API
  };
};
