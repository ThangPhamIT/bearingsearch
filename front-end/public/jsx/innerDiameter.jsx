import React from 'react';

class innerDiameter extends React.Component {
    constructor(){
        super();
        this.setInnerDiameter = this.setInnerDiameter.bind(this);
    }

    //send data dimension to props sendInnerDiameter in app.jsx
    setInnerDiameter(e) {
        this.props.sendInnerDiameter(e.target.value);
    }

    render() {
        var innerDiameter = [];

        $.each(this.props.dimension, function(i, el) {
            if($.inArray(el.d, innerDiameter) === -1) {
                innerDiameter.push(el.d);
            }
        });
        innerDiameter.sort();
        let optionSelections = innerDiameter.map(function(el, k) {
            return (
                <option key={k} value={el}>{el}</option>
            );
        });

        return (
            <select id="inner-diameter" className="inner-diameter-before" require="" onChange={this.setInnerDiameter} value={this.props.selectedInner}>
    			<option value="-1" >Inside Diameter (d)</option>
    			{optionSelections}
    		</select>
        );
    };
};

module.exports = innerDiameter;
