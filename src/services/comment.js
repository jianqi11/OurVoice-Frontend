import request from '../utils/request'

export function addComment(data) {
    return request({
        url: '/api/comment/create',
        method: 'POST',
        data,
    })
}
export function commentLike(params) {
    return request({
        url: '/api/comment/like',
        method: 'POST',
        params,
    })
}
export function commentList(params) {
    return request({
        url: '/api/comment/list',
        method: 'POST',
        params,
        data: params,
    })
}
