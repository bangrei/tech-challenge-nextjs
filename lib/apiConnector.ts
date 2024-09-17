import axios from 'axios';

export const API_CONNECTOR = (options:any) => {
  let params = {
    token: options.token ? options.token : undefined,
  };
  if (options.extraPayload) {
    params = {
      ...params,
      ...options.extraPayload,
    };
  }
  let baseUrl = process.env.NEXT_PUBLIC_ENDPOINT!;
  let api = axios.create({
    baseURL: `${baseUrl}/`,
    params: params,
    headers: options.headers,
  });

  const post = (endpoint:any, data = undefined, config = undefined) => {
    return new Promise((resolve, reject) => {
      api
        .post(endpoint, data, config)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => reject(err));
    });
  };
  const put = (endpoint:any, data = undefined, config = undefined) => {
    return new Promise((resolve, reject) => {
      api
        .put(endpoint, data, config)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => reject(err));
    });
  };

  const get = (endpoint:any, config = undefined) => {
    return new Promise((resolve, reject) => {
      api
        .get(endpoint, config)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => reject(err));
    });
  };

  const remove = async (endpoint:any, config = undefined) => {
    return new Promise((resolve, reject) => {
      api
        .delete(endpoint, config)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => reject(err));
    });
  };
  return {
    get,
    post,
    remove,
    put,
  };
};