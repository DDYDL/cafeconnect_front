import * as m from '../styles/StyledMain.tsx';
import styles from '../styles/InsertMainStore.module.css'
import React from 'react'
import { useRef, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router';
import { useAtom } from 'jotai/react';
import { initMember, memberAtom, tokenAtom } from '../../atoms.js';
import { useSetAtom } from 'jotai/react';

function InsertMainStore() {
    const [member, setMember] = useAtom(memberAtom);
    const setToken = useSetAtom(tokenAtom);
    const pwdRef = useRef();
    const pwdCheckRef = useRef();
    const [existId, setExistId] = useState(false)
    const [ableJoin, setAbleJoin] = useState(false);
    const [samePwd, setSamePwd] = useState(false)
    const [notSamePwd, setNotSamePwd] = useState(false);
    const [form,setForm] = useState({
        "username":"",
        "password":"",
        "deptName":"",
    })
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const changeId = (e) =>{
        setForm({...form,
            "username" : e.target.value
        })
        
    }
    const changePwd = (e) =>{
        setForm({...form,
            "password" : e.target.value
        })
    }
    const changeDeptName = (e) =>{
        setForm({...form,
            "deptName" : e.target.value
        })
    }

    const handleCheckId = () => {
        
        checkId();
    }

    const handleCheckPwd = () => {
        if (pwdRef.current.value != pwdCheckRef.current.value) {
            setSamePwd(false);
            setNotSamePwd(true);
        }else{
            setSamePwd(true);
            setNotSamePwd(false);
        }

    }

    const handleFocus = () => {
        if (pwdRef.current) {
            pwdRef.current.style.border = "none";
            pwdRef.current.style.outline = "none";
            
            
        }
        if (pwdCheckRef.current) {
            pwdRef.current.style.border = "none";
            pwdRef.current.style.outline = "none";
        }
      };
    const checkId = async () => {
        try {
          
          const response = await axios.post(`http://localhost:8080/main/checkId`,form); 
          if(response.data.state == 'success'){
            console.log(response.data);
            console.log('success')
            setExistId(true);
            setAbleJoin(false);
          }else if(response.data.state =='fail'){
            console.log('fail')
            setExistId(false);
            setAbleJoin(true);
          }
          
        } catch (error) {
          console.log('error!')
          setError(error);
        } 
      };
    
    const hasAllProperties = (obj, keys) => {
        return keys.every( (key) => obj[key] != null && obj[key] != '');
    };
    const requiredKeys = ["username", "password", "deptName"];
    const logout = ()=>{
        setMember({...initMember});
        setToken('');
        navigate("/loginStore");
    }
    const joinMember = async () => {
        try {
          if(!hasAllProperties(form, requiredKeys)){
            alert("모든 값을 입력해주세요");
            return;
          }
          const response = await axios.post(`http://localhost:8080/main/insert`,form); 
          alert('회원가입 성공')
          
          logout();
          
        } catch (error) {
          console.log('error!')
          setError(error);
        } 
      };

    return (
        <>
            <m.CarouselDiv>

                <input
                    type="hidden"
                    id="anPageName"
                    name="page"
                    value="InsertMainStore"
                />
                <div className={styles['container-center-horizontal']}>
                    <div className={`${styles['InsertMainStore']} ${styles['screen']}`}>

                        <div className={styles['background']}>
                            <div className={`${styles['heading-4-create-products']} ${styles['valign-text-middle']}`}>
                                계정 등록
                            </div>
                            <div className={styles['container-container']}>
                                <div className={styles['container']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        아이디
                                    </div>
                                    <div style={{ "display": "flex" }}>
                                        <div className={styles['input-button']}>
                                            <div className={styles['container-1']}>
                                                <input className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`} 
                                                placeholder='아이디를 입력하세요' onChange={changeId} style={{"border":"none","outline":"none","backgroundColor":"#fbfbfb"}}>

                                                </input>
                                            </div>
                                        </div>
                                        <div style={{
                                            "marginLeft": "20px", "width": "71px", "height": "50px", "display": "grid", "font": "Noto Sans KR",
                                            "fontSize": "12px", "placeItems": "center", "borderRadius": "8px", "backgroundColor": "#54473f", "color": "white", "cursor": "pointer"
                                        }}
                                            onClick={handleCheckId}
                                        >중복체크</div>
                                    </div>
                                </div>

                                <div className={styles['container']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        비밀번호
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <input className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                placeholder='비밀번호를 입력하세요' ref={pwdRef} onChange={changePwd} type='password' style={{"border":"none","outline":"none","backgroundColor":"#fbfbfb"}} onFocus={handleFocus}>

                                            </input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['error-container']}>
                                {existId ? (<div style={{ "padding": "0 15px", "color": "red", "fontSize": "13px" }}>
                                    아이디가 존재합니다
                                </div>) : null}
                                {ableJoin ? (<div style={{ "padding": "0 15px", "color": "black", "fontSize": "13px" }}>
                                    회원가입 가능합니다
                                </div>) : null}

                            </div>
                            <div className={styles['container-container']}>
                                <div className={styles['container']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        부서명
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <input className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`} 
                                            placeholder='부서명을 입력하세요' onChange={changeDeptName} style={{"border":"none","outline":"none","backgroundColor":"#fbfbfb"}} >

                                            </input>

                                        </div>

                                    </div>
                                </div>

                                <div className={styles['container']} >
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        비밀번호 확인
                                    </div>
                                    <div style={{ "display": "flex" }}>
                                        <div className={styles['input-button']}>
                                            <div className={styles['container-1']}>
                                                <input className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                    placeholder='비밀번호를 입력하세요' ref={pwdCheckRef} type='password' style={{"border":"none","outline":"none","backgroundColor":"#fbfbfb"}} onFocus={handleFocus}>

                                                </input>
                                            </div>
                                        </div>
                                        <div style={{
                                            "marginLeft": "20px", "width": "71px", "height": "50px", "font": "Noto Sans KR", "fontSize": "12px",
                                            "display": "grid", "placeItems": "center", "borderRadius": "8px", "backgroundColor": "#54473f", "color": "white", "cursor": "pointer"
                                        }}
                                            onClick={handleCheckPwd}
                                        >확인</div>
                                    </div>


                                </div>
                            </div>
                            <div className={styles['error-container']}>

                                {notSamePwd ? (<div style={{ "padding": "0 15px", "color": "red", "fontSize": "13px", "marginLeft": "500px" }}>
                                    비밀번호가 일치하지 않습니다
                                </div>) : null}
                                {samePwd ? (<div style={{ "padding": "0 15px", "color": "black", "fontSize": "13px", "marginLeft": "500px" }}>
                                    비밀번호가 일치합니다
                                </div>) : null}

                                
                            </div>
                            <div className={styles['overlap-group']}>
                                <div className={`${styles['text-4']} ${styles['valign-text-middle']}`}>
                                    계정 등록
                                </div>
                                <div className={styles['small-btn_brown']} onClick={joinMember}>
                                    <div className={`${styles['text-5']} ${styles['valign-text-middle']} ${styles['themewagongithubiosemanticheading-6']}`}>
                                        계정등록
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className={styles['footer']}>
                            <div className={styles['footer-contents']}>
                                <div className={`${styles['flex-row']} ${styles['flex']}`}>
                                    <div className={`${styles['flex-col']} ${styles['flex']}`}>
                                        <div className={styles['overlap-group-1']}>
                                            <p className={`${styles['x']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 : 서울특별시 강남구
                                                테헤란로 231, EAST동 20층(역삼동, 센터필드)
                                                <br />
                                                사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 : 제2009호-서울강남-00847호
                                            </p>
                                            <div className={`${styles['text-13']} ${styles['valign-text-middle']}`}>
                                                사업자정보확인
                                            </div>
                                            <p className={`${styles['text-14']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜ 더블유컨셉코리아
                                            </p>
                                        </div>
                                        <p className={`${styles['copyright']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                                        </p>
                                    </div>
                                    <div className={styles['vertical-divider-1']}></div>
                                </div>
                                <div className={styles['flex-col-1']}>
                                    <p className={`${styles['heading-3']} ${styles['valign-text-middle']}`}>
                                        <span>
                                            <span className={styles['span0']}>
                                                소비자피해보상보험
                                                <br />
                                            </span>
                                            <span className={styles['span1-1']}>
                                                고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서 가입한
                                                <br />
                                                소비자피해보상보험 서비스를 이용하실 수 있습니다.
                                            </span>
                                        </span>
                                    </p>
                                    <div className={styles['text-container']}>
                                        <div className={`${styles['text-15']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                        </div>
                                        <div className={`${styles['text-16']} ${styles['valign-text-middle']}`}>
                                            서비스 가입사실 확인
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>

            </m.CarouselDiv>
        </>
    )
}

export default InsertMainStore