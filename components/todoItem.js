import React from 'react';
import TodoDelete from '../components/todoDelete';
import TodoLike from '../components/todoLike';

function getDateValue(sdate) {
    const odate = new Date(sdate)
    var date = odate.getDate();
    var month = odate.getMonth() + 1;
    const year = odate.getFullYear();
    const day = odate.getDay();
    const days = [
        'Sun', 
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]
    const sday = days[day];
    month = (month < 10)?'0'+month:month;
    date = (date < 10)?'0'+date:date;
    const strdate = [year, month, date].join('/');
    return (strdate + ' ' + sday);
}

export default function TodoItem(props) {
    const item = props.item;
    const sdate = getDateValue(item.date);
    return (
        <>
        <div className="todo-item">
            
            <TodoDelete
                onClick={props.onDelete} />
            
            <div className="todo-date">
                <span>{ sdate }</span>
            </div>

            <div className="todo-contents">
                <span>{ item.name }</span>
            </div>
            
            <TodoLike 
                state={item.state}
                onClick={props.onLike} />

        </div>
        <style jsx>
        {`
            .todo-item {
                background-color: white;
                position: relative;
                border-radius: 4px;
                overflow: hidden;
                box-shadow: 1px 1px 3px rgba(80,80,80,0.5);
            }
            .todo-date {
                font-family: arial;
                position: absolute;
                left: 0px;
                top: 0px;
                padding: 5px 0px 0px 8px;
                font-size: 0.7em;
                color: #bbb;
                z-index: 2;
            }
            .todo-contents {
                background-color: transparent;
                position: absolute;
                left: 0px;
                top: 0px;
                width: 100%;
                height: 100%;
                z-index: 1;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            .todo-contents span {
                font-family: Arial, Verdana, Helvetica, sans-serif;
                font-size: 0.8em;
                line-height: 140%;
                text-align: center;
                color: black;
                padding: 10px;
            }
        `}
        </style>
        </>
    )
}