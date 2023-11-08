import request from '../utils/request'

export function activityList() {
    return request({
        url: '/api/board/activityList',
        method: 'GET',
    })
}
export function feelList() {
    return request({
        url: '/api/board/feelList',
        method: 'GET',
    })
}

export function activityNumByToday() {
    return request({
        url: '/api/board/activityNumByToday',
        method: 'GET',
    })
}
export function likeRatio(params) {
    return request({
        url: '/api/board/likeRatio',
        method: 'GET',
        params,
    })
}

export function barChartAnalysisList() {
    return request({
        url: '/api/board/barChartAnalysisList',
        method: 'GET',
    })
}
