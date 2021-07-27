import express from 'express'
import cors from 'cors'
import axios from 'axios';
const app = express()

const feeds = () => {
    return {
        method: 'GET',
        url: 'https://api.lunarcrush.com/v2?data=feeds&key=y7ze70q6n18xv9g0jlpjlo',
        headers: {
            'Key': 'y7ze70q6n18xv9g0jlpjlo',
        }
    }
};

app.use(cors())
app.use(express.json())

app.get('/feeds', function (req, res) {

    axios.request(feeds()).then(function (response) {
        let resp = response.data;
        res.json(resp)
    }).catch(function (error) {
        console.error(error);
    })
})

export default app