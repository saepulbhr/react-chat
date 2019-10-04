import React from 'react';
import Title from './Title';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');
console.log(socket)

const axios = require('axios');
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: '',
            message: '',
            content: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getData() {

        axios.get(`http://localhost:4000/users`)
            .then(data => {
                this.setState({
                    content: [...data.data]
                })
            })
            .catch(err => {
                console.log(err)
            })

        socket.on('loaddata', function (msg) {

            axios.get(`http://localhost:4000/users`)
                .then(data => {
                    this.setState({
                        content: [...data.data]
                    })
                })
                .catch(err => {
                    console.log(err)
                })

        }.bind(this));

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

    componentDidMount() {
        // console.log('>>>>> sedang di pasang')
        this.getData()
    }

    componentWillUnmount() {
        // console.log('>>>>> tidak di pasang')

    }

    handleClick = userId => {
        const requestOptions = {
            method: 'delete'
        };

        fetch("http://localhost:4000/users/" + userId, requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
            this.getData()
        });
    }

    render() {
        return (
            <div>
                <Title />
                <div className="container">
                    <div className="container-fluid mt-4 ml-4">
                        <ul className="timeline">
                            {this.state.content.map((item, index) => {
                                return (
                                    <li className="timeline-inverted" key={index}>
                                        <button className="timeline-badge danger" onClick={() => { this.handleClick(item._id) }} type="submit"><i className="fa fa-minus"></i></button>
                                        <div className="timeline-panel">
                                            <div className="timeline-body">
                                                <h6 className="timeline-title">{item.fullname}</h6>
                                                <p>{item.message}</p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
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
                        </ul>
                    </div>
                </div>

            </div>

        )
    }
}

export default Chat; 