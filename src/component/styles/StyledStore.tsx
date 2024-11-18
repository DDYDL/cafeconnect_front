import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button, ButtonGroup, IconButton, Input, Select } from "@material-tailwind/react";

interface Container {
    borderLeft:string;
    textAlign:string;
    bgColor:string;
    width:string;
    margin:string;
    marginLeft:string;
    marginTop:string;
    marginBottom:string;
    fontSize:string;
    float:string;
    height:string;
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

export const SearchDiv = styled.div<Container>`
    width:${(props) => props.width ? props.width : "400px"};
    margin:${(props) => props.margin ? props.margin : "0 auto"};
    margin-bottom:${(props) => props.marginBottom ? props.marginBottom : "20px"};
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
    width:${(props) => props.width ? props.width : "800px"};
    height:40px;
    margin-top:40px;
    margin-bottom:7px;
    position:relative;
    text-align:${(props) => props.textAlign ? props.textAlign :"center"};
    float:${(props) => props.float ? props.float : "left"};
`;

export const ButtonInnerDiv = styled.div<Container>`
    float:left;
    margin-right:140px;
`;

export const SelectStyle = styled(Select)`
    display:inline-block;
`;

export const SearchButtonDiv = styled.div<Container>`
    margin-top:40px;
    text-align:${(props) => props.textAlign ? props.textAlign : "center"};
`;

export const ButtonStyle = styled(Button)<Container>`
    display:inline-block;
    width:${(props) => props.width ? props.width : "100px"};
    height:30px;
    padding-top:7px;
    border-radius:3px;
    padding:0px;
    background-color:${(props) => props.bgColor ? props.bgColor : "rgba(84, 71, 63, 1)"};
`;

export const TableList = styled.table<Container>`
    width:${(props) => props.width ? props.width : "100%"};
    text-align:${(props) => props.textAlign ? props.textAlign : "center"};
    margin-top:8px;
    margin-bottom:20px;

    table-layout:fixed;
`;

export const TableListThead = styled.thead`
    height:45px;
    border-top:1px solid rgba(109, 109, 109, 1);
    border-bottom:1px solid rgba(109, 109, 109, 1);
    text-align:center;
`;

export const TableTextTh = styled.th<Container>`
    width:${(props) => props.width ? props.width : "100px"};
    font-size:16px;
    font-weight:bold;
    padding-left:20px;
    padding-right:0px;
    vertical-align:middle;
`;

export const TableTextTd = styled.td`
    height:60px;
    font-size:14px;
    padding-right:20px;
    padding-right:0px;
    vertical-align:middle;
`;

export const TableTextTr = styled.tr<Container>`
    width:${(props) => props.width ? props.width : "100px"};
    background-color:${(props) => props.bgColor ? props.bgColor : ""};
    height:${(props) => props.height ? props.height : "45px"};
    max-height:45px;
    border-bottom:1px solid rgba(234, 234, 234, 1);
`;

export const CategoryButtonGroupDiv = styled.div`
    text-align:center;
`;

export const PageButtonGroupDiv = styled.div`
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
    margin-top:${(props) => props.marginTop ? props.marginTop : "0px"};
    height:40px;
    border:1px solid rgba(234, 234, 234, 1);
    border-radius:5px;
`;

export const TextareaStyle = styled.textarea`
    margin-top:10px;
    margin-bottom:5px;
    border:1px solid rgba(234, 234, 234, 1);
    border-radius:5px;
`;

export const LoginAlign = styled.div`
    width:100%;
    display: flex;
    justify-content: center;
`;

export const LoginAlignLeft = styled.div<Container>`
    width:100%;
    float:left;
    font-size:${(props) => props.fontSize ? props.fontSize : "16px"};
    text-align:${(props) => props.textAlign ? props.textAlign : "center"};
    margin-top:${(props) => props.marginTop ? props.marginTop : "45px"};
    margin-bottom:15px;
`;

export const HrStyle = styled.hr`
    float:left;
    width:178px;
    margin-top:7px;
    border:1px solid rgba(234, 234, 234, 1);
`;

export const SwitchText = styled(Link)`
    margin-left:80px;
    margin-right:80px;
`;

export const SwitchButtoninput = styled.input`
    display:none;
`;

export const SwitchButton = styled.label`
    display:block;
    position:relative;
    top:70px;
    width:400px;
    height:5px;
    background:#d3d3d3;
    border-radius:60px;
    transition:background 0.4s;

    &::after {
        content: "";
        position: absolute;
        left:0;
        top:0;
        width: 200px;
        height: 5px;
        border-radius:10px;
        background-color: rgba(38, 38, 38, 1);
        transform: translateY(-0%);
        box-shadow: 1px 3px 4px rgba(0,0,0,0.1);
        transition: all 0.4s;
    }

    &::before {
        content: "";
        font-size: 24px;
        font-family: Arial, Helvetica, sans-serif;
        position: absolute;
        left:0;
        top:0;
        transform: translateY(-50%);
        transition: all 0.4s;
    }

    ${SwitchButtoninput}:checked + &{
        background:#d3d3d3;
    }

    ${SwitchButtoninput}:checked + &::after{
        left:200px;
    }

    ${SwitchButtoninput}:checked + &::before{
        content: "";
        color: #fff;
        left: 15px;
    }
`;

export const ImageSize = styled.img`
    width:60px;
    height:60px;
    float:left;
    margin-right:10px;
    vertical-align:middle;
`;

export const SpanSizeDiv = styled.div`
    width:190px;
    height:45px;
    text-align:left;
    margin-top:18px;
    overflow:hidden;
    white-space:nowrap;
`;

export const SpanSize = styled.span`
    overflow:hidden;
    white-space:nowrap;
`;

export const InputStyleSearch = styled(Input)`
    margin-bottom:10px;
    border-radius:5px;
    background-color:rgb(255, 255, 255);
    height:40px;
`;