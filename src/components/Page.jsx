import React from 'react';
import axios from 'axios';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Start your diary here!'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        //turn this into a function that saves it to a database so it can be stored
        //maybe use mongodb because these are documents???
        alert('Page is being saved');
        event.preventDefault();
    }

    render() {
        return (
            <div className="text-area">
                <form onSubmit={this.handleSubmit}>
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </form>
            </div>
        );
    }
}

export default Page