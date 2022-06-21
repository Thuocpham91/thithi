import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    loginViettekll,
    getviettell,
    getAll,
    getLogin,
    changePass,
    changePassAdmin,
    getCitiDistrict,
    addUser,
    updateUser,
    getNotification,
    getCountNotification,
    checkLoginZalo,
};

function login(form) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, form)
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}


function loginViettekll(username, password) {
    return fetchWrapper.posth(`${baseUrl}/loginViettel`, { username, password })
        .then(user => {
      
            return user;
        });
}

function getviettell(username, password) {
    return fetchWrapper.getVT(`${baseUrl}/loginViettel`, { username, password })
        .then(user => {
      
            return user;
        });
}

function getLogin() {
    return fetchWrapper.get(`${baseUrl}/authenticate`)
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            // userSubject.next(user);
            return user;
        });
}


function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

function getAll() {
    return fetchWrapper.get(`${baseUrl}/user`);
}


function changePass(data){
    return fetchWrapper.post(`${baseUrl}/chagepass`,data);
}


function changePassAdmin(data){
    return fetchWrapper.post(`${baseUrl}/chagepassAdmin`,data);
}

function getCitiDistrict(data){
    return fetchWrapper.post(`${baseUrl}/getCitiDistrict`,data);
}

function addUser(data){
    return fetchWrapper.post(`${baseUrl}/user`,data);
}

function  updateUser(data){
    return fetchWrapper.post(`${baseUrl}/updateUser`,data);
}

function  getNotification(data){
    return fetchWrapper.get(`${baseUrl}/notification`,data);
}

function  getCountNotification(data){
    return fetchWrapper.get(`${baseUrl}/getcountNotification`,data);
}

function  checkLoginZalo(data){
    return fetchWrapper.post(`${baseUrl}/loginzalo`,data);
}