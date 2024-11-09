import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Div = styled.div`
    width:100%;
`;

export const DivLogo = styled.div`
    width:100%;
    height:60px;
    display:inline-block;
    text-align:center;
    vertical-align:bottom;
    margin-top:20px;
    position:absolute;
`;

export const DivSide = styled.div`
    width:200px;
    height:60px;
    display:inline-block;
    text-align:right;
    vertical-align:bottom;
    margin-top:45px;
    right:30px;
    font-size:12px;
    position:absolute;
`;

export const DivMenu = styled.div`
    width:100%;
    height:40px;
    background-color:rgba(255, 255, 255, 0.7);
    font-size: 14px;
    text-align:center;
    margin-top:65px;
    position:absolute;
`;

export const DivIcon = styled.div`
    width:200px;
    height:40px;
    font-size: 14px;
    text-align:right;
    right:30px;
    margin-top:65px;
    position:absolute;
`;

export const Logo = styled.img`
`;

export const Icon = styled.img`
    width:23px;
    height:23px;
`;

export const VerticalLine = styled.div`
    border-left:thin solid rgba(38, 38, 38, 0.7);
    display:inline-block;
    width:1px;
    height:10px;
    margin-right:15px;
`;

export const NavLinkMenu = styled(NavLink)`
    text-decoration:none;
    color:rgba(38, 38, 38, 1);
    position: relative;
    top: 10px;
    margin-right:40px;
`;

export const NavLinkSide = styled(NavLink)`
    text-decoration:none;
    color:rgba(38, 38, 38, 1);
    margin-right:17px;
`;

export const NavLinkIcon = styled(NavLink)`
    text-decoration:none;
    color:rgba(38, 38, 38, 1);
    position: relative;
    text-align:right;
    top: 10px;
    margin-right:25px;
`;