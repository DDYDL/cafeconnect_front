import styled from 'styled-components';

interface Container {
    fontSize: string;
    marginTop: string;
}

export const CarouselDiv = styled.div`
    width:100%;
    height:400px;
    position:absolute;
    top:130px;
`;

export const SignatureDiv = styled.div`
    height:400px;
    width:1000px;
    position:absolute;
    top:650px;
    left:550px;
    display:flex;
    float:left;
    cursor:pointer;
`;

export const SignatureMenuDiv = styled.div`
    margin:20px;
`;

export const Circle = styled.div`
    position: absolute;
    left:-90px;
    top:-10px;
    width:450px;
    height:450px;
    border-radius:50%;
    background-color:rgba(255, 255, 255, 1);
    z-index:1;

    -webkit-transition: .5s ease-in-out;
	transition: .5s ease-in-out;

    ${SignatureDiv}:hover &{
        margin-left: 120px;
	    -webkit-transition: .8s ease-in-out;
	    transition: .8s ease-in-out;
    }
`;

export const SignatureMenuImage = styled.img`
    position:relative;
    z-index:2;

    -webkit-transition: .5s ease-in-out;
	transition: .5s ease-in-out;

    ${SignatureDiv}:hover &{
        margin-left: 120px;
	    -webkit-transition: .8s ease-in-out;
	    transition: .8s ease-in-out;
    }
`;

export const SignatureMenuP = styled.p<Container>`
    width:170px;
    position: relative;
    padding: 0px;
    margin-left:100px;

    margin-top: ${(props) => props.marginTop ? props.marginTop : ""};
    font-size: ${(props) => props.fontSize? props.fontSize : ""};

    &:after {
        content:"";
        width: 0;
        height: 18px;
        display: inline-block;
        background: rgba(203, 210, 164, 0.7);
        position: absolute;
        bottom:0;
        left:0;
        z-index:-1;
        transition: 0.2s all;
    }

    ${SignatureDiv}:hover &:after{
        width:100%;
    }
`;

export const BestDiv = styled.div`
    height:400px;
    width:1000px;
    position:absolute;
    top:1250px;
    left:450px;
    cursor:pointer;

    overflow: hidden;
`;