import Router from '@/main/routes/router'
import ReactDOM from 'react-dom'
import React from 'react'

import { createRoot } from 'react-dom/client';
const container = document.getElementById('main');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Router />);