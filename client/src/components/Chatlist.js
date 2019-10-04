import React from 'react';
// import io from 'socket.io-client';
import Form from './Form';

// const socket = io('http://localhost:4000');

const axios = require('axios');
class Chatlist extends React.Component {
    constructor() {
        super()
        this.state = {
            content: []
        }
    }

    getData() {
        axios.get(`http://localhost:4000/users`)
            .then(data => {
                console.log('ini hasil', data.data)
                this.setState({
                    content: [...data.data]
                })
            })

        // socket.on('loaddata', function () {

        //     axios.get(`http://localhost:4000/users`)
        //         .then(data => {
        //             this.setState({
        //                 content: [...data.data]
        //             })
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })

        // }.bind(this));

    }

    componentDidMount() {
        // console.log('>>>>> sedang di pasang')
        axios.get(`http://localhost:4000/users`)
            .then(data => {
                console.log('ini hasil', data.data)
                this.setState({
                    content: [...data.data]
                })
            })
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
            <ul className="timeline">
                {this.state.content.map((item, index) => {
                    return (
                        <li className="timeline-inverted" key={index}>
                            <button className="timeline-badge danger" onClick={() => { this.handleClick(item._id) }} type="submit"><i className="fa fa-minus"></i></button>
                            <div className="timeline-panel">
                                <div className="timeline-body">
                                    <h6 className="timeline-title">{item.fullname}</h6>
                                    <p>{mdReact()(item.message)}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
                <Form />
            </ul>
        )
    }
}

export default Chatlist; 