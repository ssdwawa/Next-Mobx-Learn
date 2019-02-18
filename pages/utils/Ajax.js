//封装的ajax请求
import Axios from "axios";
import emitter from "./emitter";

// const local ='http://172.16.63.163:5000'
// const local = "http://172.16.63.105:10000/api/v1"; //leo
const local = "http://172.16.63.129:10000/api/v1"; //panfeng
// const local ='http://172.16.12.81:10000/api/v1' //bl02
// const local = "http://172.16.63.155:10000/api/v1"; //self
// const local ='http://127.0.0.1:5000/api/v1' //self

Axios.interceptors.request.use(function(response) {
  emitter.emit("showLoding", true);
  return response;
});
Axios.interceptors.response.use(
  response => {
    emitter.emit("showLoding", false);
    return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          window.location.href = "/login";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          emitter.emit("showLoding", false);
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      error.message = "连接到服务器失败";
    }

    return Promise.resolve(error.response);
  }
);

const Ajax = {
  get: url => {
    return Axios.get(`${local}/${url}`);
  },
  post: (url, params) => {
    return Axios.post(`${local}/${url}`, params);
  },
  delete: url => {
    return Axios.delete(`${local}/${url}`);
  }
};

export default Ajax;
