const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }));

function createAttribute(attribute){

}

router.post("/", (request, response) => {
    let decoded = request.body
    response.json(decoded)
})

module.exports = router