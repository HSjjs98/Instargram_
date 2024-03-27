import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import * as usersAPI from '../lib/api/users';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';
const [FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE] =
  createRequestActionTypes('user/FETCH_USERS');

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const fetchUsers = createAction(FETCH_USERS);

export const checkSaga = createRequestSaga(CHECK, authAPI.check);
export const fetchSaga = createRequestSaga(FETCH_USERS, usersAPI.fetchUsers);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user'); // localStorage 에서 user 제거하고
  } catch (e) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout); // logout API 호출
    localStorage.removeItem('user'); // localStorage 에서 user 제거
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(FETCH_USERS, fetchSaga);
}

const initialState = {
  user: null,
  checkError: null,
  searchUser: null,
  searchError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
    [FETCH_USERS_SUCCESS]: (state, { payload: searchUser }) => ({
      ...state,
      searchUser,
    }),
    [FETCH_USERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      searchError: error,
    }),
  },
  initialState,
);
