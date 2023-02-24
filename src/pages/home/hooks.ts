import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getPhotos, GetPhotosRes } from '../../api/get-photos';
import { API_QUERY_KEY } from '../../api/key/query';

export const useHome = () => {
  // setting for carousel make sure only render once
  const settingsCarousel = React.useMemo(() => ({
    centerMode: true,
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
        },
      }],
  }), []);

  // handle scroll to show or hide header and footer
  const [position, setPosition] = React.useState(window.pageYOffset);
  const [visibleHeader, setVisibleHeader] = React.useState(true);
  React.useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;

      setVisibleHeader(position > moving);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return (() => {
      window.removeEventListener('scroll', handleScroll);
    });
  });

  // showing search bar when sort menu clicked
  const [show, setShow] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');

  // fetch on init
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: () => {
      // checking already fetch or not
      const cacheData :GetPhotosRes[] | undefined = queryClient.getQueryData(API_QUERY_KEY.GET_PHOTOS({ pageSize: 20, search: searchValue }));
      if (cacheData) return cacheData;
      return getPhotos({ pageSize: 20, search: searchValue });
    },
    queryKey: API_QUERY_KEY.GET_PHOTOS({ pageSize: 20, search: searchValue }),
  });

  // only change value when data from API is updated
  const photosMemo: GetPhotosRes[] = React.useMemo(() => data ?? [], [data]);

  return {
    settingsCarousel,
    isLoading,
    photosMemo,
    show: {
      value: show,
      setValue: setShow,
    },
    searchValue: {
      value: searchValue,
      setValue: setSearchValue,
    },
    visibleHeader,
  };
};
