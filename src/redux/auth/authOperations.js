import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCurUserApi,
  getLoginApi,
  getRegisterApi,
  logoutUserApi,
} from '../../services/authApi';
import { refreshTokenApi } from '../../services/authApi';
import { errorHandler } from 'redux/error/errorHandler';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      await getRegisterApi(userData);
      const loginUserData = await getLoginApi(userData);
      return loginUserData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const loginUserData = await getLoginApi(userData);
      return loginUserData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await logoutUserApi();
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getCurUser = createAsyncThunk(
  'auth/getCurUser',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;
      const curUserData = await getCurUserApi(token);
      return curUserData;
    } catch (error) {
      dispatch(errorHandler({ error, cb: getCurUser }));
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth',
  async (cb, { getState, rejectWithValue, dispatch }) => {
    const { refreshToken } = getState().auth;
    try {
      const data = await refreshTokenApi(refreshToken);
      setTimeout(() => {
        dispatch(cb());
      }, 0);
      return data;
    } catch (error) {
      setTimeout(() => {
        dispatch(logoutUser());
      }, 0);
      return rejectWithValue(error.message);
    }
  }
);
