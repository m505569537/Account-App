import React from 'react';
import PropTypes from 'prop-types'

export default class Addrecord extends React.Component {

	/*
			方法一：非受控组件
	*/

	static propTypes = {
		addItem: PropTypes.func.isRequired,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const date = this.date.value;
		const title = this.title.value;
		const amount = this.amount.value;
		if(date&&title&&amount){
			if(!isNaN(amount))
			{
				const record = {
					date,
					title,
					amount: parseInt(amount)
				};
				this.props.addItem(record);
				this.date.value = ''
				this.title.value = ''
				this.amount.value = ''
			} else {
				this.amount.value = '';
				alert('请输入正确的格式');
			}
		} else {
			alert('请输入完整信息');
		}
	}

	render() {
		return (
			<form className='form-inline' onSubmit={this.handleSubmit}>
				<div className="form-group mr-1">
					<input type="text" className="form-control" placeholder='Date' ref={input => this.date = input} name='date' />
				</div>
				<div className="form-group mr-1">
					<input type="text" className="form-control" placeholder='Title' ref={input => this.title = input} name='title' />
				</div>
				<div className="form-group mr-1">
					<input type="text" className="form-control" placeholder='Amount' ref={input => this.amount = input} name='amount' />
				</div>
				<button type='submit' className="btn btn-primary">Create Record</button>
			</form>
		);
	}

	/*
			方法二：受控组件
	*/
}
