import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '@/containers/App/App';
import '@/assets/scss/app.scss';

const app = (
    <Router>
        <App />
    </Router>
);

ReactDOM.render(app, document.getElementById('app'));
