import { createStore, combineReducers } from 'redux';

const initialData = () => {
    return {
        todo: [],
    }
}

const initTodo = (state, action) => {
    return {
        ...state,
        todo: action.payload,
    }
}

const addTodo = (state, action) => {
    let addItem = action.payload;
    let todos = state.todo.slice(0);
    todos.push(addItem);
    return {
        ...state,
        todo: todos,
    }
}

const editTodo = (state, action) => {
    const editItem = action.payload;
    let todos = state.todo.slice(0).map(item => {
        if(item._id === editItem._id) item = editItem;
        return item;
    });
    return {
        ...state,
        todo: todos,
    }
}

const deleteTodo = (state, action) => {
    const deleteId = action.payload;
    let todos = state.todo.slice(0).filter(item => {
        return item._id !== deleteId;
    });
    return {
        ...state,
        todo: todos,
    }
}

const todo = (state = initialData(), action) => {
    switch(action.type) {
        case 'INIT_TODO':
            return initTodo(state, action)
        case 'ADD_TODO':
            return addTodo(state, action)
        case 'EDIT_TODO':
            return editTodo(state, action)
        case 'DELETE_TODO':
            return deleteTodo(state, action)
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    todo,
});

export default createStore(rootReducer);