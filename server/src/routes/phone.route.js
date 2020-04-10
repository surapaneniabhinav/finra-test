
const express = require('express'),
    urlSpace = require('../url-space'),
    constants = require('../constants');


const phoneRoutes = function () {
    let phoneRouter = express.Router();

    phoneRouter.route(urlSpace.local.getPhoneNumbers)
    .get((req, res) => {
        let output = {total: 0,data: [], err: "" };

        res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
        if(!req.query.phonenumber){
            output.err = "invalid phone number";
            res.status(500).send(output);
        }
        else {
            let totalCombinations = getCombinations(req.query.phonenumber);
            output.total = totalCombinations.length;
            if(!req.query.page || !req.query.size){
                output.data = totalCombinations;
            }
            else{
                output.data = totalCombinations.slice((parseInt(req.query.page) - 1)*req.query.size, req.query.size*req.query.page);
            }
            res.send(output);
        }
    });

    function getCombinations(phone) {
        let result = [''];
        for(let i = 0; i < phone.length; i++){
            const n = phone[i];
            const letters = constants.digitsMap[n];
            let temp = [];

            if (letters){
                for (let j = 0; j < letters.length; j++) {
                    let letter = letters[j];
                    for (let k = 0; k < result.length; k++) {
                        let combination = result[k];
                        temp.push(combination + letter);
                    }
                }
                result = temp;
            }
            else {
                for (let l = 0; l < result.length; l++) {
                    let combination = result[l];
                    temp.push(combination + n);
                }
                result = temp;
            }
        }
        return result;
    };


    return phoneRouter;
};

module.exports = phoneRoutes;