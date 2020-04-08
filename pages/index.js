import React from 'react';
import { connect }  from 'react-redux';
import TodoAdd from '../components/todoAdd';
import TodoItem from '../components/todoItem';
import Server from '../db/server';

class Index extends React.Component {
    
    constructor() {
        super()
        this.handleAdd = this.handleAdd.bind(this)
        this.handleLike = this.handleLike.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleAdd(item) {
        Server.addData(item).then(data => {
            if(data.result.insertedCount > 0) {
                const insertData = data.result.insertedData[0];
                this.props.addTodo(insertData);
            }
        }, error => console.log(error))
    }

    handleLike(item) {        
        Server.editData(item).then(data => {
            if(data.result.modifiedCount > 0) {
                const editedData = data.result.modifiedData;
                this.props.editTodo(editedData);
            }
        }, error => console.log(error))
    }

    handleDelete(item) {
        Server.deleteData(item).then(data => {
            if(data.result.deletedCount > 0) {
                const deletedId = data.result.deletedData._id;
                this.props.deleteTodo(deletedId);
            }
        }, error => console.log(error))
    }

    render() {
        
        const todos = this.props.todo;
        const todoVisible = (todos.length > 0)?'grid':'none';
        const notodoVisible = (todos.length > 0)?'none':'flex';
        
        return (
            <>
            <main>
                
                <div 
                style={{display: `${todoVisible}`}} 
                className="todo-container">
                    {
                        todos.length > 0 && todos.map((item, index) => {
                            return (
                                <TodoItem
                                    key={index}
                                    item={item}
                                    onDelete={() => this.handleDelete(item)}
                                    onLike={() => this.handleLike(item)} />
                            )
                        })
                    }                    
                </div>
                
                <div 
                style={{display: `${notodoVisible}`}} 
                className="notodo-container">
                    <div className="noitem-message">
                        <span>No Todo Items</span>
                    </div>
                </div>
                
                <TodoAdd onClick={this.handleAdd} />

            </main>
            
            <style jsx>
                {`
                .notodo-container {
                    background-color: transparent;
                    position: relative;
                    height: 100%;                
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    z-index: 1;
                }
                .noitem-message {
                    background-color: #ccc;
                    padding: 10px 30px;
                    border-radius: 30px;
                    color: #999;
                    user-select: none;
                    font-family: arial;
                    font-size: 0.9em;
                }
                main {
                    background-color: transparent;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 100%;
                    height: 100%;
                }
                .todo-container {
                    background-color: transparent;
                    position: relative;
                    margin: 10px;
                    padding: 10px;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, 150px);
                    grid-auto-rows: 150px;
                    grid-gap: 8px 8px;
                    justify-content: center;
                    z-index: 1;
                }
                .todo-add {
                    bakcground: orange;
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 2;
                }
                `}
            </style>
            </>
        )
    }
}

const addTodo = (data) => {
    return {
      type: 'ADD_TODO',
      payload: data
    }
}

const editTodo = (item) => {
    return {
        type: 'EDIT_TODO',
        payload: item
    }
}

const deleteTodo = (id) => {
    return {
        type: 'DELETE_TODO',
        payload: id
    }
}
  
const mapStateToProps = (state) => {
    return {
      ...state.todo
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      addTodo: (data) => {
        dispatch(addTodo(data));
      },
      editTodo: (item) => {
        dispatch(editTodo(item))
      },
      deleteTodo: (id) => {
          dispatch(deleteTodo(id))
      }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Index);
