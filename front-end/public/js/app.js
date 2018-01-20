const path = require('path');
import React from 'react';
import ReactDOM from 'react-dom';

import './global';

import App from '../jsx/app.jsx';


ReactDOM.render(
	<div> <App /> </div>,document.getElementById('app')
);
