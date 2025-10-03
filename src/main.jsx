import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';

const theme = extendTheme({
  styles: { 
    global: { 
      body: { 
        bg: 'gray.50',
        fontFamily: "'Inter', sans-serif"
      } 
    } 
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Inter', sans-serif",
  },
  colors: {
    brand: {
      50: '#e6fffa',
      100: '#b2f5ea',
      500: '#319795',
      600: '#2c7a7b',
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
