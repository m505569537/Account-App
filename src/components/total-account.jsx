import React from 'react';
import PropTypes from 'prop-types'

export default class TotalAccount extends React.Component {

	state = {
		income:0,
		expenditure:0
	}

	static propTypes = {
		data: PropTypes.array.isRequired,
		shouldUpdate: PropTypes.bool.isRequired
	};

	componentWillReceiveProps(nextProps) {
		const {data, shouldUpdate} = nextProps;
		//console.log(shouldUpdate)
		if(shouldUpdate){
			let {income, expenditure} = this.state;
			income=0;
			expenditure=0;
			data.forEach(data => {
				if(data>0){
					income+=data;
				} else {
					expenditure+=data;
				}
			});
			this.setState({income, expenditure});
		}
	}

	render() {
		const {income, expenditure} = this.state;
		return (
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>INCOME</th>
						<th>EXPENDITURE</th>
						<th>TOTAL</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>${income}</td>
						<td>${expenditure}</td>
						<td>${income*1 + expenditure*1}</td>
					</tr>
				</tbody>
			</table>
		)
	}
}
