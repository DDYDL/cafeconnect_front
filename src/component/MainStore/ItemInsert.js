import * as m from '../styles/StyledMain.tsx';
import React, { useState } from 'react'
import styles from '../styles/ItemInsert.module.css'
import upload_file from '../assets/img/upload-files-4ee86225-svg.svg'
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import * as s from "../styles/StyledStore.tsx";
import { Option } from '@material-tailwind/react';
function ItemInsert() {


    const [item, setItem] = useState({
        'itemName': '',
        'itemPrice': '',
        'itemCapacity': '',
        'itemUnitQuantity': '',
        'itemUnit': '',
        'itemStandard': {
            'itemX': '가로(cm)',
            'itemY': '세로(cm)',
            'itemZ': '높이(cm)',
        },
        'itemStorage': '',
        'itemCountryOrigin': '',
        'itemMajorCategory': '',
        'itemMiddleCategory': '',
        'itemSubCategory': '',
        'file': '',

    })



    const imageInput = useRef();
    const navigate = useNavigate();
    const handleChangeInputExceptStandard = (e) => {

        const name = e.target.name;
        const value = e.target.value;


        const newItem = {
            ...item,
            'itemStandard': { ...item['itemStandard'] },
            [name]: value,

        }

        setItem(newItem);
    }

    const handleClickInputExceptStandard = (e) => {
        if (e.target.value == '상품명을 입력하세요') {
            const name = e.target.name;
            const value = '';

            const newItem = {
                ...item,
                'itemStandard': { ...item['itemStandard'] },
                [name]: value,

            }

            setItem(newItem);
        }
        return;

    }

    const handleChangeStandardInput = (e) => {
        console.log('handleChangeStandardInput')


        const name = e.target.name;
        const value = e.target.value;
        const newItem = {
            ...item,
            'itemStandard': {
                ...item['itemStandard'],
                [name]: value,
            },


        }
        setItem(newItem);

    }



    const handleSubmit = () => {

        navigate('/mainItemList');
    }


    const handleUploadImage = (e) => {

        imageInput.current.click();
    }

    const handleImageInput = () => {

    }




    return (
        <>
            <m.CarouselDiv>
                <input
                    type="hidden"
                    id="anPageName"
                    name="page"
                    value="ItemInsert"
                />
                <div className={styles['container-center-horizontal']}>
                    <div className={`${styles['ItemInsert']} ${styles['screen']}`}>
                        <div className={styles['background']}>
                            <div className={`${styles['heading-4-create-products']} ${styles['valign-text-middle']}`}>
                                상품 등록
                            </div>
                            <div className={styles['form']}>
                                <div className={styles['container-container']}>
                                    <div className={styles['container']}>
                                        <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                            상품명
                                        </div>
                                        <div className={styles['input']}>
                                            <div className={styles['container-1']}>
                                                <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                    상품명을 입력하세요
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['container']}>
                                        <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                            공급가
                                        </div>
                                        <div className={styles['input']}>
                                            <div className={styles['container-1']}>
                                                <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                    공급가를 입력하세요
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['container']}>
                                        <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                            용량
                                        </div>
                                        <div className={`${styles['input-1']} ${styles['input-5']}`}>
                                            
                                            <div className={styles['container-2']}>
                                                <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                    용량을 선택하세요
                                                </div>
                                                
                                            </div>
                                            
                                            
                                            <img
                                                className={styles['sort-down']}
                                                src={require("../assets/img/sort-down@2x.png")}
                                                alt="Sort Down"
                                            />

                                        </div>
                                    </div>
                                    <div className={styles['container-3']}>
                                        <div className={`${styles['flex-col']} ${styles['flex']}`}>
                                            <div className={`${styles['label-3']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                                규격
                                            </div>
                                            <div className={`${styles['input-2']} ${styles['input-5']}`}>
                                                <div className={`${styles['cm']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                    가로(cm)
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['input-2']} ${styles['input-5']}`}>
                                            <div className={`${styles['cm-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                세로(cm)
                                            </div>
                                        </div>
                                        <div className={`${styles['input-2']} ${styles['input-5']}`}>
                                            <div className={`${styles['cm-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                높이(cm)
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['container-3']}>
                                        <div className={`${styles['flex-col']} ${styles['flex']}`}>
                                            <div className={`${styles['label-3']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                                카테고리
                                            </div>
                                            <div className={`${styles['input-3']} ${styles['input-5']}`}>
                                                <img
                                                    className={styles['sort-down-1']}
                                                    src={require("../assets/img/sort-down@2x.png")}
                                                    alt="Sort Down"
                                                />
                                                <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                    대분류
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['input-3']} ${styles['input-5']}`}>
                                            <img
                                                className={styles['sort-down-1']}
                                                src={require("../assets/img/sort-down@2x.png")}
                                                alt="Sort Down"
                                            />
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                중분류
                                            </div>
                                        </div>
                                        <div className={`${styles['input-3']} ${styles['input-5']}`}>
                                            <img
                                                className={styles['sort-down-1']}
                                                src={require("../assets/img/sort-down@2x.png")}
                                                alt="Sort Down"
                                            />
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                소분류
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles['flex-col-1']} ${styles['flex-col-4']}`}>
                                    <div className={styles['container']}>
                                        <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                            원산지
                                        </div>
                                        <div className={styles['input']}>
                                            <div className={styles['container-1']}>
                                                <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                    원산지를 입력하세요
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['container-6']}>
                                        <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                            단위
                                        </div>
                                        <div className={`${styles['input-1']} ${styles['input-5']}`}>
                                            <div className={styles['container-2']}>
                                                <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                    단위를 선택하세요
                                                </div>
                                            </div>
                                            <img
                                                className={styles['sort-down']}
                                                src={require("../assets/img/sort-down@2x.png")}
                                                alt="Sort Down"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles['container-4']}>
                                        <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                            보관 상태
                                        </div>
                                        <div className={`${styles['input-1']} ${styles['input-5']}`}>
                                            <div className={styles['container-2']}>
                                                <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                    보관 상태를 선택하세요
                                                </div>
                                            </div>
                                            <img
                                                className={styles['sort-down']}
                                                src={require("../assets/img/sort-down@2x.png")}
                                                alt="Sort Down"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles['container-4']}>
                                        <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                            단위 수량
                                        </div>
                                        <div className={styles['input']}>
                                            <div className={styles['container-1']}>
                                                <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                    단위 수량을 입력하세요
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles['input-4']} ${styles['input-5']}`}>
                                        <div className={`${styles['label-2']} ${styles['valign-text-middle']} ${styles['label-3']} ${styles['notosanskr-bold-black-16px']}`}>
                                            이미지 등록
                                        </div>
                                        <div className={styles['border-1']}>
                                            <img
                                                className={styles['upload-files4ee86225svg']}
                                                src={upload_file}
                                                alt="upload-files.4ee86225.svg"
                                            />
                                            <div className={`${styles['text-11']} ${styles['valign-text-middle']} ${styles['themewagongithubiosemanticitem']}`}>
                                                <span>
                                                    <span className={styles['span0']}><br /></span>
                                                    <span className={styles['span1-1']}>이미지 선택</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={styles['product-thumb-1bfdce747webp']}></div>
                                    </div>
                                    <div className={styles['small-btn_brown']}>
                                        <div className={`${styles['text-12']} ${styles['valign-text-middle']} ${styles['themewagongithubiosemanticheading-6']}`}>
                                            상품등록
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className={styles['footer']}>
                            <div className={styles['footer-contents']}>
                                <div className={`${styles['flex-row']} ${styles['flex']}`}>
                                    <div className={`${styles['flex-col-2']} ${styles['flex-col-4']}`}>
                                        <div className={styles['overlap-group-1']}>
                                            <p className={`${styles['x']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 : 서울특별시
                                                강남구 테헤란로 231, EAST동 20층(역삼동, 센터필드)
                                                <br />
                                                사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 : 제2009호-서울강남-00847호
                                            </p>
                                            <div className={`${styles['text-21']} ${styles['valign-text-middle']}`}>
                                                사업자정보확인
                                            </div>
                                            <p className={`${styles['text-22']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜ 더블유컨셉코리아
                                            </p>
                                        </div>
                                        <p className={`${styles['copyright']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                                        </p>
                                    </div>
                                    <div className={styles['vertical-divider-1']}></div>
                                </div>
                                <div className={`${styles['flex-col-3']} ${styles['flex-col-4']}`}>
                                    <p className={`${styles['heading-3']} ${styles['valign-text-middle']}`}>
                                        <span>
                                            <span className={styles['span0-1']}>
                                                소비자피해보상보험
                                                <br />
                                            </span>
                                            <span className={styles['span1-2']}>
                                                고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서 가입한
                                                <br />
                                                소비자피해보상보험 서비스를 이용하실 수 있습니다.
                                            </span>
                                        </span>
                                    </p>
                                    <div className={styles['text-container']}>
                                        <div className={`${styles['text-23']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                        </div>
                                        <div className={`${styles['text-24']} ${styles['valign-text-middle']}`}>
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

export default ItemInsert