import axios from 'axios'

const service = axios.get('/api/trainingData.json').then(res => {
    // console.log(JSON.stringify(res.data));
    const data = eval('('+res.data+')');
    console.log(data)
}).catch(err => {
    console.log(err);
})
export {
    service as axios
}