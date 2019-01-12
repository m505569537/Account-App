import React from 'react';
import axios from 'axios'

import Item from './record.jsx'
import Addrecord from './addrecord.jsx'
import TotalAccount from './total-account.jsx'

export default class List extends React.Component {

	state = {
		data:[],
		shouldUpdate:true
	}

	componentDidMount() {
		let {data} = this.state;
		axios.get("https://5c388838b9bfb20014f713fe.mockapi.io/records")
		 	.then( response => {
		 		data = response.data;
		 		this.setState({data});
		 		//console.log(data);
		 	}).catch(error => {
		 		console.log(error.massage);
		 	})
	}

	addItem = (record) => {
		const {data} = this.state;
		this.setState({
			data:[...data,{id:''+(parseInt(data[data.length-1].id)+1), ...record}],
			shouldUpdate: true
		});
		axios.post("https://5c388838b9bfb20014f713fe.mockapi.io/records",record)
			.then( response => {
				console.log(response);
			}).catch( error => {
				console.log(error);
			});
	}

	deleteItem = (index, id) => {
		const {data} = this.state;
		data.splice(index,1);
		this.setState({
			data,
			shouldUpdate:true
		});
		axios.delete(`https://5c388838b9bfb20014f713fe.mockapi.io/records/${id*1}`)
			.then(response => {
				console.log(response);
			}).catch( error => {
				console.log(error);
			})
	}

	updateItem = (index, id, record) => {
		let {data, shouldUpdate} = this.state;
		if(data[index].amount === record.amount){
			shouldUpdate = false;
		} else {
			shouldUpdate = true;
		}
		data[index].date = record.date;
		data[index].title = record.title;
		data[index].amount = record.amount;
		this.setState({
			data,
			shouldUpdate
		});
		//console.log(shouldUpdate)
		axios.put(`https://5c388838b9bfb20014f713fe.mockapi.io/records/${id*1}`,record)
			.then( response => {
				console.log(response);
			}).catch( error => {
				console.log(error);
			})
	}

	loaded = () => 
		(
		 	<table className="table table-bordered">
			 	<thead>
				 	<tr>
				 		<th>Date</th>
				 		<th>Title</th>
				 		<th>Amount</th>
				 		<th>Actions</th>
				 	</tr>
			 	</thead>
			 	<tbody>
			 		{this.state.data.map((record, index) => <Item key={index} index={index} id={record.id} date={record.date} title={record.title} amount={record.amount} deleteItem={this.deleteItem} updateItem={this.updateItem} />)}
			 	</tbody>
			</table>
		)
	

	loading = () => 
		(
			<h3>LOAD....</h3>
		)

	render() {
		const {data, shouldUpdate} = this.state;
		return (
			<div>
				<TotalAccount data={data.map( record => record.amount)} shouldUpdate={shouldUpdate} />
				<Addrecord addItem={this.addItem} /> <br/>
				{data.length > 0 ? this.loaded() : this.loading()}
			</div>
		)
	}
}
