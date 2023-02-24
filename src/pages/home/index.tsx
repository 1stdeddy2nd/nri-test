import React from 'react';
import {
  Box, Container,
  Flex, Grid, GridItem, Image, Input, InputGroup, InputLeftElement, Spinner, Text,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import { FaSearch } from 'react-icons/fa';
import FoodJSON from './foods.json';
import { Header } from '../../components/header';
import { useHome } from './hooks';
import styles from './style.module.scss';

function Home() {
  // separating function to will make you more focus on styling here
  const {
    isLoading, settingsCarousel, photosMemo, show, searchValue, visibleHeader,
  } = useHome();

  // render slider from react-slick
  const sliderMemo = React.useMemo(() => (
    <Box h={300} marginBottom={8}>
      <Slider {...settingsCarousel}>
        {FoodJSON.map((food) => (
          <Box h={280} paddingRight={3} paddingLeft={3} key={food.id}>
            <Box h="100%" w="100%" borderRadius={30} className="bg-primary-orange">
              <Image
                src={food.url}
                w="100%"
                h="75%"
                borderRadius={30}
                borderBottomRightRadius={0}
                marginBottom={2}
                objectFit="cover"
              />
              <Text paddingLeft={10} paddingRight={4} color="white" className="triple-dot">{food.title}</Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  ), [FoodJSON]);

  const contentsMemo = React.useMemo(() => {
    // show loading while waiting api fetch
    if (isLoading) return <Flex justifyContent="center"><Spinner /></Flex>;

    // telling use if data is empty
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
            rowSpan={{ base: 1, md: i % 4 === 0 || (i + 2) % 4 === 0 ? 2 : 0, lg: i % 2 === 0 ? 2 : 1 }}
            key={item.id}
          >
            <Image
              src={item.url}
              w="100%"
              h={{ md: i % 4 === 0 || (i + 2) % 4 === 0 ? 600 : 300, lg: i % 2 === 0 ? 600 : 295 }}
              borderRadius="5px"
              title={item.title}
            />
          </GridItem>
        ))}
      </Grid>
    );
  }, [photosMemo, isLoading]);

  return (
    <div>
      <Header onClickSortMenu={() => show.setValue(!show.value)} isVisible={visibleHeader} />
      <Container paddingTop={{ base: 160, sm: 140 }} paddingBottom={12} maxW="container.lg">
        {sliderMemo}
        {show.value && (
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
          >
            <FaSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search food by title..."
            value={searchValue.value}
            onChange={(e) => searchValue.setValue(e.target.value)}
            marginBottom={4}
          />
        </InputGroup>
        )}
        {contentsMemo}
        <div className={styles.backgroundFooter} />
      </Container>
    </div>
  );
}

export default Home;
