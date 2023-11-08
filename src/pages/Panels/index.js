import React from 'react'
import NavBar from '../Index/NavBar'
import { PanelsWrapper } from './PanelsWrapper'
import SideBar from '../Index/SideBar'
import Panels from './Panels'
import { Box } from '@material-ui/core'
export default function Index() {
    return (
        <Box height="100vh" overflow="scroll">
            <NavBar />
            <PanelsWrapper childrenLeft={<SideBar />} childrenRight={<Panels />} />
        </Box>
    )
}
