import request from '../utils/request'

export function getNotice() {
    return request({
        url: '/api/notice/list',
        method: 'POST',
    })
}
