import React from 'react';
import Title from './Title';
import Chatlist from './Chatlist';


class Chat extends React.Component {

    render() {
        return (
            <div>
                <Title />
                <div className="container">
                    <div className="container-fluid mt-4 ml-4">
                       <Chatlist />
                    </div>
                </div>

            </div>

        )
    }
}

export default Chat; 