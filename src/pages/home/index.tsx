import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  Flex, Grid, GridItem, Image, Spinner, Text,
} from '@chakra-ui/react';
import { API_QUERY_KEY } from '../../api/key/query';
import { getPhotos, GetPhotosData, GetPhotosRes } from '../../api/get-photos';

const configPhotos: GetPhotosData = {
  pageSize: 20,
};

function Home() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: () => getPhotos(configPhotos),
    queryKey: API_QUERY_KEY.GET_PHOTOS({}),
    enabled: !queryClient.getQueryData(API_QUERY_KEY.GET_PHOTOS(configPhotos)),
  });

  const photosMemo: GetPhotosRes[] = React.useMemo(() => data?.data ?? [], [data]);

  if (isLoading) return <Flex justifyContent="center"><Spinner /></Flex>;

  if (photosMemo.length === 0) return <Text className="text-primary-gray" textAlign="center">Data Empty</Text>;

  return (
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
          />
        </GridItem>
      ))}
    </Grid>
  );
}

export default Home;
