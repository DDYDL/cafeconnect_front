import styled from 'styled-components';

import { Select, Checkbox } from "@material-tailwind/react";

interface Container {
    fontColor:string;
    fontWeight:string;
    width:string;
    height:string;
    marginTop:string;
}

export const SelectDiv = styled.div`
    width:800px;
    height:40px;
    margin-top:20px;
    margin-bottom:10px;
`;

export const SelectInnerDiv = styled.div`
    width:200px;
    height:40px;
    float:right;
`;

export const SelectBox = styled(Select)`
    width:200px;
    height:40px;
    border-radius:5px;
    border-color:rgba(234, 234, 234, 1);
    padding-bottom:3px;
`;

export const TableInfo = styled.table`
    float:left;
    width:500px;
    margin-top:60px;
`;

export const TableInfoTr = styled.tr`
    height:45px;
`;

export const TableInfoTh = styled.th`
    font-size:16px;
    font-weight:bold;
    padding-left:20px;
    padding-right:0px;
    vertical-align:middle;
`;

export const TableTitleSpan = styled.span`
    font-size:16px;
    font-weight:bold;
`;
export const TableInfoTd = styled.td`
    font-size:14px;
    padding-left:20px;
    padding-right:0px;
    padding-bottom:12px;
    vertical-align:middle;
`;

export const AlarmDiv = styled.div<Container>`
    padding:23px 30px;
    width:${(props) => props.width ? props.width : "800px"};
    height:${(props) => props.height ? props.height :"90px"};
    background-color:rgba(255, 255, 255, 1);
    border:1px solid rgba(234, 234, 234, 1);
    border-radius:7px;
    margin-bottom:10px;
    margin-top:${(props) => props.marginTop ? props.marginTop : "0px"};
`;

export const AlarmSpan = styled.span<Container>`
    margin-right:10px;
    font-size:16px;
    font-weight:${(props) => props.fontWeight ? props.fontWeight : "bold"};
    color:${(props) => props.fontColor ? props.fontColor : "rgba(38, 38, 38, 1)"};
    padding-bottom:10px;
`;

export const AlarmSpanContent = styled.span`
    margin-right:10px;
    font-size:14px;
`;

export const AlarmInnerDiv = styled.div`
    width:700px;
    padding-bottom:11px;
`;

export const AlarmCheckboxDiv = styled.div`
    width:30px;
    display:inline-block;
    float:right;
`;

export const AlarmCheckbox = styled(Checkbox)`
    border-radius:30px;
`;

export const StoreButtonDiv = styled.div`
    display:inline-block;
    float:right;
    margin-top:20px;
`;

export const ModalDialog = styled.div`
    padding:10px 15px;
    width:400px;
    min-width:400px;
    max-width:400px;
    height:500px;
    position:absolute;
    top:105px;
    right:40px;
    margin:0px;
    overflow:scroll;
    scrollbar-width:thin;
    overflow-x:hidden;
    border-radius:5px;
    background-color:rgb(255, 255, 255);
`;