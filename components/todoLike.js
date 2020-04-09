import React from 'react';
export default function TodoLike(props) {
    const sheart = (props.state > 0)?'/heart_selected.svg':'/heart.svg';
    return (
        <>
        <div className="todo-like" onClick={props.onClick} ><img src={sheart} /></div>
        <style jsx>
            {`
            .todo-like {
                position: absolute;
                left: 5px;
                bottom: 5px;
                width: 16px;
                height: 16px;
                z-index: 2;
                cursor: pointer;
            }
            .todo-like img {
                width: 100%;
                height: 100%;
            }
            `}
        </style>
        </>
    )
}