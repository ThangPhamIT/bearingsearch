import React from 'react';

import DimensionSearch from './dimensionSearch.jsx';
import SearchResult from './searchResult.jsx';
import BearingType from './bearingType.jsx';

import { URL, API_bearingDimensions, API_bearingTypes, API_bearings } from '../../constant/constant';

var url_dimension = URL + API_bearingDimensions;
var url_result = URL + API_bearings;
var url_bearingTypes = URL + API_bearingTypes;

class app extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			bearingTypes: [],
			dimension: [],
			beforeFilteredDimensions: [],
			isLoading: false,
			selectedUnit: 1,
			type_id: "",
			selectedOutside: "-1",
			selectedInside: "-1",
			selectedThick: "-1",
			selectedType: "",
			result: [],
			isHandleSearch: false,
			intervalId: 0
		};
		this.getDimension = this.getDimension.bind(this);
		this.getUnit = this.getUnit.bind(this);
		this.getDimensionSearch = this.getDimensionSearch.bind(this);
		this.getOutsideDiameter = this.getOutsideDiameter.bind(this);
		this.getInsideDiameter = this.getInsideDiameter.bind(this);
		this.getThickness = this.getThickness.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);
		this.filterDimension = this.filterDimension.bind(this);
	}

	fetch_bearingTypes() {

		fetch(url_bearingTypes, {
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
		fetch(url_dimension + typeId + '/unit/' + unit, {
			method: 'get',
			'Content-Type': 'application/json'
		}).then((response) => response.json())
			.then((responseData) => {
				this.setState({
					beforeFilteredDimensions: responseData,
					dimension: responseData
				});
			}).catch(function () {
				console.log(Error);
			});
	}

	// call api get result bearing
	fetch_result(typeId, unit, outside, inside, thick) {
		var str_inside = "";
		var str_outside = "";
		var str_thick = "";

		if (inside != '' && inside != '-1' && inside != undefined) {
			str_inside = "&d=" + inside;
		}
		if (outside != '' && outside != '-1' && outside != undefined) {
			str_outside = "&D=" + outside;
		}
		if (thick != '' && thick != '-1' && thick != undefined) {
			str_thick = "&B=" + thick;
		}
		console.log('search - ' + url_result + '?bearing_type=' + typeId + '&unit=' + unit + str_inside + str_outside + str_thick);
		fetch(url_result + '?bearing_type=' + typeId + '&unit=' + unit + str_inside + str_outside + str_thick, {
			method: 'get',
			'Content-Type': 'application/json'
		}).then((response) => response.json())
			.then((responseData) => {
				this.setState({
					result: responseData,
					isHandleSearch: true
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
			beforeFilteredDimensions: dimensionVal,
			selectedType: selectVal,
			selectedOutside: "-1",
			selectedInside: "-1",
			selectedThick: "-1"
		});
	}

	getUnit(val) {
		this.setState({
			selectedUnit: val,
			selectedOutside: "-1",
			selectedInside: "-1",
			selectedThick: "-1"
		});
		this.fetch_bearing(this.state.selectedType, val);
	}

	getDimensionSearch() {
		this.fetch_result(this.state.selectedType, this.state.selectedUnit, this.state.selectedOutside, this.state.selectedInside, this.state.selectedThick);
	}

	//filter dimension
	filterDimension(valueInside, valueOutside, valueThick) {
		var me = this;
		var filteredDimensions = [];
		//me.state.beforeFilteredDimensions
		me.state.beforeFilteredDimensions.map((value, key) => {
			if ((valueOutside === "-1" || value.D === valueOutside) 
			&& (valueInside === "-1" || value.d === valueInside)
			&& (valueThick === "-1" || value.B === valueThick)) {
				filteredDimensions.push(value);
			}
		});
		me.setState({
			dimension: filteredDimensions
		});
	}

	//get Outside diameter from compnent dimensionSearch
	getOutsideDiameter(valueOutside) {
		console.log('getOutsideDiameter--' + valueOutside);
		this.filterDimension(this.state.selectedInside, valueOutside, this.state.selectedThick);
		this.setState({
			selectedOutside: valueOutside
		});
	}

	//get Inside diameter from compnent dimensionSearch
	getInsideDiameter(valueInside) {
		this.filterDimension(valueInside, this.state.selectedOutside, this.state.selectedThick);(valueInside);
		this.setState({
			selectedInside: valueInside
		});
	}

	//get Thickness from compnent dimensionSearch
	getThickness(valueThick) {
		this.filterDimension(this.state.selectedInside, this.state.selectedOutside, valueThick);
		this.setState({
			selectedThick: valueThick
		});
	}

	scrollToTop() {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
	}

	componentDidUpdate() {
		if ($('body').height() > window.innerHeight) {
			$("#scroll_top").show();
		} else {
			$("#scroll_top").hide();
		}
	}
	// componentDidCatch(error, info) {
  
	// 	/* Example stack information:
	// 	   in ComponentThatThrows (created by App)
	// 	   in ErrorBoundary (created by App)
	// 	   in div (created by App)
	// 	   in App
	// 	*/
	// 	console.log(error, "-", info.componentStack);
		
	// }
	
	render() {
		console.log('state-inside-',this.state.selectedInside);
		return (
			<div>
				<div className="logo">
					<div className="container">
						<img src="./public/images/logo.jpg" title="logo" />
						<span className="main-title">Bearing Search</span>
					</div>
				</div>
				<div className="search-content">
					<div className="container">
						<div className="row">
							<div className="col-md-8 col-sm-8">
								<span className="title-search">Bearing Type</span>
								<BearingType
									url_dimension={url_dimension}
									bearingTypes={this.state.bearingTypes}
									sendDimension={this.getDimension}
									unit={this.state.selectedUnit}
								/>
							</div>
							<div className="col-md-4 col-sm-4">
								<DimensionSearch
									bearingTypes={this.state.bearingTypes}
									dimension={this.state.dimension}
									sendUnit={this.getUnit}
									sendDimensionSearch={this.getDimensionSearch}
									sendOutsideDiameter={this.getOutsideDiameter}
									sendInsideDiameter={this.getInsideDiameter}
									sendThickness={this.getThickness}
									selectedOutside={this.state.selectedOutside}
									selectedInside={this.state.selectedInside}
									selectedThick={this.state.selectedThick}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="clearfix"></div>
				<div className="search-result">
					<div className="container">
						<span className="title-search">{(Object.keys(this.state.result).length >= 0 && this.state.isHandleSearch
							!= false) ? (Object.keys(this.state.result).length + " items found") : ""} </span>
						<SearchResult resultData={this.state.result} />
					</div>
				</div>
				<div title='Back to top' className='scroll' id="scroll_top" onClick={this.scrollToTop}></div>
			</div>
		);
	}
}

module.exports = app;