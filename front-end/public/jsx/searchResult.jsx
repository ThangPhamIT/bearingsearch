import React from 'react';

class SearchResult extends React.Component {
	render() {
		let img_path = "./public/images/Bearings/";
		let list_item = this.props.resultData.map((item, k) => {
			return (
				<div key={k} className="col-md-4 col-sm-4 col-xs-12 item-result">
					<div className="item-product">
						<div className="left-product">
							<img src={img_path + item.part_number + ".png"} />
						</div>
						<div className="right-product">
							<h3 className="result-title">{item.reference}</h3>
							<span className="dimension">{item.d + " / " + item.D + " / " + item.B}</span>
							<span className="weight">{item.kg + " kg"}</span>
							<span className="brands">{item.brands}</span>
						</div>
					</div>
				</div>
			);
		});
		return (
			<div className="panel panel-default panel-result">
				<div className="panel-body">
					{list_item}
				</div>
			</div>
		);
	};
}

module.exports = SearchResult;
