import * as m from '../styles/StyledMain.tsx';
import React, { useState } from 'react'
import styles from '../styles/ItemInsert.module.css'
import upload_file from '../assets/img/upload-files-4ee86225-svg.svg'
import { useNavigate } from 'react-router';
import { useRef } from 'react';
function ItemInsert() {


    const [item, setItem] = useState({
        'itemName': '상품명을 입력하세요',
        'itemPrice': '공급가를 입력하세요',
        'itemCapacity': '용량을 선택하세요',
        'itemUnitQuantity': '단위수량을 입력하세요',
        'itemUnit': '단위를 선택하세요',
        'itemStandard': {
            'itemX': '가로(cm)',
            'itemY': '세로(cm)',
            'itemZ': '높이(cm)',
        },
        'itemStorage': '보관상태를 선택하세요',
        'itemCountryOrigin': '원산지를 입력하세요',
        'itemMajorCategory': '대분류',
        'itemMiddleCategory': '중분류',
        'itemSubCategory': '소분류',
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
                <input type="hidden" id="anPageName" name="page" value="item" />
                <div className={styles['container-center-horizontal']}>
                    <div className={`${styles['item']} ${styles['screen']}`}>
                        <div className={styles['flex-col']}>
                            <div className={`${styles['heading-4-create-products']} ${styles['valign-text-middle']}`}>
                                상품 등록
                            </div>
                        </div>
                        <div className={styles['flex-row']}>
                            <div className={`${styles['flex-col-1']} ${styles['flex-col-7']}`}>
                                <div className={styles['container-6']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        상품명
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container']}>
                                            <input
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                name="itemName"
                                                onClick={handleClickInputExceptStandard}
                                                onChange={handleChangeInputExceptStandard}
                                                value={item.itemName}
                                                style={{ outline: 'none' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['container-7']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        단위
                                    </div>
                                    <div className={`${styles['input-1']} ${styles['input-8']}`}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                name="itemUnit"
                                                onInput={handleChangeInputExceptStandard}
                                            >
                                                {item.itemUnit}
                                            </div>
                                        </div>
                                        <img
                                            className={styles['sort-down']}
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div className={styles['container-2']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        보관상태
                                    </div>
                                    <div className={`${styles['input-1']} ${styles['input-8']}`}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                name="itemStorage"
                                                onInput={handleChangeInputExceptStandard}
                                            >
                                                {item.itemStorage}
                                            </div>
                                        </div>
                                        <img
                                            className={styles['sort-down']}
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div className={styles['overlap-group2']}>
                                    <div className={`${styles['flex-col-2']} ${styles['flex-col-7']}`}>
                                        <div className={`${styles['label-4']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                            규격
                                        </div>
                                        <div className={`${styles['input-3']} ${styles['input-8']}`}>
                                            <div className={styles['container-3']}>
                                                <div
                                                    className={`${styles['cm']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                    name="itemX"
                                                >
                                                    {item.itemStandard['itemX']}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles['input-4']} ${styles['input-8']}`}>
                                        <div className={styles['container-3']}>
                                            <div
                                                className={`${styles['cm-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                name="itemY"
                                            >
                                                {item.itemStandard['itemY']}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles['input-5']} ${styles['input-8']}`}>
                                        <div className={styles['container-3']}>
                                            <div
                                                className={`${styles['cm-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                name="itemZ"
                                            >
                                                {item.itemStandard['itemZ']}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['container-2']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        원산지
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                name="itemCountryOrigin"
                                                onInput={handleChangeInputExceptStandard}
                                            >
                                                {item.itemCountryOrigin}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles['flex-col-3']} ${styles['flex-col-7']}`}>
                                <div className={`${styles['flex-row-1']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                    <div className={`${styles['flex-col-4']} ${styles['flex-col-7']}`}>
                                        <div className={`${styles['label-4']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                            카테고리
                                        </div>
                                        <div className={`${styles['input-6']} ${styles['input-8']}`}>
                                            <div className={styles['container-4']}>
                                                <div
                                                    className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                    name="itemMajorCategory"
                                                    onInput={handleChangeInputExceptStandard}
                                                >
                                                    {item.itemMajorCategory}
                                                </div>
                                            </div>
                                            <img
                                                className={styles['sort-down']}
                                                src={require("../assets/img/sort-down@2x.png")}
                                                alt="Sort Down"
                                            />
                                        </div>
                                        <div className={`${styles['label-2']} ${styles['valign-text-middle']} ${styles['label-4']} ${styles['notosanskr-bold-black-16px']}`}>
                                            공급가
                                        </div>
                                    </div>
                                    <div className={`${styles['input-2']} ${styles['input-8']}`}>
                                        <div className={styles['container-4']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']}`}
                                                name="itemMiddleCategory"
                                                onInput={handleChangeInputExceptStandard}
                                            >
                                                {item.itemMiddleCategory}
                                            </div>
                                        </div>
                                        <img
                                            className={styles['sort-down']}
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                    <div className={`${styles['input-2']} ${styles['input-8']}`}>
                                        <div className={styles['container-4']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']}`}
                                                name="itemSubCategory"
                                                onInput={handleChangeInputExceptStandard}
                                            >
                                                {item.itemSubCategory}
                                            </div>
                                        </div>
                                        <img
                                            className={styles['sort-down']}
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles['input-7']} ${styles['input-8']}`}>
                                    <div className={styles['container']}>
                                        <div
                                            className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            name="itemPrice"
                                            onInput={handleChangeInputExceptStandard}
                                        >
                                            {item.itemPrice}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['container-2']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        용량
                                    </div>
                                    <div className={`${styles['input-1']} ${styles['input-8']}`}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                name="itemCapacity"
                                                onInput={handleChangeInputExceptStandard}
                                            >
                                                {item.itemCapacity}
                                            </div>
                                        </div>
                                        <img
                                            className={styles['sort-down']}
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div className={styles['container-2']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        단위수량
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                                name="itemUnitQuantity"
                                                onInput={handleChangeInputExceptStandard}
                                            >
                                                {item.itemUnitQuantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles['label-3']} ${styles['valign-text-middle']} ${styles['label-4']} ${styles['notosanskr-bold-black-16px']}`}>
                                    이미지 등록
                                </div>
                                <div className={styles['border-1']} onClick={handleUploadImage}>
                                    <input
                                        type="file"
                                        accept="image/jpg, image/jpeg, image/png"
                                        multiple
                                        ref={imageInput}
                                        onChange={handleImageInput}
                                        style={{ display: 'none' }}
                                    />
                                    <img
                                        className={styles['upload-files4ee86225svg']}
                                        src={upload_file}
                                        alt="upload-files.4ee86225.svg"
                                    />
                                    <div className={`${styles['text-15']} ${styles['valign-text-middle']}`}>
                                        <span>
                                            <span className={styles['span0']}>
                                                <br />
                                            </span>
                                            <span className={styles['span1-1']}>이미지 선택</span>
                                        </span>
                                    </div>
                                </div>
                                <div className={styles['product-thumb-1bfdce747webp']}></div>
                                <div className={styles['small-btn_brown']} onInput={handleSubmit}>
                                    <div className={`${styles['text-19']} ${styles['valign-text-middle']}`}>상품 등록</div>
                                </div>
                            </div>
                        </div>
                        <footer className={styles['footer']}>
                            <div className={styles['footer-contents']}>
                                <div className={styles['flex-row-2']}>
                                    <div className={`${styles['flex-col-5']} ${styles['flex-col-7']}`}>
                                        <div className={styles['overlap-group-1']}>
                                            <p className={`${styles['x']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                                                서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동, 센터필드)
                                                <br />
                                                사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 : 제2009호-서울강남-00847호
                                            </p>
                                            <div className={`${styles['text-20']} ${styles['valign-text-middle']}`}>사업자정보확인</div>
                                            <p className={`${styles['text-21']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜ 더블유컨셉코리아
                                            </p>
                                        </div>
                                        <p className={`${styles['copyright']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                                        </p>
                                    </div>
                                    <div className={styles['vertical-divider-1']}></div>
                                </div>
                                <div className={`${styles['flex-col-6']} ${styles['flex-col-7']}`}>
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
                                        <div className={`${styles['text-22']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                        </div>
                                        <div className={`${styles['text-23']} ${styles['valign-text-middle']}`}>서비스 가입사실 확인</div>
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