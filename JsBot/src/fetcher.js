const fetch = require('node-fetch');
require('dotenv').config();

function get(url) {
    const response = fetch(url + 'access_token=' + process.env.BLIZZARD_ACCESS_TOKEN)
    .then(res => res.text())
    return response
}

module.exports = {
    get
}