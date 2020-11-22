import { createReducer, on } from '@ngrx/store';
import User from 'src/app/shared/models/user.model';
import {
  getAllUsers,
  getAllUsersError,
  getAllUsersSuccess,
  editUser,
  createUser,
  signUserIn,
  logUserOut,
} from '../actions';

export interface UsersState {
  users: User[];
  user?: User;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  loaded: false,
  error: null,
};

const _usersReducer = createReducer(
  initialState,

  on(getAllUsers, (state) => ({ ...state, loading: true })),

  on(getAllUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [...users],
  })),

  on(getAllUsersError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),

  on(createUser, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: user,
    users: [...state.users, user],
  })),

  on(editUser, (state, { id, editedUser }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: editedUser,
    users: state.users.map((user) => {
      if (user.id === id) {
        return editedUser;
      } else {
        return user;
      }
    }),
  })),

  on(signUserIn, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: user,
  })),

  on(logUserOut, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    user: undefined,
  }))
);

export function usersReducer(state, action) {
  return _usersReducer(state, action);
}
