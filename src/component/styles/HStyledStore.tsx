import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button, ButtonGroup, IconButton, Input, Select } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
        padding-bottom:13px;
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
        text-align:${(props) => props.textAlign ? props.textAlign :"center"};
        `;
        
        export const SelectInnerDiv = styled.div`
        width:100px;
        `;
        
        export const ListCntDiv = styled.div<Container>`
        margin-top:40px;
        margin-bottom:7px;
        display:flex;
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
        padding-right:20px;
        vertical-align:middle;
        `;
        
        export const TableTextTd = styled.td`
        width:100px;
        height:60px;
        font-size:14px;
        padding-left:20px;
        padding-right:20px;
        vertical-align:middle;
        text-align:center;
        `;
        
        export const TableTdDiv = styled.div`
        padding-left:50px;
        padding-right:50px;
        justify-content:center;
        `;
        
        export const TableTextTr = styled.tr<Container>`
        width:${(props) => props.width ? props.width : "100px"};
        background-color:${(props) => props.bgColor ? props.bgColor : ""};
        height:${(props) => props.height ? props.height : "45px"};
        max-height:45px;
        border-bottom:1px solid rgba(234, 234, 234, 1);
        `;
        
        export const DateSelectDiv = styled.div`
        display:flex;
        flex-direction:row;
        text-align:center;
        `;
        
        export const PageButtonGroupDiv = styled.div`
        text-align:center;
        `;
        
        export const ButtonGroupStyle = styled(ButtonGroup)`
        `;
        
        export const IconButtonStyle = styled(IconButton)`
        border-color:rgba(234, 234, 234, 1);
        `;
        
        export const TrStyle = styled.tr`
        width:800px;
        height:60px;
        border-bottom:1px solid rgba(234, 234, 234, 1);
        `;
        
        export const BigInputStyle = styled.input<Container>`
        width:${(props) => props.width ? props.width : "630px"};
        margin-top:${(props) => props.marginTop ? props.marginTop : "0px"};
        padding-left:20px;
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

export const CategoryButtonGroupDiv = styled.div`
margin-top:40px;
display:flex;
flex-direction:row-reverse;
text-align:center;
`;

export const ButtonInnerDiv = styled.div<Container>`
margin-right:140px;
width:200px;
`;

export const SearchDiv = styled.div<Container>`
width:200px;
`;

export const TimePickerPeriodWrap =styled.div`
width:300px;
display: flex;
    flex-direction:row;
    justify-content: space-around;
    align-items:center;
    text-align:center;
    box-shadow:none;
    border: none;
    
    .CustomPicker{
        width: 140px;
        height: 40px;
        border-radius: 5px;
        background-color: rgb(255, 255, 255);
        border-color: rgb(234, 234, 234);
        border-style:solid;
        border:1px;
        color: rgb(0, 0, 0);
        font-family: "Noto Sans KR";
        letter-spacing :normal;
        line-height: 24px;
        box-shadow:none;
        
        input {
        padding: 8px 12px 8px 12px;
        text-align: start;
      } 
    }
`;
export const DatePickerPeriodWrap =styled.div`
    width:300px;
    display: flex;
    flex-direction:row;
    justify-content: space-around;
    align-items:center;
    text-align:center;
    box-shadow:none;
    border: none;
    
    .CustomPicker{
        > div > div {
            margin: 0 0 0 0;
            padding: 0 0 0 0;
            }
        > div > div > div {
            display:inline-block;
            margin: 0 0 0 0;
            padding: 0 0 0 0;
        }
        width: 140px;
        height: 40px;
        border-radius: 5px;
        background-color: rgb(255, 255, 255);
        border-color: rgb(234, 234, 234);
        border-style:solid;
        border:1px;
        color: rgb(0, 0, 0);
        font-family: "Noto Sans KR";
        letter-spacing :normal;
        line-height: 24px;
        box-shadow:none;

        svg { display:none; }
        
        button {
            display:flex;
            border-radius: 5px;
            width:25px;
            height:37px;
            background-color: rgb(234, 234, 234);
            }
        input {
        padding: 8px 0 8px 12px;
        margin: 0 0 0 0;
        text-align: start;
        } 
    }
`;
export const DatePickerWrap =styled.div`
width:300px;
text-align:center;
box-shadow:none;
border: none;

.CustomPicker{
    width: 300px;
    height: 40px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
        border-color: rgb(234, 234, 234);
        border-style:solid;
        border:1px;
        color: rgb(0, 0, 0);
        font-family: "Noto Sans KR";
        letter-spacing :normal;
        line-height: 24px;
        box-shadow:none;
        
        div {
            box-shadow:none;
            border: none;
        }
        
        input {
            padding: 8px 12px 8px 12px;
            text-align: start;
        } 
    }
    `;
    
    export const StatusTextFalse =styled.p`
    color:red;
    font-weight:bold;
    `;
    export const StatusTextTrue =styled.p`
    color: lightgray;
    `;
    export const SaveButtonDiv =styled.div`
    display:flex;
    justify-content: center;
    margin-top:30px;
    `;
    
    export const TableInfo = styled.table`
    text-align:left;
    width:1000px;
    margin-top:80px;
    `;
    export const BigInputWrap =styled.div`
        display:flex;
        align-items: flex-start;
        text-align: left;
    `;

    export const Textarea = styled.textarea`
  width:1000px;
  height: 180px;
  font-size: 14px;
  border-radius: 8px;
  padding-top: 10px;
  padding-left: 10px;

  border: 1px solid #ccc9; /* 90% 불투명한 연한 회색 */
`;

export const Required = styled.p`
float:right;
color: red;
`;

export const SearchIcon = styled(MagnifyingGlassIcon)`
    &:hover {
      cursor:pointer;
    }

`;