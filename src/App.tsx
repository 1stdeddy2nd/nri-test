import React from 'react';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { SwalError } from './components/swal';
import Home from './pages/home';

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
        <Home />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
