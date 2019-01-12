import React from 'react';
import PropTypes from 'prop-types'

export default class Item extends React.Component {

	state = {
		edit:false
	}

	static propTypes = {
		index: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		amount: PropTypes.number.isRequired,
		deleteItem: PropTypes.func.isRequired,
		updateItem: PropTypes.func.isRequired,
	};

	handleToggle = () => {
		this.setState({
			edit: !this.state.edit
		})
	}

	deleteRecord = () => {
		const {index, id} = this.props;
		this.props.deleteItem(index, id);
	}

	updateRecord = () => {
		const {index, id} = this.props;
		const inputDate = this.date.value;
		const inputTitle = this.title.value;
		const inputAmount = this.amount.value;
		const {date,title,amount} = this.props;
		if((date!==inputDate)||(title!==inputTitle)||(amount!==parseInt(inputAmount)))
		{
			if(!isNaN(inputAmount))
			{
				const record = {
				date:inputDate,
				title:inputTitle,
				amount: parseInt(inputAmount)
				};
				this.props.updateItem(index, id, record);
				this.handleToggle();
			} else {
				this.amount.value = '';
				alert('请输入正确的格式');
			}
		}
	}

	editable = () => 
		(
		<tr>
			<td>
				<input type="text" className='form-control' defaultValue={this.props.date} ref={input => this.date = input} />
			</td>
			<td>
				<input type="text" className='form-control' defaultValue={this.props.title} ref={input => this.title = input} />
			</td>
			<td>
				<input type="text" className='form-control' defaultValue={this.props.amount} ref={input => this.amount = input} />
			</td>
			<td>
				<button className="btn btn-info mr-1" onClick={this.updateRecord}>Update</button>
				<button className="btn btn-danger" onClick={this.handleToggle}>Cancle</button>
			</td>
		</tr>
		)

	nonEditable = () => (
		<tr>
			<td>{this.props.date}</td>
			<td>{this.props.title}</td>
			<td>{this.props.amount}</td>
			<td>
				<button className="btn btn-info mr-1" onClick={this.handleToggle}>Edit</button>
				<button className="btn btn-danger" onClick={this.deleteRecord}>Delete</button>
			</td>
		</tr>
	)

	render() {
		const {edit} = this.state;
		if(edit){
			return this.editable();
		} else {
			return this.nonEditable();
		}
	}
}