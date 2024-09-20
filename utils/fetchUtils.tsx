import {REACT_APP_BACKEND_URL} from '@env';
import axios from 'axios';
const fetchQueryData = async (
  query: string,
  page: string,
  restaurantId?: string,
) => {
  try {
    let apiUrl = `${REACT_APP_BACKEND_URL}`;
    const params: any = {};
    if (page === 'restaurant') {
      apiUrl += '/api/restaurant';
      if (query) {
        params.query = query;
      }
    } else if (page === 'menu' && restaurantId) {
      apiUrl += `/api/menu/${restaurantId}`;
      if (query) {
        params.query = query;
      }
    }
    const response = await axios.get(apiUrl, {params});
    return response.data;
  } catch (err: any) {
    console.log(err.message);
  }
};
const debounce = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  timer: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  // Return a function that returns a promise, so we can await it.
  return function (...args: Parameters<T>): Promise<any> {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args); // Call the original function
          resolve(result); // Resolve the result so it can be awaited
        } catch (error) {
          reject(error); // Properly reject the promise if there's an error
        }
      }, timer);
    });
  };
};




const debouncedFetchQueryData = debounce(fetchQueryData, 300);
export {fetchQueryData,debouncedFetchQueryData};
