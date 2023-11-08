import React, { memo, useEffect, useState } from 'react'
import { Column } from '@ant-design/plots'
import { barChartAnalysisList } from '../../services/board'
import _ from 'lodash'
import { capitalizeFirstLetter } from '../../utils/setCapital'
// 22
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
                ydata: Number(item.ydata) || 0,
            }))
            newData.dataList?.forEach(item => {
                if (item.ydata > maxVal) setMaxVal(item.ydata)
            })
            setShowData(newData)
        }
    }, [barAgeType, data])
    //
    const config = {
        data: showData?.dataList || [],
        style: { height: 130, width: 280 }, // 设置高度和宽度
        xField: 'xdata',
        yField: 'ydata',
        minColumnWidth: 10,
        maxColumnWidth: 10,
        padding: 20,
        label: {
            position: 'top',
            style: {
                fill: '#000',
                opacity: 0.2,
            },
        },
        xAxis: {
            formatter: () => 'aaa',
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
