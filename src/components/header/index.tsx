import {
  Container, Flex, Image, Text,
} from '@chakra-ui/react';
import { IoLocationSharp } from 'react-icons/io5';
import { IoIosMail } from 'react-icons/io';
import React from 'react';
import { Icons } from '../icons';
import imgProfile from '../../assets/img/profile.jpg';
import styles from './style.module.scss';

export const Header = () => {
  // handle scroll
  const [position, setPosition] = React.useState(window.pageYOffset);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;

      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return (() => {
      window.removeEventListener('scroll', handleScroll);
    });
  });

  return (
    <header className={visible ? styles.visible : styles.hidden}>
      <Container paddingTop={4} maxW="container.lg">
        <Flex alignItems="start" gap={2} marginBottom={4} justifyContent="space-between">
          <Flex gap={4}>
            <Image src={imgProfile} alt="profile" width={100} height={100} marginTop={1} borderRadius="full" />
            <Flex justifyContent="center" flexDirection="column">
              <Text fontSize="2xl" fontWeight="bold">
                Melanie Tan&nbsp;
                <i className="fa fa-check-circle text-primary-gray" />
              </Text>
              <Text className="text-primary-gray" fontSize="md" fontWeight={500}>
                Professional Food Photographer
              </Text>
              <Flex className="text-primary-gray" fontSize="sm" flexWrap="wrap">
                <Flex alignItems="center" gap={1} marginRight={3}>
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
      </Container>
    </header>
  );
};
