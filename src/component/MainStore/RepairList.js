import React from 'react'
import * as m from '../styles/StyledMain.tsx';
import img from "../assets/img/img.svg"
import '../styles/RepairList.css'


function RepairList() {
    return (
        <>
            <m.CarouselDiv>

                <input type="hidden" id="anPageName" name="page" value="repairlist" />
                <div class="container-center-horizontal">
                    <div class="repairlist screen">

                        <div class="overlap-group5">
                            <div class="background">
                                <div class="heading-2 valign-text-middle">수리 목록</div>
                                <div class="flex-row">
                                    <div class="frame-104">
                                        <div class="frame-105">
                                            <div class="text-4 valign-text-middle notosanskr-light-cotton-seed-20px">
                                                대분류
                                            </div>
                                            <img
                                                class="sort-down"
                                                src={require("../assets/img/sort-down@2x.png")}
                                                alt="Sort Down"
                                            />
                                        </div>
                                    </div>
                                    <div class="frame-container">
                                        <div class="frame-10">
                                            <div class="frame-105">
                                                <div class="text-4 valign-text-middle notosanskr-light-cotton-seed-20px">
                                                    중분류
                                                </div>
                                                <img
                                                    class="sort-down"
                                                    src={require("../assets/img/sort-down@2x.png")}
                                                    alt="Sort Down"
                                                />
                                            </div>
                                        </div>
                                        <div class="frame-10">
                                            <div class="frame-105">
                                                <div class="text-4 valign-text-middle notosanskr-light-cotton-seed-20px">
                                                    중분류
                                                </div>
                                                <img
                                                    class="sort-down"
                                                    src={require("../assets/img/sort-down@2x.png")}
                                                    alt="Sort Down"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="frame-110">
                                        <div class="frame-105">
                                            <div class="text-4 valign-text-middle notosanskr-light-cotton-seed-20px">
                                                가맹점
                                            </div>
                                            <img
                                                class="sort-down"
                                                src={require("../assets/img/sort-down@2x.png")}
                                                alt="Sort Down"
                                            />
                                        </div>
                                    </div>
                                    <div class="frame-107">
                                        <div class="text-48 valign-text-middle notosanskr-light-cotton-seed-20px">
                                            검색
                                        </div>
                                        <img class="img" src={img} alt="Img" />
                                    </div>
                                </div>
                                <div class="overlap-group2">
                                    <div class="horizontal-border-1"></div>
                                    <div class="frame-92">
                                        <div class="frame-87">
                                            <div class="cell-1 cell-5">
                                                <div class="text-8 valign-text-middle notosanskr-medium-shark-16px">
                                                    수리코드
                                                </div>
                                            </div>
                                            <div class="cell-2 cell-5">
                                                <div class="text-9 valign-text-middle notosanskr-medium-shark-16px">
                                                    카테고리
                                                </div>
                                            </div>
                                            <div class="cell-3 cell-5">
                                                <div class="text-10 valign-text-middle notosanskr-medium-shark-16px">
                                                    접수 날짜
                                                </div>
                                            </div>
                                            <div class="cell-4 cell-5">
                                                <div class="text-11 valign-text-middle notosanskr-medium-shark-16px">
                                                    수리유형
                                                </div>
                                            </div>
                                            <div class="cell">
                                                <div class="text-12 valign-text-middle notosanskr-medium-shark-16px">
                                                    가맹점
                                                </div>
                                            </div>
                                            <div class="cell">
                                                <div class="text-13 valign-text-middle notosanskr-medium-shark-16px">
                                                    수리 상태
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frame">
                                            <div class="data">
                                                <div class="a12345 valign-text-middle notosanskr-light-shark-16px">
                                                    A12345
                                                </div>
                                            </div>
                                            <div class="data-1 data-5">
                                                <div class="frame-89">
                                                    <div class="text valign-text-middle notosanskr-light-shark-16px">
                                                        머신/소도구
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="data-2 data-5">
                                                <div class="date valign-text-middle notosanskr-light-shark-16px">
                                                    2024/01/01
                                                </div>
                                            </div>
                                            <div class="data-3 data-5">
                                                <div class="text-1 valign-text-middle notosanskr-light-shark-16px">
                                                    기기 세척
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="strong-8900 valign-text-middle notosanskr-light-shark-16px">
                                                    독산점
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                                                    수리중
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frame">
                                            <div class="data">
                                                <div class="a12345 valign-text-middle notosanskr-light-shark-16px">
                                                    A12345
                                                </div>
                                            </div>
                                            <div class="data-1 data-5">
                                                <div class="frame-89">
                                                    <div class="text valign-text-middle notosanskr-light-shark-16px">
                                                        머신/소도구
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="data-2 data-5">
                                                <div class="date valign-text-middle notosanskr-light-shark-16px">
                                                    2024/01/01
                                                </div>
                                            </div>
                                            <div class="data-3 data-5">
                                                <div class="text-1 valign-text-middle notosanskr-light-shark-16px">
                                                    기기 세척
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="strong-8900 valign-text-middle notosanskr-light-shark-16px">
                                                    독산점
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                                                    수리중
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frame">
                                            <div class="data">
                                                <div class="a12345 valign-text-middle notosanskr-light-shark-16px">
                                                    A12345
                                                </div>
                                            </div>
                                            <div class="data-1 data-5">
                                                <div class="frame-89">
                                                    <div class="text valign-text-middle notosanskr-light-shark-16px">
                                                        머신/소도구
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="data-2 data-5">
                                                <div class="date valign-text-middle notosanskr-light-shark-16px">
                                                    2024/01/01
                                                </div>
                                            </div>
                                            <div class="data-3 data-5">
                                                <div class="text-1 valign-text-middle notosanskr-light-shark-16px">
                                                    기기 세척
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="strong-8900 valign-text-middle notosanskr-light-shark-16px">
                                                    독산점
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                                                    수리중
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frame">
                                            <div class="data">
                                                <div class="a12345 valign-text-middle notosanskr-light-shark-16px">
                                                    A12345
                                                </div>
                                            </div>
                                            <div class="data-1 data-5">
                                                <div class="frame-89">
                                                    <div class="text valign-text-middle notosanskr-light-shark-16px">
                                                        머신/소도구
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="data-2 data-5">
                                                <div class="date valign-text-middle notosanskr-light-shark-16px">
                                                    2024/01/01
                                                </div>
                                            </div>
                                            <div class="data-3 data-5">
                                                <div class="text-1 valign-text-middle notosanskr-light-shark-16px">
                                                    기기 세척
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="strong-8900 valign-text-middle notosanskr-light-shark-16px">
                                                    독산점
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                                                    수리중
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frame">
                                            <div class="data">
                                                <div class="a12345 valign-text-middle notosanskr-light-shark-16px">
                                                    A12345
                                                </div>
                                            </div>
                                            <div class="data-1 data-5">
                                                <div class="frame-89">
                                                    <div class="text valign-text-middle notosanskr-light-shark-16px">
                                                        머신/소도구
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="data-2 data-5">
                                                <div class="date valign-text-middle notosanskr-light-shark-16px">
                                                    2024/01/01
                                                </div>
                                            </div>
                                            <div class="data-3 data-5">
                                                <div class="text-1 valign-text-middle notosanskr-light-shark-16px">
                                                    기기 세척
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="strong-8900 valign-text-middle notosanskr-light-shark-16px">
                                                    독산점
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                                                    수리중
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frame">
                                            <div class="data">
                                                <div class="a12345 valign-text-middle notosanskr-light-shark-16px">
                                                    A12345
                                                </div>
                                            </div>
                                            <div class="data-1 data-5">
                                                <div class="frame-89">
                                                    <div class="text valign-text-middle notosanskr-light-shark-16px">
                                                        머신/소도구
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="data-2 data-5">
                                                <div class="date valign-text-middle notosanskr-light-shark-16px">
                                                    2024/01/01
                                                </div>
                                            </div>
                                            <div class="data-3 data-5">
                                                <div class="text-1 valign-text-middle notosanskr-light-shark-16px">
                                                    기기 세척
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="strong-8900 valign-text-middle notosanskr-light-shark-16px">
                                                    독산점
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                                                    수리중
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frame">
                                            <div class="data">
                                                <div class="a12345 valign-text-middle notosanskr-light-shark-16px">
                                                    A12345
                                                </div>
                                            </div>
                                            <div class="data-1 data-5">
                                                <div class="frame-89">
                                                    <div class="text valign-text-middle notosanskr-light-shark-16px">
                                                        머신/소도구
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="data-2 data-5">
                                                <div class="date valign-text-middle notosanskr-light-shark-16px">
                                                    2024/01/01
                                                </div>
                                            </div>
                                            <div class="data-3 data-5">
                                                <div class="text-1 valign-text-middle notosanskr-light-shark-16px">
                                                    기기 세척
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="strong-8900 valign-text-middle notosanskr-light-shark-16px">
                                                    독산점
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                                                    수리중
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frame">
                                            <div class="data">
                                                <div class="a12345 valign-text-middle notosanskr-light-shark-16px">
                                                    A12345
                                                </div>
                                            </div>
                                            <div class="data-1 data-5">
                                                <div class="frame-89">
                                                    <div class="text valign-text-middle notosanskr-light-shark-16px">
                                                        머신/소도구
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="data-2 data-5">
                                                <div class="date valign-text-middle notosanskr-light-shark-16px">
                                                    2024/01/01
                                                </div>
                                            </div>
                                            <div class="data-3 data-5">
                                                <div class="text-1 valign-text-middle notosanskr-light-shark-16px">
                                                    기기 세척
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="strong-8900 valign-text-middle notosanskr-light-shark-16px">
                                                    독산점
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                                                    수리중
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frame">
                                            <div class="data">
                                                <div class="a12345 valign-text-middle notosanskr-light-shark-16px">
                                                    A12345
                                                </div>
                                            </div>
                                            <div class="data-1 data-5">
                                                <div class="frame-89">
                                                    <div class="text valign-text-middle notosanskr-light-shark-16px">
                                                        머신/소도구
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="data-2 data-5">
                                                <div class="date valign-text-middle notosanskr-light-shark-16px">
                                                    2024/01/01
                                                </div>
                                            </div>
                                            <div class="data-3 data-5">
                                                <div class="text-1 valign-text-middle notosanskr-light-shark-16px">
                                                    기기 세척
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="strong-8900 valign-text-middle notosanskr-light-shark-16px">
                                                    독산점
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                                                    수리중
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frame">
                                            <div class="data">
                                                <div class="a12345 valign-text-middle notosanskr-light-shark-16px">
                                                    A12345
                                                </div>
                                            </div>
                                            <div class="data-1 data-5">
                                                <div class="frame-89">
                                                    <div class="text valign-text-middle notosanskr-light-shark-16px">
                                                        머신/소도구
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="data-2 data-5">
                                                <div class="date valign-text-middle notosanskr-light-shark-16px">
                                                    2024/01/01
                                                </div>
                                            </div>
                                            <div class="data-3 data-5">
                                                <div class="text-1 valign-text-middle notosanskr-light-shark-16px">
                                                    기기 세척
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="strong-8900 valign-text-middle notosanskr-light-shark-16px">
                                                    독산점
                                                </div>
                                            </div>
                                            <div class="data-4 data-5">
                                                <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                                                    수리중
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-row-1 flex-row-3">
                                    <div class="component-2 component">
                                        <div class="text-5 valign-text-middle">1</div>
                                    </div>
                                    <div class="component-3 component">
                                        <div class="text-14 valign-text-middle montserrat-light-pumice-16px">
                                            2
                                        </div>
                                    </div>
                                    <div class="component-4 component">
                                        <div class="text-3 valign-text-middle montserrat-light-pumice-16px">
                                            3
                                        </div>
                                    </div>
                                    <div class="component-5 component">
                                        <div class="text-15 valign-text-middle montserrat-light-pumice-16px">
                                            4
                                        </div>
                                    </div>
                                    <div class="overlap-group3">
                                        <div class="component-1 component">
                                            <div class="text-3 valign-text-middle montserrat-light-pumice-16px">
                                                5
                                            </div>
                                        </div>
                                        <div class="border-1">
                                            <img
                                                class="image"
                                                src={require("../assets/img/image@2x.png")}
                                                alt="Image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer class="footer">
                                <div class="footer-contents">
                                    <div class="flex-row-2 flex-row-3">
                                        <div class="flex-col">
                                            <div class="overlap-group-1">
                                                <p class="x valign-text-middle notosanskr-light-coconut-12px">
                                                    상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                                                    서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동,
                                                    센터필드)
                                                    <br />
                                                    사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 :
                                                    제2009호-서울강남-00847호
                                                </p>
                                                <div class="text-49 valign-text-middle">
                                                    사업자정보확인
                                                </div>
                                                <p class="text-50 valign-text-middle notosanskr-light-coconut-12px">
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
                                            <div class="text-51 valign-text-middle notosanskr-light-coconut-12px">
                                                보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                            </div>
                                            <div class="text-52 valign-text-middle">
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

export default RepairList