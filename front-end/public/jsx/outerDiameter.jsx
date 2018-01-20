import React from 'react';

class outerDiameter extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.setOuterDiameter = this.setOuterDiameter.bind(this);
    }

    setOuterDiameter(e) {
		this.props.sendOuterDiameter(e.target.value);
        //this.state.selectedValue = e.target.value;
        //this.setState({selectedValue : e.target.value});
	}

    render() {
        var outerDiameter = [];

        $.each(this.props.dimension, function(i, el) {
            if($.inArray(el.D, outerDiameter) === -1) {
                outerDiameter.push(el.D);
            }
        });
        outerDiameter.sort();
        let optionSelections = outerDiameter.map(function(el, k) {
            return (
                <option key={k} value={el}>{el}</option>
            );
        });

        return (
            <select id="outer-diameter" className="outer-diameter-before" require="" onChange={this.setOuterDiameter} value={this.props.selectedOuter}>
                <option value="-1"> Outer Diameter (D)</option>
                {optionSelections}
            </select>
        );
    };
};

module.exports = outerDiameter;
