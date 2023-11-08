import request from '../utils/request'

export function createPostAPI(data) {
    return request({
        url: '/api/post/create',
        method: 'POST',
        data,
    })
}
export function postList(data) {
    return request({
        url: '/api/post/list',
        method: 'POST',
        data,
    })
}
export function postLike(data) {
    return request({
        url: '/api/post/like',
        method: 'POST',
        params: data,
    })
}
export function postUnLike(data) {
    return request({
        url: '/api/post/unlike',
        method: 'POST',
        params: data,
    })
}

export function deletePost(params) {
    return request({
        url: '/api/post/delete',
        method: 'POST',
        params,
    })
}
export function trendingPost() {
    return request({
        url: '/api/post/trending/topics',
        method: 'GET',
    })
}
export function trendingProposals() {
    return request({
        url: '/api/post/trending/proposals',
        method: 'GET',
    })
}
export function complaint(params) {
    return request({
        url: '/api/post/complaint',
        method: 'POST',
        params,
    })
}
export function follow(params) {
    return request({
        url: '/api/post/follow',
        method: 'POST',
        params,
    })
}
export function searchPost(params) {
    return request({
        url: '/api/search',
        method: 'GET',
        params,
    })
}
export function reportedList(data) {
    return request({
        url: '/api/post/reported/list',
        method: 'POST',
        data,
    })
}

export function deletedList(data) {
    return request({
        url: 'api/post/deleted/list',
        method: 'POST',
        data,
    })
}

export function recoverPost(params) {
    return request({
        url: 'api/post/recover',
        method: 'POST',
        params,
    })
}
export function historyPost(data) {
    return request({
        url: '/api/post/history/list',
        method: 'POST',
        data,
    })
}
