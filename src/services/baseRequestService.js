import axios from 'axios';
import { BASE_API_URL } from '../constants/commons';

class BaseRequestService {
  constructor(baseUrl = BASE_API_URL, customHeader = {}) {
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
    if (baseUrl) {
      axios.defaults.baseURL = baseUrl;
    } else {
      console.warn('Missing base url');
    }
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    instance.defaults.headers.common = {
      'Content-Type': 'application/json',
      ...customHeader
    };
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    if (error.response) {
      return Promise.reject({ ...error.response.data, code: error.response.status });
    } else {
      return Promise.reject(error);
    }
  }

  get(url, config = {}) {
    return this.instance.get(url, config).catch((error) => {
      return this.handleError(error);
    });
  }

  post(url, body, config = {}) {
    return this.instance.post(url, body, config).catch((error) => {
      return this.handleError(error);
    });
  }

  put(url, body, config = {}) {
    return this.instance.put(url, body, config).catch((error) => {
      return this.handleError(error);
    });
  }

  delete(url, config = {}) {
    return this.instance.delete(url, config).catch((error) => {
      return this.handleError(error);
    });
  }
}

export { BaseRequestService };

export default new BaseRequestService();
