import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { ApolloProvider } from '@apollo/client'
import { client } from "./graphql/client";

import './index.css';
import App from './App';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider>
          <ModalsProvider>
            <App />
          </ModalsProvider>
          
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>
);
