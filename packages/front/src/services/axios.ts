import axios from 'axios';
import { getUrlApi } from '@/src/utils/getUrl';

export const classicAxios = axios.create({
  baseURL: getUrlApi(),
  headers: {
    'Content-Type': 'application/json',
  },
});
