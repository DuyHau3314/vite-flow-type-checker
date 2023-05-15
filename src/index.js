import React from 'react';
import { createRoot } from 'react-dom/client';

import './i18n';

import App from './App';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={configureStore({})}>
        <App />
    </Provider>
);
