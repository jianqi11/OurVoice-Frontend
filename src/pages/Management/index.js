import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../Index/NavBar'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Tab,
    TablePagination,
    Tabs,
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { deletePost, deletedList, recoverPost, reportedList } from '../../services/post'
import moment from 'moment/moment'
import { message } from 'antd'
import COLORS from '../../theme/colors'
import MyContext from '../../redux/MyContext'
import { changeSideMenu } from '../../redux/actions/global'

export default function index() {
    const [value, setValue] = React.useState(1)
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [open, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState()
    const {
        state: {
            global: {
                userInfo: { authority },
            },
        },
        dispatch,
    } = useContext(MyContext)

    const [params, setParams] = useState({
        current: 1,
        size: 10,
        total: 0,
    })
    const [params2, setParams2] = useState({
        current: 1,
        size: 10,
        total: 0,
    })
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 1 },
        {
            field: 'description',

            headerName: 'Description',
            flex: 1,
        },
        { field: 'likes', headerName: 'Like', flex: 1 },
        { field: 'unLikes', headerName: 'Unlike', flex: 1 },
        { field: 'userTelegramName', headerName: 'CreateBy', flex: 1 },
        {
            field: 'createTime',
            headerName: 'CreateTime',
            flex: 1,
            renderCell: record => {
                const { value } = record
                return <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
        },
        {
            field: 'operation',

            headerName: 'Operation',
            width: 160,
            renderCell: record => {
                const { row } = record
                return (
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpen(true)
                            setDeleteId(row.id)
                        }}
                        size="small"
                        color="secondary">
                        delete
                    </Button>
                )
            },
        },
    ]

    const columns2 = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 1 },
        {
            field: 'description',

            headerName: 'Description',
            flex: 1,
        },
        { field: 'likes', headerName: 'Like', flex: 1 },
        { field: 'unLikes', headerName: 'Unlike', flex: 1 },
        { field: 'userTelegramName', headerName: 'CreateBy', flex: 1 },
        {
            field: 'createTime',
            headerName: 'CreateTime',
            flex: 1,
            renderCell: record => {
                const { value } = record
                return <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
        },
        {
            field: 'operation',

            headerName: 'Operation',
            width: 160,
            renderCell: record => {
                const { row } = record
                return (
                    <Button
                        variant="contained"
                        onClick={() => handleRecover(row.id)}
                        size="small"
                        color="primary">
                        recover
                    </Button>
                )
            },
        },
    ]

    const handleClose = () => {
        setOpen(false)
    }
    const fetchReportedList = async () => {
        setLoading(true)
        const res = await reportedList(params)
        setLoading(false)
        if (res?.data?.code === 200) {
            setParams({ ...params, total: res?.data?.data?.total })
            setData(res?.data?.data?.records || [])
        }
    }

    const fetchDeletedList = async () => {
        setLoading2(true)
        const res = await deletedList(params2)
        setLoading2(false)
        if (res?.data?.code === 200) {
            setParams2({ ...params2, total: res?.data?.data?.total })
            setData2(res?.data?.data?.records || [])
        }
    }

    useEffect(() => {
        fetchReportedList()
    }, [params.current, value])

    useEffect(() => {
        fetchDeletedList()
    }, [params2.current, value])

    const onPageChange = (_, current) => {
        const newParams = {
            ...params,
            current: current + 1,
        }
        setParams(newParams)
    }
    const onPageChange2 = (_, current) => {
        const newParams = {
            ...params2,
            current: current + 1,
        }
        setParams2(newParams)
    }
    const handleDeletePost = async () => {
        handleClose()
        setLoading(true)
        const res = await deletePost({ id: deleteId })
        setLoading(false)

        if (res?.data?.code === 200) {
            fetchReportedList()
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
        handleClose()
    }
    const handleRecover = async id => {
        setLoading(true)
        const res = await recoverPost({ id })
        setLoading(false)
        if (res?.data?.code === 200) {
            fetchDeletedList()
            message.success('Success.')
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }
    // 修改p
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <div style={{ height: '85vh' }}>
            <NavBar />
            <Tabs indicatorColor="primary" value={value} onChange={handleChange}>
                <Tab label="Reported" value={1} />
                {authority !== 'ov_moderation' && <Tab label="Deleted" value={2} />}
            </Tabs>
            <Button
                variant="contained"
                onClick={() => {
                    dispatch(changeSideMenu({ activeCommunity: 'ALL' }))
                    history.back()
                }}
                style={{ position: 'absolute', top: 70, right: 80, backgroundColor: '#eee' }}>
                Back
            </Button>
            {value === 1 && (
                <DataGrid
                    columns={columns}
                    rows={data || []}
                    loading={loading}
                    style={{ backgroundColor: '#fff' }}
                    rowsPerPageOptions={[2, 5, 10, 50]}
                    components={{
                        Pagination: () => (
                            <TablePagination
                                component="div"
                                count={params.total}
                                page={params.current - 1}
                                rowsPerPage={params.size}
                                labelRowsPerPage="每页行数"
                                onPageChange={onPageChange}
                                style={{ color: '#666666' }}
                            />
                        ),
                    }}
                />
            )}
            {value === 2 && (
                <DataGrid
                    columns={columns2}
                    rows={data2 || []}
                    loading={loading2}
                    style={{ backgroundColor: '#fff' }}
                    rowsPerPageOptions={[2, 5, 10, 50]}
                    components={{
                        Pagination: () => (
                            <TablePagination
                                component="div"
                                count={params2.total}
                                page={params2.current - 1}
                                rowsPerPage={params2.size}
                                labelRowsPerPage="每页行数"
                                onPageChange={onPageChange2}
                                style={{ color: '#666666' }}
                            />
                        ),
                    }}
                />
            )}
            <Dialog
                maxWidth="md"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle style={{ width: 400, marginTop: 20, marginLeft: 20 }}>
                    Are you sure about the deletion?
                </DialogTitle>

                <DialogActions style={{ marginBottom: 20 }}>
                    <Button
                        onClick={handleClose}
                        color="secondary"
                        style={{
                            fontSize: '12px',
                            borderRadius: '32px',
                            marginRight: 5,
                            height: '28px',
                            lineHeight: '18px',
                            minWidth: '80px',
                            marginLeft: 5,
                            color: '#F7D066',
                            fontWeight: 700,
                            border: `1px #F7D066 solid`,
                        }}
                        sx={{
                            ':hover': {
                                color: '#FFF',
                                backgroundColor: '#F7D066',
                            },
                        }}
                        variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeletePost}
                        color="secondary"
                        style={{
                            fontSize: '12px',
                            borderRadius: '32px',
                            marginRight: 5,
                            height: '28px',
                            fontWeight: 400,
                            lineHeight: '18px',
                            minWidth: '80px',
                            border: `1px ${COLORS.accentColor} solid`,
                        }}
                        sx={{
                            ':hover': {
                                backgroundColor: COLORS.accentColor,
                            },
                        }}
                        variant="outlined"
                        autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
