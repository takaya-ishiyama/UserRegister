import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import HeaderComponent from '../component/HeaderComponent';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import '../styles/global.css'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
          <HeaderComponent/>
          <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
    
    );
}
