import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.stackexchange.com/2.3/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

instance.interceptors.response.use(
  (response) => response,
  ((error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.log('你要找的頁面不存在');
          break;
        case 500:
          console.log('程式發生問題');
          break;
        default:
          console.log(error.message);
      }
    }
    if (!window.navigator.onLine) {
      alert('網路出了點問題，請重新連線後重整網頁');
    }
  }),
);

export default function (method, url, data = null, config) {
  const a = method.toLowerCase();
  switch (a) {
    case 'post':
      return instance.post(url, data, config);
    case 'get':
      return instance.get(url, { params: data });
    case 'delete':
      return instance.delete(url, { params: data });
    case 'put':
      return instance.put(url, data);
    case 'patch':
      return instance.patch(url, data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
}
