import React from 'react';
import io from 'socket.io-client';
import markdown from 'markdown'

const axios = require('axios');

const socket = io('http://localhost:4000');

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: '',
            message: '',
            content: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        const api = `http://localhost:4000/users`
        const data = {
            fullname: this.state.fullname,
            message: this.state.message
        }

        axios.post(api, data).then(() => {
            this.setState({
                fullname: '',
                message: ''
            });
            socket.emit('addchat', 'typing');
        }).catch(err => {
            console.log(err)
        })
        e.preventDefault()
    }

    handleChange = (e) => {
        this.setState({ 
            fullname: e.target.value,
            message: e.target.value
        })
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