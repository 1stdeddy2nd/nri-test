import React from 'react';
import './App.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { SwalError } from './components/swal';
import Home from './pages/home';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 3,
        onError: (err: any) => SwalError(err.message),
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Home />
        <div className="bottomHeavenLight" />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
