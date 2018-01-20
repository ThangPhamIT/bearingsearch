import React from 'react';

import DimensionSearch from './dimensionSearch.jsx';
import SearchResult from './searchResult.jsx';
import BearingType from './bearingType.jsx';

import $ from '../js/jquery.min';
import global from '../js/global.js';

class app extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			bearingTypes: [],
			dimension: [],
			isLoading: false,
			selectedUnit: 1,
			type_id: "",
			selectedOuter: "",
			selectedInner: "",
			selectedThick: "",
			selectedType: "",
			result: [],
			API_URL : 'http://localhost:8082/bearingDimensions/'
		};
		this.getDimension = this.getDimension.bind(this);
		this.getUnit = this.getUnit.bind(this);
		this.getDimensionSearch = this.getDimensionSearch.bind(this);
		this.getOuterDiameter = this.getOuterDiameter.bind(this);
		this.getInnerDiameter = this.getInnerDiameter.bind(this);
		this.getThickness = this.getThickness.bind(this);
	}

	fetch_bearingTypes() {
		fetch('http://localhost:8082/bearingTypes', {
			method: 'get',
			'Content-Type': 'application/json'
		}).then((response) => response.json())
			.then((responseData) => {
				this.setState({
					bearingTypes: responseData,
					isLoading: false
				});
			}).catch(function () {
				console.log(Error);
			});
	}

	// call api get dimension bearing
	fetch_bearing(typeId, unit) {
		console.log('fetch_bearing'+unit);
		fetch(this.state.API_URL + typeId + '/unit/' + unit, {
			method: 'get',
			'Content-Type': 'application/json'
		}).then((response) => response.json())
			.then((responseData) => {
				this.setState({
					dimension: responseData,
				});
			}).catch(function () {
				console.log(Error);
			});
	}

	// call api get result bearing
	fetch_result(typeId, unit, outer, inner = undefined, thick) {
		var str_inner = "";
		var str_outer = "";
		var str_thick = "";

		if(inner != '' && inner != '-1' && inner != undefined) {
			str_inner = "&d=" + inner;
		}
		if(outer != '' && outer != '-1' && outer != undefined) {
			str_outer = "&D=" + outer;
		}
		if(thick != '' && thick != '-1' && thick != undefined) {
			str_thick = "&B=" + thick;
		}
		console.log('http://localhost:8082/bearings?bearing_type='+ typeId +'&unit='+ unit +str_inner+str_outer + str_thick);
		fetch('http://localhost:8082/bearings?bearing_type='+ typeId +'&unit='+ unit +str_inner+str_outer + str_thick, {
			method: 'get',
			'Content-Type': 'application/json'
		}).then((response) => response.json())
			.then((responseData) => {
				this.setState({
					result: responseData,
				});
			}).catch(function () {
				console.log(Error);
			});
	}

	componentWillMount() {
		//console.log('will');
		this.fetch_bearingTypes();
	}

	getDimension(dimensionVal, selectVal) {
	    // do not forget to bind getData in constructor
		this.setState({
				dimension: dimensionVal,
				selectedType: selectVal,
				selectedOuter: "",
				selectedInner: "",
				selectedThick: ""
		});
		console.log('dimensionVal ' + selectVal + "--> " + JSON.stringify(dimensionVal));
		this.changeTextSelect();
	}

	changeTextSelect() {
		$('#outer-diameter').removeClass('outer-diameter');
		$('#outer-diameter').addClass('outer-diameter-before');
		$('#inner-diameter').removeClass('inner-diameter');
		$('#inner-diameter').addClass('inner-diameter-before');
		$('#thickness').removeClass('thickness');
		$('#thickness').addClass('thickness-before');
	}

	getUnit(val) {
		this.setState({
				selectedUnit: val,
				selectedOuter: "",
				selectedInner: "",
				selectedThick: ""
		});
		this.fetch_bearing(this.state.selectedType, val);
		this.changeTextSelect();
	}

	getDimensionSearch(outer, inner, thick) {
		this.fetch_result(this.state.selectedType, this.state.selectedUnit, this.state.selectedOuter, this.state.selectedInner, this.state.selectedThick);
	}

	//get Outer diameter from compnent dimensionSearch
	getOuterDiameter (val) {
		this.setState({
			selectedOuter: val
		});
	}

	//get Inner diameter from compnent dimensionSearch
	getInnerDiameter (val) {
		this.setState({
			selectedInner: val
		});
	}

	//get Thickness from compnent dimensionSearch
	getThickness (val) {
		this.setState({
			selectedThick: val
		});
	}

	render() {
		console.log('outer-'+this.state.selectedOuter);
		console.log('inner-'+this.state.selectedInner);
		console.log('thick-'+this.state.selectedThick);
		console.log('data'+JSON.stringify(this.state.result));
		return (
			<div>
				<div className="logo">
					<div className="container">
						<img src="./public/images/logo.jpg" title="logo" />
						<span className="main-title">Bearing Search</span>
					</div>
				</div>
				<div className="search-content row">
					<div className="container">
						<div className="row">
							<div className="col-md-8 col-sm-8">
								<span className="title-search">Bearing Type</span>
								<BearingType
									bearingTypes = {this.state.bearingTypes}
									sendDimension = {this.getDimension}
									unit = {this.state.selectedUnit}
								/>
							</div>
							<div className="col-md-4 col-sm-4">
								<DimensionSearch
									bearingTypes = {this.state.bearingTypes}
									dimension = {this.state.dimension}
									sendUnit = {this.getUnit}
									sendDimensionSearch = {this.getDimensionSearch}
									sendOuterDiameter = {this.getOuterDiameter}
									sendInnerDiameter = {this.getInnerDiameter}
									sendThickness = {this.getThickness}
									selectedOuter = {this.state.selectedOuter}
									selectedInner = {this.state.selectedInner}
									selectedThick = {this.state.selectedThick}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="clearfix"></div>
				<div className="search-result">
					<div className="container">
						<span className="title-search">{Object.keys(this.state.result).length > 0 ? (Object.keys(this.state.result).length + " items found") : ""} </span>
						<SearchResult resultData={this.state.result} />
					</div>
				</div>
			</div>
		);
	}
}


module.exports = app;
