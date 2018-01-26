import React from 'react';

class SearchResult extends React.Component {
	render() {
		let img_path = "./public/images/Bearings/";
		let list_item = this.props.resultData.map((item, key) => {
			var defineClass = '';
			if ((key % 3) == 0) {
				defineClass = 'left';
			} else if ((key % 3) == 1) {
				defineClass = 'center';
			} else {
				defineClass = 'right';
			}
			var reference = item.reference;
			var name1 = "";
			var name2 = "";
			var name3 = "";
			var num = reference.indexOf("/");
			var last_num = reference.lastIndexOf("/");
			if (reference.lastIndexOf("/") > reference.indexOf("/")) {
				name1 = reference.slice(0, reference.indexOf("/"));
				name2 = reference.slice(reference.indexOf("/"), reference.lastIndexOf("/"));
				name3 = reference.slice(reference.lastIndexOf("/"), reference.length);
			} else if (reference.search("/") > 0) {
				name1 = reference.slice(0, reference.search("/"));
				name2 = reference.slice(reference.search("/"), reference.length);
				name3 = "";
			} else {
				name1 = reference;
				name2 = "";
				name3 = "";
			}
			return (
				<div key={key} className={"col-md-4 col-sm-4 col-xs-12 item-result " + defineClass}>
					<div className="item-product">
						<div className="border-product">
							<div className="left-product">
								<img src={img_path + item.part_number + ".png"} />
							</div>
							<div className="right-product">
								<h3 className="result-title">{name1}</h3>
								<h3 className="result-title">{name2}</h3>
								<h3 className="result-title">{name3}</h3>
								<span className="dimension">{item.d + " / " + item.D + " / " + item.B}</span>
								<span className="weight">{item.kg + " kg"}</span>
								<span className="brands">{item.brands}</span>
							</div>
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
