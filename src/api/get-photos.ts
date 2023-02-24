import axios, { AxiosResponse } from 'axios';

export interface GetPhotosData {
    page?: number;
    pageSize?: number;
    search?: string
}

export interface GetPhotosRes {
    albumId: number;
    id: number;
    thumbnailUrl: string;
    title: string;
    url: string;
}

export const getPhotos = (data: GetPhotosData): Promise<AxiosResponse<GetPhotosRes[]>> => {
  const { page = 0, pageSize = 5, search = '' } = data;
  return axios.get<GetPhotosRes[]>(`https://jsonplaceholder.typicode.com/photos?_start=${page}&_limit=${pageSize}&title_like=${search}`);
};
