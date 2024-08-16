import Axios from 'axios';

function callFetchAxios(endpoint, params, method, reqbody = {}, data) {
  const axiosInstance = Axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const axiosInstanceForMultipartForm = Axios.create({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  switch (method) {
    case 'GET':
      return axiosInstance
        .get(endpoint, {
          params,
        })
        .then(response => response)
        .catch(error => {
          throw error;
        });
    case 'POST':
      return axiosInstance
        .post(endpoint, reqbody)
        .then(response => response)
        .catch(error => error);
    case 'POST_MULTIPART':
      return axiosInstanceForMultipartForm
        .post(endpoint, data)
        .then(response => response)
        .catch(error => error);
    case 'PUT':
      return axiosInstance
        .put(endpoint, reqbody)
        .then(response => response)
        .catch(error => error);
    case 'DELETE':
      return axiosInstance
        .delete(endpoint)
        .then(response => response)
        .catch(response => response);
    default:
      return '';
  }
}

export const callFetchApi = (...params) => callFetchAxios(...params);

export default callFetchApi;
