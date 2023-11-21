import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import './App.css';
import App from './App';
import { ChakraProvider,extendTheme } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';

const theme = extendTheme({
  fonts: {
    body: 'Ubuntu, sans-serif',
    heading: 'Ubuntu, sans-serif',
    // Add other font styles if needed
  },
});
// Use createRoot from react-dom/client
const root = createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
