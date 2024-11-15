import * as m from '../styles/StyledMain.tsx';
import React, { useState } from 'react'
import '../styles/ItemInsert.css'
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
                <div class="container-center-horizontal">
                    <div class="item screen">
                        <div class="flex-col">

                            <div class="heading-4-create-products valign-text-middle">
                                상품 등록
                            </div>
                        </div>
                        <div class="flex-row">
                            <div class="flex-col-1 flex-col-7">
                                <div class="container-6">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        상품명
                                    </div>
                                    <div class="input">
                                        <div class="container">
                                            <input class="text valign-text-middle notosanskr-light-pink-swan-15px" name='itemName' onClick={handleClickInputExceptStandard} onChange={handleChangeInputExceptStandard} value={item.itemName} style={{ outline: 'none' }}>

                                            </input>
                                        </div>
                                    </div>
                                </div>
                                <div class="container-7">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        단위
                                    </div>
                                    <div class="input-1 input-8">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px" name='itemUnit' onInput={handleChangeInputExceptStandard}>
                                                {item.itemUnit}
                                            </div>
                                        </div>
                                        <img
                                            class="sort-down"
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div class="container-2">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        보관상태
                                    </div>
                                    <div class="input-1 input-8">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px" name='itemStorage' onInput={handleChangeInputExceptStandard}>
                                                {item.itemStorage}
                                            </div>
                                        </div>
                                        <img
                                            class="sort-down"
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div class="overlap-group2">
                                    <div class="flex-col-2 flex-col-7">
                                        <div class="label-4 valign-text-middle notosanskr-bold-black-16px">
                                            규격
                                        </div>
                                        <div class="input-3 input-8">
                                            <div class="container-3">
                                                <div class="cm valign-text-middle notosanskr-light-pink-swan-15px" name="itemX">
                                                    {item.itemStandard['itemX']}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-4 input-8">
                                        <div class="container-3">
                                            <div class="cm-3 valign-text-middle notosanskr-light-pink-swan-15px" name="itemY">
                                                {item.itemStandard['itemY']}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-5 input-8">
                                        <div class="container-3">
                                            <div class="cm-3 valign-text-middle notosanskr-light-pink-swan-15px" name="itemZ">
                                                {item.itemStandard['itemZ']}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container-2">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        원산지
                                    </div>
                                    <div class="input">
                                        <div class="container">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px" name="itemCountryOrigin" onInput={handleChangeInputExceptStandard}>
                                                {item.itemCountryOrigin}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-col-3 flex-col-7">
                                <div class="flex-row-1 notosanskr-light-pink-swan-15px">
                                    <div class="flex-col-4 flex-col-7">
                                        <div class="label-4 valign-text-middle notosanskr-bold-black-16px" >
                                            카테고리
                                        </div>
                                        <div class="input-6 input-8">
                                            <div class="container-4">
                                                <div class="text valign-text-middle notosanskr-light-pink-swan-15px" name="itemMajorCategory" onInput={handleChangeInputExceptStandard}>
                                                    {item.itemMajorCategory}
                                                </div>
                                            </div>
                                            <img
                                                class="sort-down"
                                                src={require("../assets/img/sort-down@2x.png")}
                                                alt="Sort Down"
                                            />
                                        </div>
                                        <div class="label-2 valign-text-middle label-4 notosanskr-bold-black-16px">
                                            공급가
                                        </div>
                                    </div>
                                    <div class="input-2 input-8">
                                        <div class="container-4">
                                            <div class="text valign-text-middle" name="itemMiddleCategory" onInput={handleChangeInputExceptStandard}>{item.itemMiddleCategory}</div>
                                        </div>
                                        <img
                                            class="sort-down"
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                    <div class="input-2 input-8">
                                        <div class="container-4">
                                            <div class="text valign-text-middle" name="itemSubCategory" onInput={handleChangeInputExceptStandard}>{item.itemSubCategory}</div>
                                        </div>
                                        <img
                                            class="sort-down"
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div class="input-7 input-8">
                                    <div class="container">
                                        <div class="text valign-text-middle notosanskr-light-pink-swan-15px" name="itemPrice" onInput={handleChangeInputExceptStandard}>
                                            {item.itemPrice}
                                        </div>
                                    </div>
                                </div>
                                <div class="container-2">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        용량
                                    </div>
                                    <div class="input-1 input-8">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px" name="itemCapacity" onInput={handleChangeInputExceptStandard}>
                                                {item.itemCapacity}
                                            </div>
                                        </div>
                                        <img
                                            class="sort-down"
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div class="container-2">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        단위수량
                                    </div>
                                    <div class="input">
                                        <div class="container">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px" name='itemUnitQuantity' onInput={handleChangeInputExceptStandard}>
                                                {item.itemUnitQuantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="label-3 valign-text-middle label-4 notosanskr-bold-black-16px">
                                    이미지 등록
                                </div>
                                <div class="border-1" onClick={handleUploadImage}>

                                    <input
                                        type="file"
                                        accept="image/jpg, image/jpeg, image/png"
                                        multiple
                                        ref={imageInput}
                                        onChange={handleImageInput}
                                        style={{ display: 'none' }}
                                    />

                                    <img
                                        class="upload-files4ee86225svg"
                                        src={upload_file}
                                        alt="upload-files.4ee86225.svg"
                                    />
                                    <div class="text-15 valign-text-middle">
                                        <span>
                                            <span class="span0">
                                                <br />
                                            </span>
                                            <span class="span1-1">이미지 선택</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="product-thumb-1bfdce747webp"></div>
                                <div class="small-btn_brown" onInput={handleSubmit}>
                                    <div class="text-19 valign-text-middle">상품 등록</div>
                                </div>
                            </div>
                        </div>
                        <footer class="footer">
                            <div class="footer-contents">
                                <div class="flex-row-2">
                                    <div class="flex-col-5 flex-col-7">
                                        <div class="overlap-group-1">
                                            <p class="x valign-text-middle notosanskr-light-coconut-12px">
                                                상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                                                서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동,
                                                센터필드)
                                                <br />
                                                사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 :
                                                제2009호-서울강남-00847호
                                            </p>
                                            <div class="text-20 valign-text-middle">사업자정보확인</div>
                                            <p class="text-21 valign-text-middle notosanskr-light-coconut-12px">
                                                │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜
                                                더블유컨셉코리아
                                            </p>
                                        </div>
                                        <p class="copyright valign-text-middle notosanskr-light-coconut-12px">
                                            COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                                        </p>
                                    </div>
                                    <div class="vertical-divider-1"></div>
                                </div>
                                <div class="flex-col-6 flex-col-7">
                                    <p class="heading-3 valign-text-middle">
                                        <span>
                                            <span class="span0-1">
                                                소비자피해보상보험
                                                <br />
                                            </span>
                                            <span class="span1-2">
                                                고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서
                                                가입한
                                                <br />
                                                소비자피해보상보험 서비스를 이용하실 수 있습니다.
                                            </span>
                                        </span>
                                    </p>
                                    <div class="text-container">
                                        <div class="text-22 valign-text-middle notosanskr-light-coconut-12px">
                                            보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                        </div>
                                        <div class="text-23 valign-text-middle">
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