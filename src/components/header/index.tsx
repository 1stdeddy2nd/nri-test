import {
  Container, Flex, Image, Text,
} from '@chakra-ui/react';
import { IoLocationSharp } from 'react-icons/io5';
import { IoIosMail } from 'react-icons/io';
import React from 'react';
import { Icons } from '../icons';
import styles from './style.module.scss';

interface HeaderProps {
  onClickSortMenu?: React.MouseEventHandler<SVGSVGElement>;
  isVisible?: boolean
}

export const Header = (props: HeaderProps) => {
  const { onClickSortMenu, isVisible } = props;

  return (
    <header className={isVisible ? styles.visible : styles.hidden}>
      <Container paddingTop={4} maxW="container.lg">
        <Flex alignItems="start" gap={2} marginBottom={4} justifyContent="space-between">
          <Flex gap={4}>
            <Image src="/img/profile.jpg" alt="profile" width={100} height={100} marginTop={1} borderRadius="full" />
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
          <Icons.Sort width={30} style={{ marginTop: 10 }} onClick={onClickSortMenu} role="button" />
        </Flex>
      </Container>
    </header>
  );
};
