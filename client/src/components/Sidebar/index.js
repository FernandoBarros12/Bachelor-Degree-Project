import React from 'react'
import {SidebarContainer,
Icon, 
CloseIcon,
SidebarWrapper,
SidebarLink,
SideBtnWrap,
SidebarRoute,
SidebarMenu
} from './SidebarElements'
const Sidebar = ({isOpen,toogle}) => {
    return (
        <div>
            <SidebarContainer isOpen={isOpen} onClick={toogle}>
                <Icon onClick={toogle}>
                    <CloseIcon/>
                </Icon>
                <SidebarWrapper>
                    <SidebarMenu>
                        <SidebarLink to = "/register_measurement"  onClick={toogle}>Subir Medicion</SidebarLink>
                        <SidebarLink to = "/community"  onClick={toogle}>Comunidad</SidebarLink>
                        <SidebarLink to = "/measurementsPoints"  onClick={toogle}>Puntos de Medición</SidebarLink>
                        <SidebarLink to = "/more"  onClick={toogle}>Conoce más</SidebarLink>
                    </SidebarMenu>
                </SidebarWrapper>
            </SidebarContainer>
        </div>
    )
}

export default Sidebar
