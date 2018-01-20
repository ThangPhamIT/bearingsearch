import React from 'react';

class thickness extends React.Component {
    constructor(){
        super();
        this.setThickness = this.setThickness.bind(this);
    }

    //send data dimension to props sendThickness in app.jsx
    setThickness(e) {
        this.props.sendThickness(e.target.value);
    }

    render() {
        var thickness = [];

        $.each(this.props.dimension, function(i, el) {
            if($.inArray(el.B, thickness) === -1) {
                thickness.push(el.B);
            }
        });
        thickness.sort();
        let optionSelections = thickness.map(function(el, k) {
            return (
                <option key={k} value={el}>{el}</option>
            );
        });

        return (
            <select id="thickness" className="thickness-before" require="" onChange={this.setThickness} value={this.props.selectedThick}>
    			<option value="-1" >Thickness (B)</option>
    			{optionSelections}
    		</select>
        );
    };
};

module.exports = thickness;
