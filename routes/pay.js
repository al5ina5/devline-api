const express = require('express')
const router = express.Router()
const db = require('../lib/db')
const { check, validationResult } = require('express-validator')
const stripe = require('stripe')(
    'sk_test_51Gy5KMFHQBpXr1Do4u7npDsc9xkO1RykcadFh5LbKty01EhnYzPe9hmQpscFVj2GC3bfeakoemVjjZ1TvxS5ndR800T5mJCYOt'
)

/* ----------------------------- Pay a posting ---------------------------- */
//* @route   POST /api/pay
//* @desc    Create a new job posing
//* @access  PUBLIC

router.post('/', async (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors })
    // }
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'setup',
            success_url: `http://localhost:3000/checkout/complete?session_id=${req.query.uid}`,
            cancel_url: `http://localhost:3000/`
        })

        return res.status(200).json(session)
    } catch (err) {
        console.error(err)
        return res.status(500).send('Server Error')
    }
})

module.exports = router
