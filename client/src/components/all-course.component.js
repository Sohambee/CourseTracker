import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../css/navbar-fixed-left.css";
import "../css/docs.css";
import "../css/main.css";


const Course = props => (
    <tr>
        <td>{props.course.name}</td>
        <td>{props.course.description}</td>
        <td>{props.course.courseCode}</td>
        <td>
        <Link to={"/edit/" + props.course._id}>Add</Link> | <a href="#" onClick={() => { props.deleteCourse(props.course._id) }}>Delete</a>
        </td>
    </tr>
)

export default class CourseList extends Component {
    constructor(props) {
        super(props);

        this.deleteCourse = this.deleteCourse.bind(this);

        this.state = { courses: [] };
    }

    componentDidMount() {
        let config = {
            headers: {
                'authorization': localStorage.getItem("jwt"),
            }
        }

        axios.get('http://localhost:5000/courses/', config)
            .then(response => {
                this.setState({ courses: response.data });
                console.log(this.state.courses);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteCourse(id) {
        let config = {
            headers: {
                'authorization': localStorage.getItem("jwt"),
            }
        }

        axios.delete('http://localhost:5000/courses/' + id, config)
            .then(result => console.log(result.data));
        this.setState({
            courses: this.state.courses.filter(element => element._id !== id)
        })
    }

    courseList() {
        return this.state.courses.map(currentCourse => {
            return <Course course={currentCourse} deleteCourse={this.deleteCourse} key={currentCourse._id} />;
        })
    }

    render() {
        return (
            <div className="container">
                <div className="dashboard">
                    <hr />
                    <h1>All Courses</h1>
                    <hr />
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.courseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}