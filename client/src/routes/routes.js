import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import CourseList from "../components/course-list.component";
import EditCourse from "../components/edit-course.component";
import CreateCourse from "../components/create-course.component.js";
import AllCourses from "../components/all-course.component";
import Login from "../components/auth/login.component";
import Register from "../components/auth/register.component";
import AuthApi from "../utils/AuthApi";

function Paths() {
    return (
        <Routes>
            <RouteProtected path="/" element={<CourseList />} />
            <RouteRegistration path="/login" element={<Login />} />
            <RouteRegistration path="/register" element={<Register />} />
            <RouteProtected path="/create" element={<CreateCourse />} />
            <RouteProtected path="/edit/:id" element={<EditCourse />} />
            <RouteProtected path="/allCourses" element={<AllCourses />} />
        </Routes>
    );
}

const RouteRegistration = ({ component: Component, ...rest }) => {
    const authApi = React.useContext(AuthApi);
    return (
        <Route
            {...rest}
            render={props =>
                !authApi.auth ? <Component {...props} /> : <Navigate to="/" />
            }
        />
    );
};

const RouteProtected = ({ component: Component, ...rest }) => {
    const authApi = React.useContext(AuthApi);
    return (
        <Route
            {...rest}
            render={props =>
                authApi.auth ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    );
};

export default Paths;