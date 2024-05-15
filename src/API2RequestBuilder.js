import axios from 'axios'; // Ensure axios is installed and imported
import API2QueryEncoder from './API2QueryEncoder'; // Adjust the path as necessary
import API2Request from './API2Request'; // Adjust the path as necessary

export default class API2RequestBuilder {
  constructor(baseURL = '') {
    this.request;
    this.baseURL = baseURL;
    this.headers = {};
    this.params = {};
    this.encoder = new API2QueryEncoder();
    this.path = '';
    this.request = null;
  }

  reset() {
    this.baseURL = '';
    this.headers = {};
    this.params = {};
    this.encoder.reset();
    this.path = '';
    this.request = null;
  }
  
  setBaseURL(url) {
    this.baseURL = url;
    return this; // Support method chaining
  }

  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  setParams(params) {
    this.params = { ...this.params, ...params };
    return this;
  }

  buildRequest() {
    this.request = new API2Request(this.baseURL, this.headers, this.params);
    return this.request;
  }
  async makeRequest(method, path, body = null) {
    if (!this.request) {
      throw new Error('Request not initialized');
    }

    const url = this.request.baseURL + path;
    const config = {
      headers: this.request.headers,
      params: this.request.params,
    };

    let response;
    try {
      if (method === 'get') {
        response = await axios.get(url, config);
      } else if (method === 'post') {
        response = await axios.post(url, body, config);
      } else {
        throw new Error(`Unsupported method: ${method}`);
      }
    } catch (error) {
      // Handle errors here 
      console.error(error);
      return null;
    }

    return this.decodeResponse(response);
  }

  async get(path) {
    return this.makeRequest('get', path);
  }

  async post(path, body) {
    return this.makeRequest('post', path, body);
  }

  // Implement put, delete, etc., similarly

  decodeResponse(response) {
    // Implement response decoding here
    // return only the data and the status code
    return response.data;
  }
}
