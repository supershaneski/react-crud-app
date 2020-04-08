import configDB from './config';
import fetch from 'isomorphic-unfetch';

const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const url = `http://${configDB.host}:${configDB.port}/${configDB.route}`;

const getFormatDate = (strDate) => {
    let odate = new Date(strDate);
    let date = odate.getDate();
    let month = odate.getMonth() + 1;
    let year = odate.getFullYear();
    month = (month < 10)?'0'+month:month;
    date = (date < 10)?'0'+date:date;
    let sdate = [year,month,date].join('-');
    return `${sdate} 00:00:00`;
}

async function getData() {
    let response = await fetch(url);
    let result = await response.json();
    return { result };
}

async function addData(data) {
    let response = await fetch(`${url}/add`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
            name: data.name,
            date: getFormatDate(data.date),
            state: 0,
        })
    });
    let result = await response.json();
    return { result };
}

async function editData(data) {
    let response = await fetch(`${url}/${data._id}`, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify({
            ...data,
            state: (data.state > 0)?0:1
        })
    });
    let result = await response.json();
    return { result };
}

async function deleteData(data) {
    let response = await fetch(`${url}/${data._id}`, {
        method: 'DELETE',
        headers: header
    });
    let result = await response.json();
    return { result };
}

export default {
    getData,
    addData,
    editData,
    deleteData,
}