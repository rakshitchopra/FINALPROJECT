import axios from 'axios';

const checkResponse = (response) => {
    if(response.status === 200){
        return response.data;
    }else{
        return {error:"error occured"}
    }
}



//change password
export const update = (data,cb) => {
    console.log(data)
    // data = {...data,data['noOfShareds']:parseInt(data['noOfShareds'])}
    fetch("http://localhost:8085/updateUser",{method:'POST',headers: { "Content-Type": "application/json"}, body:JSON.stringify(data)})
       .then(resp => {if(resp.status === 401){throw resp.status};return resp.json()})
        .then(resp => cb(resp)).catch(err => cb({"message":"invalid Credential"}))
}
//BSE
export const getBse = (callback) => {
    axios.get("http://localhost:8085/viewBseOrders")
          .then(response => callback(checkResponse(response)))
}

//NSE
export const getNse = (callback) => {
    axios.get("http://localhost:8085/viewNseOrders")
          .then(response => callback(checkResponse(response)))
}

//USER NSE
export const getNseUserOrder = (data,cb) => {
    fetch("http://localhost:8085/viewNseUserOrder",{method:'POST',headers: { "Content-Type": "application/json"}, body:JSON.stringify(data)})
       .then(resp => {if(resp.status === 401){throw resp.status};return resp.json()})
        .then(resp => cb(resp)).catch(err => cb({"message":"invalid Credential"}))
}

//USER BSE
export const getBseUserOrder = (data,cb) => {
    fetch("http://localhost:8085/viewBseUserOrder",{method:'POST',headers: { "Content-Type": "application/json"}, body:JSON.stringify(data)})
       .then(resp => {if(resp.status === 401){throw resp.status};return resp.json()})
        .then(resp => cb(resp)).catch(err => cb({"message":"invalid Credential"}))
}

//buy
export const buy = (data,cb) => {
    console.log(data)
    // data = {...data,data['noOfShareds']:parseInt(data['noOfShareds'])}
    fetch("http://localhost:8085/buyOrder",{method:'POST',headers: { "Content-Type": "application/json"}, body:JSON.stringify(data)})
       .then(resp => {if(resp.status === 401){throw resp.status};return resp.json()})
        .then(resp => cb(resp)).catch(err => cb({"message":"invalid Credential"}))
}

//sell
export const sell = (data,cb) => {
    console.log(data)
    fetch("http://localhost:8085/sellOrder",{method:'POST',headers: { "Content-Type": "application/json"}, body:JSON.stringify(data)})
       .then(resp => {if(resp.status === 401){throw resp.status};return resp.json()})
        .then(resp => cb(resp)).catch(err => cb({"message":"invalid Credential"}))
}

//login
export const getLogin = (data,cb) => {
    console.log(data)
    fetch("http://localhost:8085/login",{method:'POST',headers: { "Content-Type": "application/json"}, body:JSON.stringify(data)})
       .then(resp => {if(resp.status === 401){throw resp.status};return resp.json()})
        .then(resp => cb(resp)).catch(err => cb({"message":"invalid Credential"}))
}

//register
export const createAdmin = (data,cb) => {
    console.log(data)
    fetch("http://localhost:8085/addUser",{method:'POST',headers: { "Content-Type": "application/json",'Authorization':'Bearer '+localStorage.getItem('token')}, body:JSON.stringify(data)})
       .then(resp => {if(resp.status === 401){throw resp.status};return resp.json()})
        .then(resp => {cb(resp);}).catch(err => cb({"message":"invalid Credential"}))
}


export const getUser = (cb) => {
    fetch("http://localhost:8085/viewNseOrders",{method:'GET',headers: { "Content-Type": "application/json",'Authorization':'Bearer '+localStorage.getItem('token')}})
       .then(resp => {if(resp.status === 401){throw resp};return resp.json()})
        .then(resp => cb(resp)).catch(err => {cb({"message":"invalid Credential"})})
}

