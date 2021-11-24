import axios from 'axios';
import React, { Component, useState } from 'react';
import { UserContext } from "../../App";

export default class CourseList extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
        console.log(this.state.firstName);
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
        console.log(this.state.lastName);
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
        console.log(this.state.email);
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
        console.log(this.state.password);
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:5000/users/login', user)
            .then(result => {
                console.log(result);
                localStorage.setItem("jwt", result.data.token);
                window.location.reload();
            })
            .catch(error => console.log(error.response));

        // window.location = '/';
    }

    render() {
        return (
            <div className="register">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your email and password!</p>

                                        <form  onSubmit={this.onSubmit}> 
                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg" value={this.state.email} onChange={this.onChangeEmail} />
                                                <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="typePasswordX" className="form-control form-control-lg" value={this.state.password} onChange={this.onChangePassword} />
                                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            </div>

                                            <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot your password?</a></p>

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                        </form>
                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}