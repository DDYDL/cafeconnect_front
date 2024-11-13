import * as m from '../styles/StyledMain.tsx';
import '../styles/InsertMainStore.css'
import React from 'react'

function InsertMainStore() {
    return (
        <>
            <m.CarouselDiv>

                <input
                    type="hidden"
                    id="anPageName"
                    name="page"
                    value="insertmainstore"
                />
                <div class="container-center-horizontal">
                    <div class="insertmainstore screen">
                        
                        <div class="background">
                            <div class="heading-4-create-products valign-text-middle">
                                계정 등록
                            </div>
                            <div class="onta-container">
                                <div class="horizontal-border-1"></div>
                                <div class="container-2">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        아이디
                                    </div>
                                    <div class="input">
                                        <div class="container">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                아이디를 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container-3">
                                    <div class="label valign-text-middle notosanskr-bold-black-16px">
                                        비밀번호
                                    </div>
                                    <div class="input">
                                        <div class="container">
                                            <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                                비밀번호를 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-4">
                                <div class="label valign-text-middle notosanskr-bold-black-16px">
                                    부서명
                                </div>
                                <div class="input">
                                    <div class="container">
                                        <div class="text valign-text-middle notosanskr-light-pink-swan-15px">
                                            부서명을 입력하세요
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="overlap-group">
                                <div class="text-4 valign-text-middle">계정 등록</div>
                                <div class="small-btn_brown">
                                    <div class="text-5 valign-text-middle">계정등록</div>
                                </div>
                            </div>
                        </div>
                        <footer class="footer">
                            <div class="footer-contents">
                                <div class="flex-row flex">
                                    <div class="flex-col flex">
                                        <div class="overlap-group-1">
                                            <p class="x valign-text-middle notosanskr-light-coconut-12px">
                                                상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                                                서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동,
                                                센터필드)
                                                <br />
                                                사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 :
                                                제2009호-서울강남-00847호
                                            </p>
                                            <div class="text-13 valign-text-middle">사업자정보확인</div>
                                            <p class="text-14 valign-text-middle notosanskr-light-coconut-12px">
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
                                <div class="flex-col-1">
                                    <p class="heading-3 valign-text-middle">
                                        <span>
                                            <span class="span0">
                                                소비자피해보상보험
                                                <br />
                                            </span>
                                            <span class="span1-1">
                                                고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서
                                                가입한
                                                <br />
                                                소비자피해보상보험 서비스를 이용하실 수 있습니다.
                                            </span>
                                        </span>
                                    </p>
                                    <div class="text-container">
                                        <div class="text-15 valign-text-middle notosanskr-light-coconut-12px">
                                            보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                        </div>
                                        <div class="text-16 valign-text-middle">
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