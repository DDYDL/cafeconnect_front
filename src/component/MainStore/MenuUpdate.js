import * as m from '../styles/StyledMain.tsx';
import '../styles/MenuInsert.css'
import upload_file from '../assets/img/upload-files-4ee86225-svg.svg'
import React from 'react'

function MenuUpdate() {
    return (
        <>
            <m.CarouselDiv>

                <input type="hidden" id="anPageName" name="page" value="menuinsert" />
                <div class="container-center-horizontal">
                    <div class="menuinsert screen">
                        <div class="flex-col">

                            <div class="heading-4-create-products valign-text-middle">
                                메뉴 수정
                            </div>
                        </div>
                        <div class="flex-row">
                            <div class="container">
                                <div class="label valign-text-middle notosanskr-bold-black-16px">
                                    메뉴명
                                </div>
                                <div class="input">
                                    <div class="container-1">
                                        <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                            메뉴명을 입력하세요
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-col-1 flex-col-5">
                                <div class="label-5 valign-text-middle notosanskr-bold-black-16px">
                                    카테고리
                                </div>
                                <div class="input-1">
                                    <div class="container-4">
                                        <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                            분류
                                        </div>
                                    </div>
                                    <img
                                        class="sort-down"
                                        src={require("../assets/img/sort-down@2x.png")}
                                        alt="Sort Down"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex-col-2 flex-col-5">
                            <div class="container-container">
                                <div class="container-2">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        가격
                                    </div>
                                    <div class="input">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                가격을&nbsp;&nbsp;입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="label-2 valign-text-middle label-5 notosanskr-bold-black-16px">
                                        용량
                                    </div>
                                    <div class="input">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                용량을 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-container-1 container-container-5">
                                <div class="container-2">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        열량
                                    </div>
                                    <div class="input">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                열량을&nbsp;&nbsp;입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        카페인 함유량
                                    </div>
                                    <div class="input">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                카페인 함유량을 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-container-2 container-container-5">
                                <div class="container">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        탄수화물 함유량
                                    </div>
                                    <div class="input">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                탄수화물 함유량&nbsp;&nbsp;입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        지방
                                    </div>
                                    <div class="input">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                지방 함유량을 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-container-3 container-container-5">
                                <div class="container">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        나트륨 함유량
                                    </div>
                                    <div class="input">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                나트륨 함유량&nbsp;&nbsp;입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        당류 함유량
                                    </div>
                                    <div class="input">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                당류 함유량 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-container-4 container-container-5">
                                <div class="container-2">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        단백질 함유량
                                    </div>
                                    <div class="input">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                탄수화물 함유량&nbsp;&nbsp;입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="label-3 valign-text-middle label-5 notosanskr-bold-black-16px">
                                        지방
                                    </div>
                                    <div class="input">
                                        <div class="container-1">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                지방 함유량을 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="label-4 valign-text-middle label-5 notosanskr-bold-black-16px">
                                이미지 수정
                            </div>
                            <div class="border-1">
                                <img
                                    class="upload-files4ee86225svg"
                                    src={upload_file}
                                    alt="upload-files.4ee86225.svg"
                                />
                                <div class="text-24 valign-text-middle">
                                    <span>
                                        <span class="span0">
                                            <br />
                                        </span>
                                        <span class="span1-1">이미지 선택</span>
                                    </span>
                                </div>
                            </div>
                            <div class="product-thumb-1bfdce747webp"></div>
                            <div class="button">
                                <div class="overlap-group2">
                                    <div class="small-btn_brown">
                                        <div class="text-26 valign-text-middle">메뉴수정</div>
                                    </div>
                                </div>
                            </div>
                            <footer class="footer">
                                <div class="footer-contents">
                                    <div class="flex-row-1">
                                        <div class="flex-col-3 flex-col-5">
                                            <div class="overlap-group-1">
                                                <p class="x valign-text-middle notosanskr-light-coconut-12px">
                                                    상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                                                    서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동,
                                                    센터필드)
                                                    <br />
                                                    사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 :
                                                    제2009호-서울강남-00847호
                                                </p>
                                                <div class="text-8 valign-text-middle">
                                                    사업자정보확인
                                                </div>
                                                <p class="text-9 valign-text-middle notosanskr-light-coconut-12px">
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
                                    <div class="flex-col-4 flex-col-5">
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
                                            <div class="text-10 valign-text-middle notosanskr-light-coconut-12px">
                                                보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                            </div>
                                            <div class="text-11 valign-text-middle">
                                                서비스 가입사실 확인
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </m.CarouselDiv>
        </>
    )
}

export default MenuUpdate