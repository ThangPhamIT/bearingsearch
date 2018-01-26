import React from 'react';
import { Row, Col, Card, Select, Input, Button, Carousel } from 'antd';

var settings_carousel = {
	dots: false,
	infinite: true,
	speed: 300,
	slidesToShow: 3,
	centerMode: true,
	draggable: true,
	arrows: true,
	focusOnSelect: true,
	centerPadding: 15,
	infinite: true,
	swipe: true,
	swipeToSlide: true,
	responsive: [
		{ breakpoint: 770, settings: { slidesToShow: 3 } },
		{ breakpoint: 1000, settings: { slidesToShow: 3 } },
		{ breakpoint: 400, settings: { slidesToShow: 1 } }
	]
};

class bearingType extends React.Component {

	constructor() {
		super();
		this.state = {
			bearing_type: [],
			selectValue: 1,
			dimension: [],
			type_id: '',
			unit: ''
		}
		this.changeTypeBySelection = this.changeTypeBySelection.bind(this);
	}

	// call api get dimension bearing
	fetch_bearing(url, type_id, unit) {
		fetch(url + type_id + '/unit/' + unit, {
			method: 'get',
			'Content-Type': 'application/json'
		}).then((response) => response.json())
			.then((responseData) => {
				this.setState({
					dimension: responseData,
				});
				this.onChangeBearingType(this.state.dimension, this.state.selectValue);
			}).catch(function () {
				console.log(Error);
			});
	}

	componentWillMount() {
		this.fetch_bearing(this.props.url_dimension, this.state.selectValue, this.props.unit);
	}

	//change bearing type when select bearing type
	changeTypeBySelection(e) {
		this.setState({
			selectValue: e.target.value
		});
		//numberSlider is position of slider
		var numberSlider = e.target.value - 1;
		this.refs.slider.goTo(numberSlider);
		this.fetch_bearing(this.props.url_dimension, e.target.value, this.props.unit);
	}

	//change bearing type when scroll carousel
	changeTypeByCarousel(index) {
		this.setState({
			selectValue: (index + 1)
		});
		//index is number of item, (index + 1) is type id
		$('.sl-bearingtype option').removeAttr("selected");
		var string_id = ".sl-bearingtype [name='" + (index + 1) + "']";
		$(string_id).attr('selected', 'selected');
		this.fetch_bearing(this.props.url_dimension, (index + 1), this.props.unit);
	}

	//send data dimension to props sendBearingType in app.jsx
	onChangeBearingType(dimension) {
		this.props.sendDimension(dimension, this.state.selectValue);
	}

	render() {
		var img_path = "./public/images/BearingTypes/";

		var list_item = this.props.bearingTypes.map((item, k) => {
			return (
				<div key={k} className="item" id={"type_" + item.type}>
					<div className="slide-caption">
						<img src={img_path + item.image_name} />
						<input type="hidden" className="typeId" value={item.type} />
						<h2 className="slide-caption-title" id={item.type}>{item.title}</h2>
					</div>
				</div>
			);
		});

		var list_options = this.props.bearingTypes.map((item, k) =>
			<option key={k} name={item.type} value={item.type}>{item.title}</option>
		);

		return (
			<div>
				<select className="sl-bearingtype" onChange={this.changeTypeBySelection}>
					{list_options}
				</select>
				<div className="clearfix"></div>
				<Carousel
					ref='slider' {...settings_carousel}
					afterChange={index => this.changeTypeByCarousel(index)}>
					{list_item}
				</Carousel>
			</div>
		);
	}
}

module.exports = bearingType;