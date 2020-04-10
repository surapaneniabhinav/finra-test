const urlSpace = (() => {

    return {
        local: {
            getPhoneNumbers: '/api/phonenumbers'
        },
        headers: {
            contentType: {
                name: 'Content-Type',
                json: 'application/json'
            }
        }
    }
})();

module.exports = urlSpace;