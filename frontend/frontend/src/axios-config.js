import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'

axios.interceptors.request.use(function (config) {
  if(localStorage.getItem('token')) {
    config.headers.Authorization =  'Bearer ' + localStorage.getItem('token');
  }
  return config;
});

export default axios;
