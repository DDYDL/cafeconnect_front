import * as m from '../styles/StyledMain.tsx';
import React from 'react'
import styles from '../styles/MenuDetail.module.css'
import { useNavigate,useParams } from 'react-router';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { axiosInToken } from '../../config.js';
import { useAtomValue } from "jotai/react";
import { tokenAtom } from "../../atoms";

function MenuDetail() {

    const token = useAtomValue(tokenAtom);
    const [menu,setMenu] = useState({
        'menuCode' : '',
        'menuName' : '',
        'menuPrice' : null,
        'menuCapacity' : '',
        'caffeine' : '',
        'calories' : '',
        'carbohydrate' : '',
        'sugar' : '',
        'natrium' : '',
        'fat' : '',
        'protein' : '',
        'menuStatus' : '',
        'menuCategoryName' : '',
        'imageUrl' : '',
    })
    
    const {menuCode} = useParams();
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
          
          const response = await axios.get(`http://localhost:8080/selectMenuByMenuCode/${menuCode}`); 
          setMenu(response.data); 
          console.log(response.data);
        } catch (error) {
          alert('해당하는 메뉴가 없습니다')
          navigate('/mainMenuList')
        } 
      };
    const deleteData = async () => {
        try {
          
          await axios.get(`http://localhost:8080/deleteMenu/${menuCode}`); 
          navigate('/mainMenuList')
          
        } catch (error) {
            alert('메뉴 삭제에 실패하였습니다'); 
            navigate('/mainMenuList')
        } 
    };
    

    const handleUpdateItem = () =>{
        navigate(`/menuUpdate/${menuCode}`)
    }

    const handleDeleteItem = () =>{
        deleteData();
    }

    useEffect(()=>{
        
        fetchData();
    },[])


    if(token !== ""){
       

        return (
        <>
            <m.CarouselDiv>
                <input type="hidden" id="anPageName" name="page" value="MenuDetail" />
                <div className={styles['container-center-horizontal']}>
                    <div className={`${styles['MenuDetail']} ${styles['screen']}`}>
                        <div className={`${styles['heading-4-product-details']} ${styles['valign-text-middle']}`}>
                            메뉴 상세
                        </div>
                        <div className={styles['background']}>
                            <div className={styles['flex-row']}>
                                <div className={styles['image']}></div>
                                <div className={styles['link']}>
                                    <div className={`${styles['overlap-group']} ${styles['themewagongithubiosemanticheading-6']}`}>
                                        <div className={`${styles['text']} ${styles['valign-text-middle']}`}>수정</div>
                                        <div className={styles['small-btn_brown']} onClick={handleUpdateItem}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']}`}>수정</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles['link-1']} ${styles['link-3']}`}>
                                    <div className={`${styles['overlap-group1-1']} ${styles['themewagongithubiosemanticheading-6']}`}>
                                        <div className={`${styles['text-8']} ${styles['valign-text-middle']}`}>삭제</div>
                                        <div className={`${styles['link-2']} ${styles['link-3']}`}>
                                            <div className={styles['overlap-group']}>
                                                <div className={`${styles['text']} ${styles['valign-text-middle']}`}>수정</div>
                                                <div className={styles['small-btn_brown']} onClick={handleDeleteItem}>
                                                    <div className={`${styles['text-1']} ${styles['valign-text-middle']}`}>삭제</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['flex-row-1']}>
                                <div className={styles['x384x530cropjpg']}></div>
                                <div className={styles['overlap-group3']}>
                                    <div className={`${styles['heading-3']} ${styles['valign-text-middle']}`}>
                                        {menu.menuName}
                                    </div>
                                    <div className={`${styles['table-body']} ${styles['notosanskr-medium-black-16px']}`}>
                                    <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>메뉴코드</div>
                                            <div className={styles['data-4']} style={{"width":"250px"}}>
                                                <div className={`${styles['text-18']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.menuCode}</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>메뉴명</div>
                                            <div className={styles['data-4']} style={{"width":"250px"}}>
                                                <div className={`${styles['text-18']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.menuName}</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>카테고리</div>
                                            <div className={styles['data-1']} style={{"width":"250px"}}>
                                                <div className={`${styles['text-2']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.menuCategoryName}</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>가격</div>
                                            <div className={styles['data-1']} style={{"width":"250px"}}>
                                                <div className={`${styles['text-2']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{`${menu.menuPrice}원`}</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>용량</div>
                                            <div className={styles['data-1']} style={{"width":"250px"}}>
                                                <div className={`${styles['x500ml']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.menuCapacity}</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>열량</div>
                                            <div className={styles['data-1']} style={{"width":"250px"}}>
                                                <div className={`${styles['x300kcal']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.calories}</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data-2']} ${styles['valign-text-middle']}`}>카페인 함유량</div>
                                            <div className={styles['data-3']} style={{"width":"250px"}}>
                                                <div className={`${styles['x20mg']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.caffeine}</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data-5']} ${styles['valign-text-middle']}`}>탄수화물 함유량</div>
                                            <div className={styles['data-3']} style={{"width":"250px"}}>
                                                <div className={`${styles['x20mg']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.carbohydrate}</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data-2']} ${styles['valign-text-middle']}`}>지방 함유량</div>
                                            <div className={styles['data-3']} style={{"width":"250px"}}>
                                                <div className={`${styles['x20mg']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.fat}</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data-2']} ${styles['valign-text-middle']}`}>나트륨 함유량</div>
                                            <div className={styles['data-3']} style={{"width":"250px"}}>
                                                <div className={`${styles['x20mg']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.natrium}</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data-2']} ${styles['valign-text-middle']}`}>당류 함유량</div>
                                            <div className={styles['data-3']} style={{"width":"250px"}}>
                                                <div className={`${styles['x20mg']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.sugar}</div>
                                            </div>
                                        </div>
                                        <div className={`${styles['table-body-item']} ${styles['notosanskr-medium-black-16px']}`}>
                                            <div className={`${styles['data-2']} ${styles['valign-text-middle']}`}>단백질 함유량</div>
                                            <div className={styles['data-3']} style={{"width":"250px"}}>
                                                <div className={`${styles['x20mg']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.protein}</div>
                                            </div>
                                        </div>
                                        <div className={`${styles['table-body-item']} ${styles['notosanskr-medium-black-16px']}`}>
                                            <div className={`${styles['data-2']} ${styles['valign-text-middle']}`}>상태</div>
                                            <div className={styles['data-3']} style={{"width":"250px"}}>
                                                <div className={`${styles['x20mg']} ${styles['valign-text-middle']}`} style={{"width":"250px"}}>{menu.menuStatus}</div>
                                            </div>
                                        </div>
                                        
                                        <div className={styles['table-body-item']}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['flex-row-2']}>
                                <div className={styles['background-3']}></div>
                                <div className={`${styles['text-13']} ${styles['valign-text-middle']}`}>메뉴 정보 고시</div>
                                <div className={`${styles['background-2']} ${styles['background-3']}`}></div>
                            </div>
                            <div className={styles['frame-101']}>
                                <div className={styles['frame-99']}>
                                    <div className={styles['frame-97']}>
                                        <div className={`${styles['text-14']} ${styles['valign-text-middle']} ${styles['notosanskr-medium-black-16px']}`}>
                                            카테고리
                                        </div>
                                    </div>
                                    <div className={styles['frame-98']}>
                                        <div className={`${styles['text-15']} ${styles['valign-text-middle']}`}>{`${menu.menuCategoryName}`}</div>
                                    </div>
                                </div>
                                <div className={styles['frame-100']}>
                                    <div className={styles['frame-97']}>
                                        <div className={`${styles['text-16']} ${styles['valign-text-middle']} ${styles['notosanskr-medium-black-16px']}`}>
                                            원산지
                                        </div>
                                    </div>
                                    <div className={styles['frame-98']}>
                                        <div className={`${styles['text-17']} ${styles['valign-text-middle']}`}>대한민국</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className={styles['footer']}>
                            <div className={styles['footer-contents']}>
                                <div className={styles['flex-row-3']}>
                                    <div className={styles['flex-col']}>
                                        <div className={styles['overlap-group-2']}>
                                            <p className={`${styles['x']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 : 서울특별시
                                                강남구 테헤란로 231, EAST동 20층(역삼동, 센터필드)
                                                <br />
                                                사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 : 제2009호-서울강남-00847호
                                            </p>
                                            <div className={`${styles['text-22']} ${styles['valign-text-middle']}`}>
                                                사업자정보확인
                                            </div>
                                            <p className={`${styles['text-23']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
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
                                    <p className={`${styles['heading-3-1']} ${styles['valign-text-middle']}`}>
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
                                        <div className={`${styles['text-24']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                        </div>
                                        <div className={`${styles['text-25']} ${styles['valign-text-middle']}`}>
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
    )}else{
        
        navigate('/loginStore')
    }
}

export default MenuDetail