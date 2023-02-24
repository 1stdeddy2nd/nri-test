import { GetPhotosData } from '../get-photos';

export const API_QUERY_KEY = {
  GET_PHOTOS: (data: GetPhotosData) => ['GET_PHOTOS', ...Object.values({
    page: data.page ?? 0,
    pageSize: data.pageSize ?? 5,
    search: data.search ?? '',
  })],
};
