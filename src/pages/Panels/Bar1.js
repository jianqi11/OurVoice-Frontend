import React, { memo, useEffect, useState } from 'react'
import { Column } from '@ant-design/plots'
import { activityList } from '../../services/board'

const Bar1 = () => {
    const [data, setData] = useState([])
    let maxVal = 0
    const fetchaAtivityList = async () => {
        const res = await activityList()
        if (res?.data?.code === 200) {
            setData(res?.data?.data || [])
            res?.data?.data?.forEach(item => {
                if (item.totalActivity > maxVal) maxVal = item.totalActivity
            })
        }
    }
    useEffect(() => {
        fetchaAtivityList()
    }, [])

    const config = {
        data,
        style: { height: 120 }, // 设置高度和宽度
        xField: 'activityDate',
        yField: 'totalActivity',
        minColumnWidth: 10,
        maxColumnWidth: 10,
        label: {
            position: 'top',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#000',
                opacity: 0.2,
            },
        },
        xAxis: {
            label: {
                formatter: date => new Date(date).getDate(),
            },
        },
        yAxis: {
            max: maxVal + 50,
        },
        meta: {
            activityDate: {
                alias: '类别222',
            },
            totalActivity: {
                alias: '访问量',
            },
        },
    }
    return (
        <>
            <span style={{ color: '#999', fontSize: 12 }}>Visitors Analytics</span>
            <Column {...config} />
        </>
    )
}

export default memo(Bar1)
