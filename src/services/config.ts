import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';

/**
 * Set request headers globally on axios
 * @param name string
 * @param value string
 */
export function setHeader(name: string, value: string): void {
  if (name) {
    axios.defaults.headers.common[name] = value;
  }
}

/**
 * Remove request header globally from axios
 * @param name string
 */
export function removeHeader(name: string): void {
  if (name) {
    delete axios.defaults.headers.common[name];
  }
}

/**
 * initialize axios request interceptor
 */
export function setupRequestInterceptors(): void {
  // allow every status to be valid
  axios.defaults.validateStatus = (status) => status < 400;

  axios.defaults.withCredentials = true;

  if (process.env.APP_ENV === 'production') {
    axios.defaults.baseURL = process.env.BE_SERVER_ADDRESS;
    // axios.defaults.headers.common['Origin'] = process.env.BE_SERVER_ADDRESS;
  }

  // interceptor for request headers
  axios.interceptors.request.use(
    (request) => {
      if (request.headers) {
        // x-request-id is used to track the request
        // request.headers['Content-Type'] = 'application/json';
        request.headers['x-request-id'] = uuidV4();
        request.headers['x-caller'] = 'Frontend';
      }
      return request;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle errors globally
      if (error?.response?.status === 401) {
        // Handle unauthorized errors
        console.log('Unauthorized, redirecting to login...');
      }
      return Promise.reject(error);
    },
  );
}
