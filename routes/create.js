const express =  require('express')
const router = express.Router()
const db = require('../lib/db')
const {check, validationResult} = require('express-validator')

/* ----------------------------- Create a new job posing ---------------------------- */
//* @route   POST /api/create
//* @desc    Create a new job posing
//* @access  PUBLIC

router.post('/create',[
    check('title','Title is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty(),
    check('skillset','Skillset is required').not().isEmpty()
],async(req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors})
    }
    const {title,description,skillset} = req.body
    const job = new db.Job({
        title,
        description,
        skillset,
        channel: {},
        isPaid:false,
    })
    await job.save()
})


module.exports = router