import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../cardCover.png'
import "../css/navbar-fixed-left.css";
import "../css/docs.css";
import "../css/main.css";

const Course = props => (
    <Card style={{ width: '18rem', height: '25rem', margin: '1rem' }}>
        <Card.Img variant="top" src={logo} />
        <Card.Body>
            <Card.Title>{props.course.courseCode} - {props.course.name}</Card.Title>
            <Card.Text>
                {props.course.description}
            </Card.Text>
            <Button style={{ position: 'absolute', bottom: '1rem' }} to={"/edit/" + props.course._id}>Edit</Button> <Button style={{ position: 'absolute', bottom: '1rem', left: '5rem' }} onClick={() => { props.deleteCourse(props.course._id) }}>Delete</Button>
        </Card.Body>
    </Card>
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
            return <div className="col mb-4"><Course course={currentCourse} deleteCourse={this.deleteCourse} key={currentCourse._id} /></div>;
        })
    }

    render() {
        return (
            <div className="container">
                <div className="dashboard">
                    <hr />
                    <h1>Dashboard</h1>
                    <hr />
                </div>
                <div className="row row-cols-4 row-cols-md-5">
                    {this.courseList()}
                </div>
            </div>
        )
    }
}