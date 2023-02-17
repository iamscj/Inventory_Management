import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App1 from './App1';
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App1 />
    </ChakraProvider>
  </React.StrictMode>
);
