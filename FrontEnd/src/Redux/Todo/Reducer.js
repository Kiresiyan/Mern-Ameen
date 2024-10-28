import { actions } from "./Actions"

const initialState = {
    todoList: [],
    fetchLoading: false,
    addOrEditLoading: false,
    deleteLoading: false,
}

export default function reducer(state = initialState,action) {
    switch(action.type) {
        case actions.FETCH_TODO_LIST:
            return {
                ...state,
                fetchLoading: true,
            }
        case actions.FETCH_TODO_LIST_SUCCESS:
            return {
                ...state,
                fetchLoading: false,
                todoList: action.payload,
            }
        case actions.FETCH_TODO_LIST_FAILURE:
            return {
                ...state,
                fetchLoading: false,
            }
        case actions.ADD_NEW_TODO:
            return {
                ...state,
                addOrEditLoading: true,
            }
        case actions.ADD_NEW_TODO_SUCCESS:
            return {
                ...state,
                addOrEditLoading: false,
                todoList: [...state.todoList,action.payload],
            }
        case actions.ADD_NEW_TODO_FAILURE:
            return {
                ...state,
                addOrEditLoading: false,
            }
        case actions.DELETE_TODO_SUCCESS:
            return {
                ...state,
                todoList: state.todoList.filter(item => item.id !== action.payload),
            }   
        case actions.DELETE_TODO_FAILURE:
            return {
                ...state,
                deleteLoading: false,
            }  
        case actions.UPDATE_TODO:
            return {
                ...state,
                addOrEditLoading: true,
            }
        case actions.UPDATE_TODO_SUCCESS:
            const updatedItem = action.payload;
            return {
                ...state,
                todoList: state.todoList.map(item => item.id === updatedItem.id ? updatedItem : item),
                addOrEditLoading: false,
            }   
        case actions.UPDATE_TODO_FAILURE:
            return {
                ...state,
                addOrEditLoading: false,
            }   
    default:
        return state;
    }
}