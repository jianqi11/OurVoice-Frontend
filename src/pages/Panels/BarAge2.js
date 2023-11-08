import React, { memo, useEffect, useState } from 'react'
import { Column } from '@ant-design/plots'
import { barChartAnalysisList } from '../../services/board'
import _ from 'lodash'
import { capitalizeFirstLetter } from '../../utils/setCapital'

const BarAge = ({ barAgeType }) => {
    const [data, setData] = useState({})
    const [maxVal, setMaxVal] = useState(0)
    const [showData, setShowData] = useState({})

    const fetchBarChartAnalysisList = async () => {
        const res = await barChartAnalysisList()
        if (res?.data?.code === 200) {
            setData(res?.data?.data || [])
        }
    }
    useEffect(() => {
        fetchBarChartAnalysisList()
    }, [])

    useEffect(() => {
        if (!_.isEmpty(data)) {
            let newData = data?.[barAgeType]
            if (barAgeType === 'ActivityByAge') {
                newData.dataList = newData?.dataList?.sort((a, b) => a.ydata - b.ydata)
            }
            newData.dataList = newData?.dataList?.map(item => ({
                ...item,
                ydata: parseFloat(item.ydata) || 0,
            }))
            newData.dataList?.forEach(item => {
                if (item.ydata > maxVal) setMaxVal(item.ydata)
            })
            if (barAgeType === 'LikeRateByTopic') {
                newData.dataList = newData.dataList.map(item => ({
                    ...item,
                    ydata: parseFloat(item.ydata),
                    ydata2: parseFloat(item.ydata2),
                }))
                const data1 = newData.dataList.map(item => ({
                    ...item,
                    type: 'Like',
                }))
                const data2 = newData.dataList.map(item => ({
                    ...item,
                    ydata: item.ydata2,
                    type: 'UnLike',
                }))
                newData.dataList = [...data1, ...data2]
            }
            setShowData(newData)
        }
    }, [barAgeType, data])

    const config = {
        data: showData?.dataList || [],
        style: { height: 130, width: 280 }, // 设置高度和宽度
        xField: 'xdata',
        yField: 'ydata',
        isGroup: true,
        color: ['#5A86F6', '#57D5A3'],
        ...(barAgeType === 'LikeRateByTopic' ? { seriesField: 'type' } : {}),
        minColumnWidth: 10,
        maxColumnWidth: 10,
        padding: 20,
        label: {
            position: 'top',
            style: {
                // fill: '#000',
                opacity: 0.2,
            },
            formatter: v => (v.ydata === 0 ? '' : v.ydata + '%'),
        },
        xAxis: {
            label: {
                formatter: text => text?.substring(0, Math.min(text.length, 3)),
            },
        },
        yAxis: {
            // max: maxVal + 40,
        },
        meta: {
            xdata: {
                alias: showData?.xtext,
            },
            ydata: {
                alias: showData?.ytext,
            },
        },
    }
    return (
        <>
            <span style={{ color: '#999', fontSize: 12 }}>
                {capitalizeFirstLetter(showData?.xtext || 'Age')} Analytics
            </span>
            <Column {...config} />
        </>
    )
}
export default memo(BarAge)
