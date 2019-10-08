import React from 'react';
import { mdReact } from 'markdown-react-js';
import io from 'socket.io-client';
import Form from './Form';

const axios = require('axios');
class Chatlist extends React.Component {
    state = {
        fullname: '',
        message: '',
        content: []
    }

    componentDidMount() {
        // console.log('>>>>> sedang di pasang')

        const socket = io('http://localhost:4001/');

        socket.on('result-data', (data) => {
            axios.get(`http://localhost:4000/`)
                .then(data => {
                    this.setState({
                        content: [...data.data]
                    })
                })
        });

        axios.get(`http://localhost:4000/`)
            .then(data => {
                console.log('isi', data)
                this.setState({
                    content: [...data.data]
                })
            })

        socket.on('loaddata', data => {
            this.setState({
                content: [...this.state.content, data]
            });
        });
    }

    onAdd = (item) => {
        this.setState(prevState => ({
            content: [...prevState.content, item]
        }))
    }

    handleClick = userId => {
        const requestOptions = {
            method: 'delete'
        };

        fetch("http://localhost:4000/" + userId, requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
            axios.get(`http://localhost:4000`)
                .then(data => {
                    this.setState({
                        content: [...data.data]
                    })
                })
        });

        const socket = io('http://localhost:4001/');
        socket.emit('delete')
    }

    render() {
        return (
            <ul className="timeline">
                {this.state.content.map((item, index) => {
                    return (
                        <li className="timeline-inverted" key={index}>
                            <button className="timeline-badge danger" onClick={() => { this.handleClick(item._id) }} type="submit"><i className="fa fa-minus"></i></button>
                            <div className="timeline-panel">
                                <div className="timeline-body">
                                    <h6 className="timeline-title">{item.fullname}</h6>
                                    {mdReact()(item.message)}
                                </div>
                            </div>
                        </li>
                    )
                })}
                <Form onAdd={this.onAdd} />
            </ul>
        )
    }
}

export default Chatlist; 