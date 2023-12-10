import { Amplify } from 'aws-amplify';

import {
  ChakraProvider,
} from '@chakra-ui/react';

import awsExports from '../aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

function App({
  Component,
  pageProps,
}) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
