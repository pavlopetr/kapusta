import axios from 'axios';

const savedToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const getRegisterApi = async userData => {
  const response = await axios.post('/auth/register', userData);
  return response.data;
};

export const getLoginApi = async userData => {
  const response = await axios.post('/auth/login', userData);
  savedToken.set(response.data.accessToken);
  return response.data;
};

export const getCurUserApi = async (token, sid) => {
  savedToken.set(token);
  const response = await axios.get('/user', {
    token,
    sid,
  });
  return response.data;
};

export const logoutUserApi = async () => {
  await axios.post('/auth/logout');
  savedToken.unset();
};

export const refreshTokenApi = ({ sid, refreshToken }) => {
  savedToken.set(refreshToken);
  return axios.post('/auth/refresh', { sid: sid }).then(({ data }) => ({
    token: data.newAccessToken,
    refreshToken: data.newRefreshToken,
    sid: data.newSid,
  }));
};

export const googleAuth = async () => await axios.get('/auth/google');
