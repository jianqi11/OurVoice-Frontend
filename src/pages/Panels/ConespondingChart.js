import React, { memo, useEffect, useState } from 'react'
import { Bar } from '@ant-design/plots'
import { likeRatio } from '../../services/board'

const ConespondingChart = ({ topic }) => {
    const [data, setData] = useState([])
    const fetchaLikeRatio = async () => {
        const res = await likeRatio({ topic })
        if (res?.data?.code === 200) {
            const resData = res?.data?.data || []
            const transformedData = resData.flatMap(item => {
                const likeData = {
                    likeNum: item.likeNum,
                    titleGroup: item.titleGroup,
                    value: parseFloat(item.likeRate),
                    type: 'Like',
                }
                const unlikeData = {
                    likeNum: item.unlikeNum,
                    titleGroup: item.titleGroup,
                    value: parseFloat(item.unlikeRate),
                    type: 'Unlike',
                }
                return [unlikeData, likeData]
            })
            setData(transformedData || [])
        }
    }
    useEffect(() => {
        fetchaLikeRatio()
        setData([])
    }, [topic])

    const config = {
        data: data.reverse(),
        isStack: true,
        xField: 'value',
        yField: 'titleGroup',
        seriesField: 'type',
        color: ['#5A86F6', '#57D5A3'],
        style: { height: 300 }, // 设置高度和宽度

        tooltip: {
            customContent: (title, items) => {
                // title 是标题，items 是数据项的数组
                // 在这里自定义 tooltip 的内容
                // 返回你想要显示的 tooltip 内容
                return `<div style="padding: 8px;">${title}</div>
                      <ul style="list-style: none; padding: 10px; margin: 0;">
                        ${items
                            .map(item => `<li>${item.data.type}: ${item.data.likeNum}</li>`)
                            .join('')}
                      </ul>`
            },
        },
        label: {
            formatter: v => (v.value === 0 ? '' : v.value + '%'),
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'left', 'middle', 'right'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
    }
    return (
        <>
            <span style={{ color: '#999', fontSize: 12, position: 'absolute', top: 0 }}>
                Conesponding proposals
            </span>
            <Bar {...config} />
        </>
    )
}

export default memo(ConespondingChart)
