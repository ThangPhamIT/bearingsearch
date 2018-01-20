const path = require('path');
import React from 'react';
import ReactDOM from 'react-dom';

import './global';
import App from '../app/app.jsx';

let bearing_list =
	[
		'Ball Bearings',
		'Cylindrical Roller Bearings',
		'Tapered Roller Bearings',
		'Double-row Spherical Roller Bearings',
		'Needle Roller Bearings',
		'Spherical Roller Thrust Bearings',
		'Ball Thrust Bearings'
	];

ReactDOM.render(
	<div>
		<App bearingList={bearing_list}/>
	</div>,
	document.getElementById('app')
);
