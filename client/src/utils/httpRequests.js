import axios from 'axios';
import { readCookie } from './cookies';

const getHttp = (url, tokenName) => {
  return axios.get(url, {
    headers: {
      authorization: 'Bearer ' + readCookie(tokenName),
    },
  });
};
const postHttp = (url, data) => {
  return axios.post(url, data, {
    headers: {
      authorization: 'Bearer ' + readCookie('accessToken'),
    },
  });
};
const putHttp = (url, data) => {
  return axios.put(url, data, {
    headers: {
      authorization: 'Bearer ' + readCookie('accessToken'),
    },
  });
};
const deleteHttp = (url, data) => {
  return axios.delete(url, {
    headers: {
      Authorization: 'Bearer ' + readCookie('accessToken'),
    },
    data: data,
  });
};

export { getHttp, postHttp, putHttp, deleteHttp };
