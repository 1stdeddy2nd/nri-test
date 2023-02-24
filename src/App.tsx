import React from 'react';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { SwalError } from './components/swal';
import Home from './pages/home';
import { Header } from './components/header';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
        onError: (err: any) => SwalError(err.message),
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Header />
        <Container paddingTop={{ base: 160, sm: 140 }} paddingBottom={4} maxW="container.lg">
          <Home />
        </Container>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
