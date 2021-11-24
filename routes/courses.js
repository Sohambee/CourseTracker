const router = require('express').Router();
let Course = require('../models/course.model');
const requireLogin = require('../middleware/requireLogin')

router.route('/').get(requireLogin, (req, res) => {
    //Fetch all courses from database
    Course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post(requireLogin, (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const courseCode = req.body.code;

    const newCourse = new Course({
        name,
        description,
        courseCode
    });

    //Add course to database
    newCourse.save()
        .then(() => res.json('Course added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(requireLogin, (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(requireLogin, (req, res) => {
    Course.findByIdAndDelete(req.params.id)
        .then(() => res.json('Course deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(requireLogin, (req, res) => {
    Course.findById(req.params.id)
        .then(course => {
            course.name = req.body.name;
            course.description = req.body.description;
            course.courseCode = req.body.courseCode;

            course.save()
                .then(() => res.json('Course updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;