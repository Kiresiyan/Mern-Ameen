import { all } from "redux-saga/effects";
import todoSaga from "./Todo/Saga";

export default function* rootSaga() {
    yield all([todoSaga()]);
}