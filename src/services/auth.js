import request from '../utils/request'

export function register(data) {
    return request({
        url: '/api/register',
        method: 'POST',
        data,
    })
}
export function login(data) {
    return request({
        url: '/api/login',
        method: 'POST',
        params: data,
    })
}
export function resetPassword(data) {
    return request({
        url: '/api/resetPassword',
        method: 'POST',
        params: data,
    })
}
export function sendVerificationEmail(data) {
    return request({
        url: '/api/sendVerificationEmail',
        method: 'POST',
        params: data,
    })
}
export function getUserBasic() {
    return request({
        url: '/api/user/basic',
        method: 'GET',
    })
}
export function getUserDetails(params) {
    return request({
        url: '/api/user/details',
        method: 'GET',
        params,
    })
}
export function updateDetail(data) {
    return request({
        url: '/api/user/update',
        method: 'POST',
        data,
    })
}
export function follow(params) {
    return request({
        url: '/api/user/follow',
        method: 'POST',
        params,
    })
}

export function getUserList() {
    return request({
        url: '/api/user/list',
        method: 'GET',
    })
}

export function oAuthLogin(data) {
    return request({
        url: '/api/oAuthLogin',
        method: 'POST',
        data,
    })
}
