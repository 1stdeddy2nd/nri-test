import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { IoIosMail } from 'react-icons/io';
import { useQuery, useQueryClient } from 'react-query';
import {
  Container, Flex, Grid, GridItem, Image, Spinner, Text,
} from '@chakra-ui/react';
import imgProfile from '../../assets/img/profile.jpg';
import { Icons } from '../../components/icons';
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

  const headerMemo = React.useMemo(() => (
    <Flex alignItems="start" gap={2} marginBottom={4} justifyContent="space-between">
      <Flex gap={4}>
        <Image src={imgProfile} alt="profile" width={100} marginTop={1} borderRadius="full" />
        <Flex justifyContent="center" flexDirection="column">
          <Text fontSize="2xl" fontWeight="bold">
            Melanie Tan&nbsp;
            <i className="fa fa-check-circle text-primary-gray" />
          </Text>
          <Text className="text-primary-gray" fontSize="md" fontWeight={500}>
            Professional Food Photographer
          </Text>
          <Flex className="text-primary-gray" fontSize="sm" gap={3}>
            <Flex alignItems="center" gap={1}>
              <IoLocationSharp className="text-primary-orange" style={{ marginTop: 1 }} />
              <Text>Bangkok</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <IoIosMail className="text-primary-orange" style={{ marginTop: 1 }} />
              <div>melanietan99@gmail.com</div>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Icons.Sort width={30} style={{ marginTop: 10 }} />
    </Flex>
  ), []);

  const bodyMemo = React.useMemo(() => {
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
  }, [photosMemo, isLoading]);

  return (
    <Container paddingTop={4} paddingBottom={4} maxW="container.lg">
      {headerMemo}
      {bodyMemo}
    </Container>
  );
}

export default Home;
