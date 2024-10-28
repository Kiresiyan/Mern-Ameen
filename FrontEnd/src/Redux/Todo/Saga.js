import { actions } from "./Actions";
import { takeEvery } from "redux-saga/effects";
import { getRequest, postRequest, deleteRequest,patchRequest} from "../../helpers/utility";
import { settings } from "../../Settings";
import { call, put,all } from "redux-saga/effects";
import { message } from "antd";




export function* fetchTodoList() {
    try{
        const response = yield call(()=> getRequest(`${settings.REACT_APP_API_URL}todos`));
        yield put({
            type: actions.FETCH_TODO_LIST_SUCCESS,
            payload: response
        });
    }catch(error){
        message.error('Failed to fetch todo list');
       yield put({
        type: actions.FETCH_TODO_LIST_FAILURE,
        payload: error
       });
    }
}

export function* addNewTodo({payload,callBack}) {
    try{
        const response = yield call(()=> postRequest(`${settings.REACT_APP_API_URL}todos/new`,payload));
        yield put({
            type: actions.ADD_NEW_TODO_SUCCESS,
            payload: response
        });
        callBack();
        message.success('New item added successfully');
    }catch(error){
        message.error('Failed to add new item');
       yield put({
        type: actions.ADD_NEW_TODO_FAILURE,
        payload: error
       });
    }

}
export function* deleteTodo(params) {
    try{
        yield call(()=> deleteRequest(`${settings.REACT_APP_API_URL}todos/${params.id}`));
        yield put({
            type: actions.DELETE_TODO_SUCCESS,
            payload: params.id
        });
        message.success('Item deleted successfully');
    }catch(error){
        message.error('Failed to delete item');
       yield put({
        type: actions.DELETE_TODO_FAILURE,
        payload: error
       });
    }
}   
export function* updateTodo({payload,callBack}) {
    try{
        const updatedItem = yield call(()=> patchRequest(`${settings.REACT_APP_API_URL}todos/${payload.id}`,payload));
        yield put({
            type: actions.UPDATE_TODO_SUCCESS,
            payload: updatedItem
        });
        callBack && callBack();
        message.success('Item updated successfully');
    }catch(error){
        message.error('Failed to update item');
       yield put({
        type: actions.UPDATE_TODO_FAILURE
       });
    }
}

export default function* rootSaga() {
    yield all([
         yield takeEvery(actions.FETCH_TODO_LIST,fetchTodoList),
        yield takeEvery(actions.ADD_NEW_TODO,addNewTodo),
        yield takeEvery(actions.DELETE_TODO,deleteTodo),
        yield takeEvery(actions.UPDATE_TODO,updateTodo),
    ])
}