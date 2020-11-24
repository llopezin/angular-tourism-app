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
  removeActivityFromUser,
  removeLanguage,
  addLanguage,
  removeEducation,
  addEducation,
  editEducation,
  editLanguage,
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
  })),

  on(removeActivityFromUser, (state, { activityId }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: {
      ...state.user,
      activitiesEnrolled: state.user.activitiesEnrolled.filter(
        (activityById) => {
          return activityById !== activityId;
        }
      ),
    },
  })),

  on(removeLanguage, (state, { languageId }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: {
      ...state.user,
      languages: state.user.languages.filter((language) => {
        return language.id != languageId;
      }),
    },
  })),

  on(addLanguage, (state, { language }) => {
    language.id = state.user.languages.length + 1;
    return {
      ...state,
      loading: false,
      loaded: false,
      user: {
        ...state.user,
        languages: [...state.user.languages, language],
      },
    };
  }),

  on(editLanguage, (state, { id, editedLanguage }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: {
      ...state.user,
      languages: state.user.languages.map((language) => {
        if (language.id == id) {
          editedLanguage.id = id;
          return editedLanguage;
        } else {
          return language;
        }
      }),
    },
  })),

  on(removeEducation, (state, { educationId }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: {
      ...state.user,
      education: state.user.education.filter((education) => {
        return education.id != educationId;
      }),
    },
  })),

  on(addEducation, (state, { education }) => {
    education.id = state.user.education.length + 1;
    return {
      ...state,
      loading: false,
      loaded: false,
      user: {
        ...state.user,
        education: [...state.user.education, education],
      },
    };
  }),

  on(editEducation, (state, { id, editedEducation }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: {
      ...state.user,
      education: state.user.education.map((education) => {
        if (education.id === id) {
          editedEducation.id = id;
          return editedEducation;
        } else {
          return education;
        }
      }),
    },
  }))
);

export function usersReducer(state, action) {
  return _usersReducer(state, action);
}
