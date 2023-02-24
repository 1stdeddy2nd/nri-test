import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  Box,
  Flex, Grid, GridItem, Image, Spinner, Text,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import { API_QUERY_KEY } from '../../api/key/query';
import { getPhotos, GetPhotosData, GetPhotosRes } from '../../api/get-photos';
import image1 from '../../assets/img/food-1.png';

const configPhotos: GetPhotosData = {
  pageSize: 20,
};

function Home() {
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
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
        },
      }],
  }), []);

  const queryClient = useQueryClient();

  // fetch on init
  const { data, isLoading } = useQuery({
    queryFn: () => getPhotos(configPhotos),
    queryKey: API_QUERY_KEY.GET_PHOTOS({}),
    // if data already exists with our key, it wont refetch
    enabled: !queryClient.getQueryData(API_QUERY_KEY.GET_PHOTOS(configPhotos)),
  });

  // only change value when data from API is updated
  const photosMemo: GetPhotosRes[] = React.useMemo(() => data?.data ?? [], [data]);

  // show loading while waiting api fetch
  if (isLoading) return <Flex justifyContent="center"><Spinner /></Flex>;

  // telling use if data is empty
  if (photosMemo.length === 0) return <Text className="text-primary-gray" textAlign="center">Data Empty</Text>;

  // looping response from API with map
  return (
    <div>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={2}
        w="100%"
      >
        {photosMemo.map((item, i) => (
          <GridItem
            colSpan={1}
            rowSpan={{
              base: 1,
              md: i % 4 === 0 || (i + 2) % 4 === 0 ? 2 : 0,
              lg: i % 2 === 0 ? 2 : 1,
            }}
            key={item.id}
          >
            <Image
              src={item.url}
              w="100%"
              h={{
                md: i % 4 === 0 || (i + 2) % 4 === 0 ? 600 : 300,
                lg: i % 2 === 0 ? 600 : 295,
              }}
              borderRadius="5px"
              title={item.title}
            />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
