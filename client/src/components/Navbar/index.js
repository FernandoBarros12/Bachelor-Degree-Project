import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn
} from './NavbarElements'
import LogInButton from '../loginButton/index';
import LogOutButton from '../logoutButton/index';
import {useAuth0} from "@auth0/auth0-react";


const Navbar = ({ toogle }) => {
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, []);

    const toogleHome = () => {
        scroll.scrollToTop();
    }
    const { isAuthenticated } = useAuth0();

    return (
        <>
            <IconContext.Provider value={{ colo: '#fff' }}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to="/" onClick={toogleHome}>ESPOL</NavLogo>
                        <MobileIcon onClick={toogle}>
                            <FaBars />
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinks to="/register_measurement"
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    offset={-80}
                                    activeClass="active"
                                >
                                    Subir Medicion
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/community">Comunidad</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/measurementsPoints">Puntos de medición</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/more">Conoce más</NavLinks>
                            </NavItem>
                        </NavMenu>
                        <NavBtn>
                            {isAuthenticated ? (
                                <>
                                    <LogOutButton />
                                </>
                            ) : (
                                <LogInButton />
                            )}
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
