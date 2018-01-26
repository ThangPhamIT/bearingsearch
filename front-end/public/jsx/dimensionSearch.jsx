import React from 'react';

import { AutoComplete } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;

class DimensionSearch extends React.Component {

	constructor() {
		super();
		var me = this;
		this.state = {
			filteredDimensions: [],
			OutsideDimensions: [],
			InsideDimensions: [],
			thickDimensions: [],
			selectedOutside: "-1",
			selectedInside: "-1",
			selectedThick: "-1"
		}
		this.setUnit = this.setUnit.bind(this);
		this.getInsideDiameter = this.getInsideDiameter.bind(this);
		this.getOutsideDiameter = this.getOutsideDiameter.bind(this);
		this.getThickness = this.getThickness.bind(this);
		this.submitSearch = this.submitSearch.bind(this);
	}

	//send data dimension to props sendBearingType in app.jsx
	setUnit(e) {
		this.props.sendUnit(e.target.value);
	}

	//get data bind from component OutsideDiameter
	getOutsideDiameter(value) {
		this.props.sendOutsideDiameter(value);
		this.setState({
			selectedOutside: value,
		});
	}



	//get data bind from component InsideDiameter
	getInsideDiameter(val) {
		debugger;
		this.props.sendInsideDiameter(val);
		this.setState({
			selectedInside: val
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

	render() {
		//---------------------------
		var OutsideDiameter = [];

		$.each(this.props.dimension, function (i, el) {
			if ($.inArray(el.D, OutsideDiameter) === -1) {
				OutsideDiameter.push(el.D);
			}
		});
		OutsideDiameter.sort();

		let optionOutsideSelections = OutsideDiameter.map(function (el, k) {
			return (
				<Option key={k} value={el}>{el}</Option>
			);
		});

		//---------------------------
		var InsideDiameter = [];

		$.each(this.props.dimension, function (i, el) {
			if ($.inArray(el.d, InsideDiameter) === -1) {
				InsideDiameter.push(el.d);
			}
		});
		InsideDiameter.sort();

		let optionInsideSelections = InsideDiameter.map(function (el, k) {
			return (
				<Option key={k} value={el}>{el}</Option>
			);
		});
		//---------------------------------
		var thickness = [];

		$.each(this.props.dimension, function (i, el) {
			if ($.inArray(el.B, thickness) === -1) {
				thickness.push(el.B);
			}
		});
		thickness.sort();

		let optionThicknessSelections = thickness.map(function (el, k) {
			return (
				<Option key={k} value={el}>{el}</Option>
			);
		});
		
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
						<div className="title-unit">Inside Diameter (d)</div>
						<div className={"sl-unit inside-select" + (this.props.selectedInside == "-1" ? "" : "selected")}>
							<Select
								showSearch
								style={{ width: '100%', overflow: scroll }}
								dropdownStyle={{ height: 300, overflow: scroll }}
								onChange={this.getInsideDiameter}
								onEnter={this.getInsideDiameter}
								value={this.props.selectedInside == "-1" ? " Inside Diameter (d) " : this.props.selectedInside}
							>
								<Option key="-1" value="-1"> All </Option>
								{optionInsideSelections}
							</Select>
						</div>
					</div>
					<div className="row">
						<div className="title-unit">Outside Diameter (D)</div>
						<div className={"sl-unit " + (this.props.selectedOutside == "-1" ? "" : "selected")}>
							<Select
								showSearch
								style={{ width: '100%' }}
								dropdownStyle={{ height: 300, overflow: scroll }}
								optionFilterProp="children"
								placeholder=" Outside Diameter (D) "
								onChange={this.getOutsideDiameter}
								onEnter={this.getOutsideDiameter}
								value={this.props.selectedOutside == "-1" ? " Outside Diameter (D) " : this.props.selectedOutside}
							>
								<Option key="-1" value="-1"> All </Option>
								{optionOutsideSelections}
							</Select>
						</div>
					</div>
					<div className="row">
						<div className="title-unit">Thickness (B)</div>
						<div className={"sl-unit " + (this.props.selectedThick == "-1" ? "" : "selected")}>
							<Select
								showSearch
								style={{ width: '100%' }}
								dropdownStyle={{ height: 300, overflow: scroll }}
								optionFilterProp="children"
								placeholder=" Inside Diameter (D) "
								onChange={this.getThickness}
								onEnter={this.getThickness} selectedThick
								value={this.props.selectedThick == "-1" ? " Thickness (B) " : this.props.selectedThick}
							>
								<Option key="-1" value="-1"> All </Option>
								{optionThicknessSelections}
							</Select>
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
