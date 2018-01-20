import React from 'react';

import OuterDiameter from './outerDiameter.jsx';
import InnerDiameter from './innerDiameter.jsx';
import Thickness from './thickness.jsx';

import $ from '../js/jquery.min';

class DimensionSearch extends React.Component {

	constructor() {
		super();
		this.state = {
			outerDimensions: [],
			innerDimensions: [],
			thickDimensions: [],
			selectedOuter: "",
			selectedInner: "",
			selectedThick: ""
		}
		this.setUnit = this.setUnit.bind(this);
		this.getInnerDiameter = this.getInnerDiameter.bind(this);
		this.getOuterDiameter = this.getOuterDiameter.bind(this);
		this.getThickness = this.getThickness.bind(this);
		this.submitSearch = this.submitSearch.bind(this);
	}

	//send data dimension to props sendBearingType in app.jsx
	setUnit(e) {
		this.props.sendUnit(e.target.value);
	}

	//get data bind from component OuterDiameter
	getOuterDiameter(val) {
		this.props.sendOuterDiameter(val);
		this.setState({
			selectedOuter: val
		});
	}

	//get data bind from component InnerDiameter
	getInnerDiameter(val) {
		this.props.sendInnerDiameter(val);
		this.setState({
			selectedInner: val
		});
	}

	//get data bind from component Thickness
	getThickness(val) {
		this.props.sendThickness(val);
		this.setState({
			selectedThick: val
		});
	}

	submitSearch(val) {
		this.props.sendDimensionSearch();
	}

	filteredDimensions(props) {
		//console.log("Received props.dimension: " + JSON.stringify(props.dimension));
		var filteredDimensions = [];
		var me = this;
		props.dimension.map(function (value, key) {
			if((me.state.selectedInner === "" || value.d === me.state.selectedInner)
				&& (me.state.selectedOuter === "" || value.D === me.state.selectedOuter)
				&& (me.state.selectedThick === "" || value.d === me.state.selectedThick)){
					filteredDimensions.push(value);
				}
		});
		//console.log("filteredDimensions: " + JSON.stringify(filteredDimensions));
		filteredDimensions.map(function (value, key) {
			me.state.innerDimensions.push(value.d);
			me.state.outerDimensions.push(value.D);
			me.state.thickDimensions.push(value.B);
		});
	}

	render() {
		return (
			<div>
				<div className="name-type"></div>
				<div className="input-unit-bearing">
					<div className="unit">
						<div className="title-unit">Measurement Unit</div>
						<div className="sl-unit" onChange={this.setUnit}>
							<div className="rd-mili">
								<input type="radio" id="milimeter" defaultChecked value="1" name="unit" />
								<label htmlFor="milimeter">Milimeter</label>
							</div>
							<div className="rd-inch">
								<input type="radio" id="inch" value="0" name="unit" />
								<label htmlFor="inch">Inch</label>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="title-unit">Outside Diameter (D)</div>
						<div className="sl-unit">
							<OuterDiameter
								dimension={this.props.dimension}
								sendOuterDiameter = {this.getOuterDiameter}
								selectedOuter = {this.props.selectedOuter}
							/>
						</div>
					</div>
					<div className="row">
						<div className="title-unit">Inside Diameter (d)</div>
						<div className="sl-unit">
							<InnerDiameter
								dimension={this.props.dimension}
								sendInnerDiameter = {this.getInnerDiameter}
								selectedInner = {this.props.selectedInner}
							/>
						</div>
					</div>
					<div className="row">
						<div className="title-unit">Thickness (B)</div>
						<div className="sl-unit">
							<Thickness
								dimension = {this.props.dimension}
								sendThickness = {this.getThickness}
								selectedThick = {this.props.selectedThick}
							/>
						</div>
					</div>
					<div className="row">
						<input type="button"
							className="btn btn-search"
							onClick={this.submitSearch}
							value="Search" />
					</div>
				</div>
			</div>
		);
	};
}

module.exports = DimensionSearch;
