import Router from '@/main/routes/router'
import '@/presentation/styles/global.scss'
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('main');
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <Router />
    </Provider>
);