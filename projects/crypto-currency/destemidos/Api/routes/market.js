import app from './configs_export/app_export.js'
import axios from 'axios';
import { config } from './configs_export/config.js';


app.get('/market', function(req, res){
  
    axios.request(config('market')).then(function (response) {
        let resp = response.data;
        res.json(resp)
        }).catch(function (error) {
            console.error(error);
        })
    })

export default app