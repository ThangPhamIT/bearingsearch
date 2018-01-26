import "babel-polyfill";
import "isomorphic-fetch";

import React from 'react';
import ReactDOM from 'react-dom';

import App from '../jsx/app.jsx';


ReactDOM.render(
	<div> <App /> </div>, document.getElementById('app')
);
