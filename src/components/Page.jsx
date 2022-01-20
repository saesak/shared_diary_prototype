import React from 'react';
const axios = require('axios').default;

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Start your diary here!',
            title: 'Default Title'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleTitle(event) {
        this.setState({ title: event.target.value })
    }

    handleSubmit(event) {
        //turn this into a function that saves it to a database so it can be stored
        var date = new Date()


        //referenced this post about saving canvas as a blob
        //https://stackoverflow.com/questions/44806870/saving-canvas-to-json-and-loading-json-to-canvas
        axios.post('http://localhost:4444/save', {
            title: this.state.title,
            date: date.toLocaleTimeString(),
            canvas: document.querySelector('canvas').toDataURL(),
            text: this.state.value
        })
        .then(function (response) {
            console.log(response)
            alert('Page saved!');
        })
        .catch(function (error){
            console.log(error)
            alert('Save failed!')
        })
        
        // \n is a line break in react text so i need to replace


        
        event.preventDefault();
    }

    render() {
        return (
            <div className="text-area">
                <label>
                    Title:
                <input type="text" value={this.state.title} onChange={this.handleTitle} />
                </label>
                <form>
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </form>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default Page