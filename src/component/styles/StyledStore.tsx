import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button, ButtonGroup, IconButton } from "@material-tailwind/react";

interface Container {
    borderLeft:string;
    textAlign:string;
    bgColor:string;
    width:string;
    marginLeft:string;
}

export const ContentDiv = styled.div`
    width:1000px;
    margin-left:480px;
    margin-top:580px;
    margin-bottom:80px;
`;

export const ContentListDiv = styled.div<Container>`
    width:${(props) => props.width ? props.width : "1000px"};
    margin-left:${(props) => props.marginLeft ? props.marginLeft : "480px"};
    margin-top:150px;
    margin-bottom:80px;
`;

export const SearchDiv = styled.div`
    width:400px;
    margin:0 auto;
    margin-bottom:20px;
`;

export const ImgDiv = styled.div`
    width:300px;
    height:400px;
    margin-bottom:50px;
`;

export const OneImgAndPDiv = styled.div`
    position:relative;
    width:300px;
    height:400px;
    margin-bottom:50px;
`;

export const ImgStyle = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
    overflow:hidden;

    opacity:1;
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;

    ${OneImgAndPDiv}:hover &{
        opacity: .8;
        filter: brightness(0.3);
    }
`;

export const ImgHoverText = styled.p`
    position:absolute;
    margin: 95px 70px;
    font-size: 18px;
    color:white;
    z-index:1;
    user-select:none;
    background: rgb(0, 0, 0, 0);
    opacity:0;
    transition: opacity 0.2s;

    ${OneImgAndPDiv}:hover &{
        opacity:1;
    }
`;

export const MainTitleText = styled.p`
    font-size:24px;
    font-weight:bold;
    margin-top:13px;
    text-align:center;
`;

export const TitleText = styled.p`
    font-size:16px;
    margin-top:13px;
    text-align:center;
`;

export const MenuBarDiv = styled.div`
    text-align:center;
    margin-top:580px;
    margin-bottom:50px;
    background-color:rgba(255, 255, 255, 1.0);
`;

export const MenuBarLinkDiv = styled.div<Container>`
    display:inline-block;
    width:130px;
    font-size:16px;
    padding:10px 20px;
    border-color:rgba(248, 248, 248, 1);
    
    border-left:${(props) => props.borderLeft ? props.borderLeft : "3px solid rgba(248, 248, 248, 1)"};
    `;

export const MenuBarLink = styled(NavLink)`
    font-size:16px;
`;

export const MenuImgDiv = styled.div`
    width:1000px;
    margin:0 auto;
    margin-bottom:80px;
`;

export const ButtonDiv = styled.div<Container>`
    text-align:${(props) => props.textAlign ? props.textAlign : "center"};
`;

export const ButtonStyle = styled(Button)<Container>`
    display:inline-block;
    width:100px;
    height:30px;
    padding-top:7px;
    border-radius:3px;
    background-color:${(props) => props.bgColor ? props.bgColor : "rgba(84, 71, 63, 1)"};
`;

export const TableList = styled.table<Container>`
    width:${(props) => props.width ? props.width : "100%"};
    text-align:${(props) => props.textAlign ? props.textAlign : "center"};
    margin-top:8px;
    margin-bottom:20px;
`;

export const TableListThead = styled.thead`
    height:45px;
    border-top:1px solid rgba(109, 109, 109, 1);
    border-bottom:1px solid rgba(109, 109, 109, 1);
`;

export const TableTextTh = styled.th`
    font-size:16px;
    fint-weight:bold;
`;

export const TableTextTd = styled.td`
    font-size:16px;
    padding-left:20px;
    padding-right:23px;
`;

export const TableTextTr = styled.tr`
    height:45px;
    border-bottom:1px solid rgba(234, 234, 234, 1);
`;

export const ButtonGroupDiv = styled.div`
    text-align:center;
`;

export const ButtonGroupStyle = styled(ButtonGroup)`
    display:inline-block;
`;

export const IconButtonStyle = styled(IconButton)`
    border-color:rgba(234, 234, 234, 1);
`;

export const TrStyle = styled.tr`
    width:800px;
    height:60px;
    border-bottom:1px solid rgba(234, 234, 234, 1);
`;

export const InputStyle = styled.input<Container>`
    width:${(props) => props.width ? props.width : "630px"};
    height:40px;
    border-radius:5px;
`;

export const TextareaStyle = styled.textarea`
    margin-top:10px;
    margin-bottom:5px;
    border-radius:5px;
`;