import request from '../utils/request'

export function community() {
    return request({
        url: '/api/info/community',
        method: 'GET',
    })
}

export function newCommunitys(params) {
    return request({
        url: '/api/info/community/create',
        method: 'POST',
        params,
    })
}

export function deleteCommunitys(params) {
    return request({
        url: 'api/info/community/delete',
        method: 'POST',
        params,
    })
}
