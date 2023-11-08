import React, { useState, useEffect, memo } from 'react'
import { Line } from '@ant-design/plots'
import { feelList } from '../../services/board'

const ChartEmo = () => {
    const [data, sumDate] = useState([])
    const fetchaAtivityList = async () => {
        const res = await feelList()
        if (res?.data?.code === 200) {
            let likes = res?.data?.data?.likes
            let unlikes = res?.data?.data?.unlikes
            likes = likes.map(data => ({ ...data, category: 'Like' }))
            unlikes = unlikes.map(data => ({ ...data, category: 'Unlike' }))
            sumDate([...likes, ...unlikes].sort((a, b) => a.sumDate - b.sumDate) || [])
        }
    }
    useEffect(() => {
        fetchaAtivityList()
    }, [])

    const COLOR_PLATE_10 = [
        '#5B8FF9',
        '#5AD8A6',
        '#5D7092',
        '#F6BD16',
        '#E8684A',
        '#6DC8EC',
        '#9270CA',
        '#FF9D4D',
        '#269A99',
        '#FF99C3',
    ]
    const config = {
        data,
        xField: 'sumDate',
        yField: 'sumNum',
        style: { height: 200, width: 560 },
        seriesField: 'category',
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: v => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
            },
        },
        color: COLOR_PLATE_10,
        point: {
            shape: ({ category }) => {
                return category === 'Gas fuel' ? 'square' : 'circle'
            },
        },
    }

    return <Line {...config} />
}

export default memo(ChartEmo)
