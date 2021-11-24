import axios from 'axios';
import React, { Component, useState } from 'react';

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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:5000/users/register', user)
            .then(result => console.log(result.data))
            .catch(error => console.log(error.response));

        window.location = '/';
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
                                        <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                                        <p className="text-white-50 mb-5">Please enter your information!</p>
                                        <form onSubmit={this.onSubmit}>
                                            <div className="row">
                                                <div className="col form-outline form-white mb-4">
                                                    <input required type="text" id="typeFirstNameX" className="form-control form-control-lg" value={this.state.firstName} onChange={this.onChangeFirstName} />
                                                    <label className="form-label" htmlFor="typeFirstNameX">First Name</label>
                                                </div>
                                                <div className="col form-outline form-white mb-4">
                                                    <input required type="text" id="typeLastNameX" className="form-control form-control-lg" value={this.state.lastName} onChange={this.onChangeLastName} />
                                                    <label className="form-label" htmlFor="typeLastNameX">Last Name</label>
                                                </div>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input required type="email" id="typeEmailX" className="form-control form-control-lg" value={this.state.email} onChange={this.onChangeEmail} />
                                                <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input required type="password" id="typePasswordX" className="form-control form-control-lg" value={this.state.password} onChange={this.onChangePassword} />
                                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            </div>

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Register</button>
                                        </form>
                                    </div>

                                    <div>
                                        <p className="small mb-5 pb-lg-2"><a className="text-white-50 fw-bold" href="/login">Already have an account?</a></p>
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