const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.post("/", (request, response) => {
    let decoded = request.body
    let test = decoded.myTest

    response.json(test)
    //response.json("response")
})

module.exports = router