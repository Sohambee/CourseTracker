import axios from 'axios';
import React, { Component } from 'react';
import "../css/navbar-fixed-left.css";
import "../css/docs.css";
import "../css/main.css";

export default class CreateCourse extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            code: '',
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
        console.log(this.state.name);
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
        console.log(this.state.description);
    }

    onChangeCourseCode(e) {
        this.setState({
            code: e.target.value
        });
    }

    onSubmit(e) {
        let config = {
            headers: {
                'authorization': localStorage.getItem("jwt"),
            }
        }

        e.preventDefault();

        const course = {
            name: this.state.name,
            description: this.state.description,
            code: this.state.code
        }

        console.log(course);

        axios.post('http://localhost:5000/courses/add', course, config)
            .then(result => console.log(result.data))
            .catch(error => console.log(error.response));

        window.location = '/';
    }

    render() {
        return (
            <div className="container">
                <div className="dashboard">
                    <hr/>
                    <h1>Create a Course</h1>
                    <hr/>
                </div>
                <form id="addCourse" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Course Name:</label>
                        <input type="text" className="form-control courseInput" required value={this.state.name} onChange={this.onChangeName} id="inputCourseName"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Course Description:</label>
                        <input type="text" className="form-control courseInput" required value={this.state.description} onChange={this.onChangeDescription} id="inputCourseDescription"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Course Code:</label>
                        <input type="number" min="0" className="form-control courseInput" required value={this.state.code} onChange={this.onChangeCourseCode} id="inputCourseID"></input>
                    </div>

                    <button type="submit" className="btn btn-primary" id="buttonAddCourse">Add Course</button>
                </form>
            </div>
        )
    }
}