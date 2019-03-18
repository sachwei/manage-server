/**
 * Created by sachuangwei on 2017-07-20.
 */
var axios = require('axios');
let host = "s://yg.ismartwork.cn";
let baseURL = "http" + host + "/webapp/restful";
let axiosConfig = {
  baseURL
}
let http = axios.create(axiosConfig);

module.exports = {
  getHttp: http
}