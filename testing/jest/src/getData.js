const axios = require('axios');

async function getData(url) {
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        throw new Error("Error al obtener los datos")
    }
}

module.exports = getData;