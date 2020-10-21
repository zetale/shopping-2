import axios from "axios";
axios.defaults.withCredentials = true;
// const list_URL = (process.env.NODE_ENV !== 'development')? '/list': '//localhost:3000/list';
const api = `https://ztl2svc.appspot.com/api`;
// const api = 'http://10.0.0.12:8080/api'

function login(id_token) {
  return axios
    .post(`${api}/login`, { id_token })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.error("login error: " + error);
    });
}

function loadProfile() {
  return axios.get(`${api}/profile`).then(res => {
    return res.data;
  });
}

function loadLists() {
  return axios
    .get(`${api}/lists`, { params: { parentId: null } })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.error("list failed: " + error);
      return error.response;
    });
}

function setProfile(profile) {
  return axios.put(`${api}/profile`, profile)
  .then(res => {
    return res;
  });
}

function addUser(user) {
  return axios.post(`${api}/user`, user)
  .then(res => {
    return res;
  });
}

function deleteUser(url) {
  return axios.delete(`${api}/user/${url}`)
  .then(res => {
    return res;
  });
}

function logout() {
  const loginResponse = axios.post(`${api}/logout`);
  const auth2 = gapi.auth2;
  if (!auth2) {
    gapi.load("auth2", function() {
      gapi.auth2.init();
    });
  }
  auth2.getAuthInstance().signOut();
  return loginResponse;
}

export default {
  login,
  loadProfile,
  loadLists,
  setProfile,
  addUser,
  deleteUser,
  logout
};
