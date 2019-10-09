import React from 'react';
import io from 'socket.io-client';

const axios = require('axios');


class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: '',
            message: '',
            content: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault()

        const api = `http://localhost:4000/`
        const data = {
            fullname: this.state.fullname,
            message: this.state.message
        }

        axios.post(api, data).then((data) => {
            console.log('ini hasil dari', data)
            let item = data.data.data;
            let newData = { _id: item._id, fullname: item.fullname, message: item.messages };
            this.props.onAdd(newData)
            this.setState({
                fullname: '',
                message: ''
            });
        }).catch(err => {
            console.log(err)
        })

        const socket = io('http://localhost:4001/');
        socket.emit('addchat', data);
        console.log('nilai dari>>', data)
    }


    render() {
        return (
            <li className="timeline-inverted">
                <div className="timeline-badge success"><i className="fa fa-plus"></i></div>
                <div className="timeline-panel">
                    <form onSubmit={this.handleSubmit} >
                        <div className="timeline-heading">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Full name" value={this.state.fullname} name="fullname" onChange={(e) => this.setState({ fullname: e.target.value })} />
                            </div>
                        </div>
                        <div className="timeline-body">
                            <div className="form-group">
                                <textarea className="form-control" placeholder="Type a message" rows="2" name="message" onChange={(e) => this.setState({ message: e.target.value })} value={this.state.message}></textarea>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">send</button>
                    </form>
                </div>
            </li>
        )
    }
}

export default Form; 