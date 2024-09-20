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
export default fetchQueryData;
