import * as m from "../styles/StyledMain.tsx";
import styles from "../styles/MenuListCopy.module.css";
import img from "../assets/img/img.svg";
import React from "react";

function MenuList() {
  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="MenuListCopy" />
        <div class="container-center-horizontal">
          <div class="MenuListCopy screen">
            <header class="header">
              <div class="overlap-group1">
                <div class="overlap-group">
                  <div class="container">
                    <div class="sidebar">
                      <div class="border"></div>
                      <div class="border"></div>
                      <div class="horizontal-border"></div>
                    </div>
                    <div class="navbar">
                      <div class="navbar-link-text-4 valign-text-middle navbar-link-text notosanskr-normal-shark-18px">
                        가맹점관리
                      </div>
                      <div class="navbar-link-text-1 valign-text-middle navbar-link-text notosanskr-normal-shark-18px">
                        판매상품관리
                      </div>
                      <div class="navbar-link-text-5 valign-text-middle navbar-link-text notosanskr-normal-shark-18px">
                        메뉴관리
                      </div>
                      <div class="navbar-link-text-2 valign-text-middle navbar-link-text">
                        매출관리
                      </div>
                      <div class="navbar-link-text-3 valign-text-middle navbar-link-text notosanskr-normal-shark-18px">
                        커뮤니티
                      </div>
                    </div>
                    <img class="image-1" src="img/image-1.png" alt="image 1" />
                    <img class="group" src="img/group@2x.png" alt="Group" />
                  </div>
                  <h1 class="cc valign-text-middle">
                    <span>
                      <span class="span">C</span>
                      <span class="span1">ᴗ</span>
                      <span class="span">C</span>{" "}
                    </span>
                  </h1>
                </div>
                <div class="sidemenu">
                  <div class="text-7 valign-text-middle">본사1</div>
                  <div class="vertical-divider"></div>
                  <div class="text-6 valign-text-middle">로그아웃</div>
                </div>
              </div>
            </header>
            <div class="background">
              <div class="heading-2 valign-text-middle">메뉴 목록</div>
              <div class="flex-row flex">
                <div class="frame-104">
                  <div class="frame-105">
                    <div class="text-55 valign-text-middle">분류</div>
                  </div>
                  <img
                    class="sort-down"
                    src="img/sort-down@2x.png"
                    alt="Sort Down"
                  />
                </div>
                <div class="frame-107">
                  <div class="text-56 valign-text-middle">검색</div>
                  <img class="img" src="img/img.svg" alt="Img" />
                </div>
                <div class="text-59 valign-text-middle">총102건</div>
              </div>
              <div class="overlap-group2">
                <div class="horizontal-border-1"></div>
                <div class="frame-92">
                  <div class="frame-87">
                    <div class="cell-1 cell-4">
                      <div class="text-8 valign-text-middle notosanskr-medium-shark-16px">
                        카테고리
                      </div>
                    </div>
                    <div class="cell-2 cell-4">
                      <div class="text-9 valign-text-middle notosanskr-medium-shark-16px">
                        상품정보
                      </div>
                    </div>
                    <div class="cell-3 cell-4">
                      <div class="text-10 valign-text-middle notosanskr-medium-shark-16px">
                        가격
                      </div>
                    </div>
                    <div class="cell">
                      <div class="text-1 valign-text-middle notosanskr-medium-shark-16px">
                        용량
                      </div>
                    </div>
                    <div class="cell">
                      <div class="text-12 valign-text-middle notosanskr-medium-shark-16px">
                        탄수화물
                      </div>
                    </div>
                    <div class="cell">
                      <div class="text-1 valign-text-middle notosanskr-medium-shark-16px">
                        당류
                      </div>
                    </div>
                    <div class="cell">
                      <div class="text-14 valign-text-middle notosanskr-medium-shark-16px">
                        나트륨
                      </div>
                    </div>
                  </div>
                  <div class="frame">
                    <div class="data">
                      <div class="text valign-text-middle notosanskr-light-shark-16px">
                        스무디
                      </div>
                    </div>
                    <div class="data-1 data-4">
                      <div class="frame-91">
                        <div class="x39607d95d144c4751fedd9d44017d8b7jpg">
                          <img
                            class="x2024-10-28-103829-1"
                            src="img/------2024-10-28-103829-1.png"
                            alt="2024-10-28 103829 1"
                          />
                        </div>
                        <div class="frame-89">
                          <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="data-2 data-4">
                      <div class="text-3 valign-text-middle notosanskr-light-shark-16px">
                        5,000원
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x591ml valign-text-middle notosanskr-light-shark-16px">
                        591ml
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="text-18 valign-text-middle notosanskr-light-shark-16px">
                        -
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x63g valign-text-middle notosanskr-light-shark-16px">
                        63g
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x102mg valign-text-middle notosanskr-light-shark-16px">
                        102mg
                      </div>
                    </div>
                  </div>
                  <div class="frame">
                    <div class="data">
                      <div class="text valign-text-middle notosanskr-light-shark-16px">
                        스무디
                      </div>
                    </div>
                    <div class="data-1 data-4">
                      <div class="frame-91">
                        <div class="x39607d95d144c4751fedd9d44017d8b7jpg">
                          <img
                            class="x2024-10-28-103829-1"
                            src="img/------2024-10-28-103829-1.png"
                            alt="2024-10-28 103829 1"
                          />
                        </div>
                        <div class="frame-89">
                          <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="data-2 data-4">
                      <div class="text-3 valign-text-middle notosanskr-light-shark-16px">
                        5,000원
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x591ml valign-text-middle notosanskr-light-shark-16px">
                        591ml
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="text-22 valign-text-middle notosanskr-light-shark-16px">
                        -
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x63g-10 valign-text-middle notosanskr-light-shark-16px">
                        63g
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x102mg valign-text-middle notosanskr-light-shark-16px">
                        102mg
                      </div>
                    </div>
                  </div>
                  <div class="frame">
                    <div class="data">
                      <div class="text valign-text-middle notosanskr-light-shark-16px">
                        스무디
                      </div>
                    </div>
                    <div class="data-1 data-4">
                      <div class="frame-91">
                        <div class="x39607d95d144c4751fedd9d44017d8b7jpg">
                          <img
                            class="x2024-10-28-103829-1"
                            src="img/------2024-10-28-103829-1.png"
                            alt="2024-10-28 103829 1"
                          />
                        </div>
                        <div class="frame-89">
                          <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="data-2 data-4">
                      <div class="text-3 valign-text-middle notosanskr-light-shark-16px">
                        5,000원
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x591ml valign-text-middle notosanskr-light-shark-16px">
                        591ml
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="text-26 valign-text-middle notosanskr-light-shark-16px">
                        -
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x63g-10 valign-text-middle notosanskr-light-shark-16px">
                        63g
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x102mg valign-text-middle notosanskr-light-shark-16px">
                        102mg
                      </div>
                    </div>
                  </div>
                  <div class="frame">
                    <div class="data">
                      <div class="text valign-text-middle notosanskr-light-shark-16px">
                        스무디
                      </div>
                    </div>
                    <div class="data-1 data-4">
                      <div class="frame-91">
                        <div class="x39607d95d144c4751fedd9d44017d8b7jpg">
                          <img
                            class="x2024-10-28-103829-1"
                            src="img/------2024-10-28-103829-1.png"
                            alt="2024-10-28 103829 1"
                          />
                        </div>
                        <div class="frame-89">
                          <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="data-2 data-4">
                      <div class="text-3 valign-text-middle notosanskr-light-shark-16px">
                        5,000원
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x591ml valign-text-middle notosanskr-light-shark-16px">
                        591ml
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="text-30 valign-text-middle notosanskr-light-shark-16px">
                        -
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x63g-10 valign-text-middle notosanskr-light-shark-16px">
                        63g
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x102mg valign-text-middle notosanskr-light-shark-16px">
                        102mg
                      </div>
                    </div>
                  </div>
                  <div class="frame">
                    <div class="data">
                      <div class="text valign-text-middle notosanskr-light-shark-16px">
                        스무디
                      </div>
                    </div>
                    <div class="data-1 data-4">
                      <div class="frame-91">
                        <div class="x39607d95d144c4751fedd9d44017d8b7jpg">
                          <img
                            class="x2024-10-28-103829-1"
                            src="img/------2024-10-28-103829-1.png"
                            alt="2024-10-28 103829 1"
                          />
                        </div>
                        <div class="frame-89">
                          <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="data-2 data-4">
                      <div class="text-3 valign-text-middle notosanskr-light-shark-16px">
                        5,000원
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x591ml valign-text-middle notosanskr-light-shark-16px">
                        591ml
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="text-34 valign-text-middle notosanskr-light-shark-16px">
                        -
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x63g-10 valign-text-middle notosanskr-light-shark-16px">
                        63g
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x102mg valign-text-middle notosanskr-light-shark-16px">
                        102mg
                      </div>
                    </div>
                  </div>
                  <div class="frame">
                    <div class="data">
                      <div class="text valign-text-middle notosanskr-light-shark-16px">
                        스무디
                      </div>
                    </div>
                    <div class="data-1 data-4">
                      <div class="frame-91">
                        <div class="x39607d95d144c4751fedd9d44017d8b7jpg">
                          <img
                            class="x2024-10-28-103829-1"
                            src="img/------2024-10-28-103829-1.png"
                            alt="2024-10-28 103829 1"
                          />
                        </div>
                        <div class="frame-89">
                          <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="data-2 data-4">
                      <div class="text-3 valign-text-middle notosanskr-light-shark-16px">
                        5,000원
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x591ml valign-text-middle notosanskr-light-shark-16px">
                        591ml
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="text-38 valign-text-middle notosanskr-light-shark-16px">
                        -
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x63g-10 valign-text-middle notosanskr-light-shark-16px">
                        63g
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x102mg valign-text-middle notosanskr-light-shark-16px">
                        102mg
                      </div>
                    </div>
                  </div>
                  <div class="frame">
                    <div class="data">
                      <div class="text valign-text-middle notosanskr-light-shark-16px">
                        스무디
                      </div>
                    </div>
                    <div class="data-1 data-4">
                      <div class="frame-91">
                        <div class="x39607d95d144c4751fedd9d44017d8b7jpg">
                          <img
                            class="x2024-10-28-103829-1"
                            src="img/------2024-10-28-103829-1.png"
                            alt="2024-10-28 103829 1"
                          />
                        </div>
                        <div class="frame-89">
                          <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="data-2 data-4">
                      <div class="text-3 valign-text-middle notosanskr-light-shark-16px">
                        5,000원
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x591ml valign-text-middle notosanskr-light-shark-16px">
                        591ml
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="text-42 valign-text-middle notosanskr-light-shark-16px">
                        -
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x63g-10 valign-text-middle notosanskr-light-shark-16px">
                        63g
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x102mg valign-text-middle notosanskr-light-shark-16px">
                        102mg
                      </div>
                    </div>
                  </div>
                  <div class="frame">
                    <div class="data">
                      <div class="text valign-text-middle notosanskr-light-shark-16px">
                        스무디
                      </div>
                    </div>
                    <div class="data-1 data-4">
                      <div class="frame-91">
                        <div class="x39607d95d144c4751fedd9d44017d8b7jpg">
                          <img
                            class="x2024-10-28-103829-1"
                            src="img/------2024-10-28-103829-1.png"
                            alt="2024-10-28 103829 1"
                          />
                        </div>
                        <div class="frame-89">
                          <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="data-2 data-4">
                      <div class="text-3 valign-text-middle notosanskr-light-shark-16px">
                        5,000원
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x591ml valign-text-middle notosanskr-light-shark-16px">
                        591ml
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="text-46 valign-text-middle notosanskr-light-shark-16px">
                        -
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x63g-10 valign-text-middle notosanskr-light-shark-16px">
                        63g
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x102mg valign-text-middle notosanskr-light-shark-16px">
                        102mg
                      </div>
                    </div>
                  </div>
                  <div class="frame">
                    <div class="data">
                      <div class="text valign-text-middle notosanskr-light-shark-16px">
                        스무디
                      </div>
                    </div>
                    <div class="data-1 data-4">
                      <div class="frame-91">
                        <div class="x39607d95d144c4751fedd9d44017d8b7jpg">
                          <img
                            class="x2024-10-28-103829-1"
                            src="img/------2024-10-28-103829-1.png"
                            alt="2024-10-28 103829 1"
                          />
                        </div>
                        <div class="frame-89">
                          <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="data-2 data-4">
                      <div class="text-3 valign-text-middle notosanskr-light-shark-16px">
                        5,000원
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x591ml valign-text-middle notosanskr-light-shark-16px">
                        591ml
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="text-50 valign-text-middle notosanskr-light-shark-16px">
                        -
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x63g-10 valign-text-middle notosanskr-light-shark-16px">
                        63g
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x102mg valign-text-middle notosanskr-light-shark-16px">
                        102mg
                      </div>
                    </div>
                  </div>
                  <div class="frame">
                    <div class="data">
                      <div class="text valign-text-middle notosanskr-light-shark-16px">
                        스무디
                      </div>
                    </div>
                    <div class="data-1 data-4">
                      <div class="frame-91">
                        <div class="x39607d95d144c4751fedd9d44017d8b7jpg">
                          <img
                            class="x2024-10-28-103829-1"
                            src="img/------2024-10-28-103829-1.png"
                            alt="2024-10-28 103829 1"
                          />
                        </div>
                        <div class="frame-89">
                          <div class="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="data-2 data-4">
                      <div class="text-3 valign-text-middle notosanskr-light-shark-16px">
                        5,000원
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x591ml valign-text-middle notosanskr-light-shark-16px">
                        591ml
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="text-54 valign-text-middle notosanskr-light-shark-16px">
                        -
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x63g-10 valign-text-middle notosanskr-light-shark-16px">
                        63g
                      </div>
                    </div>
                    <div class="data-3 data-4">
                      <div class="x102mg valign-text-middle notosanskr-light-shark-16px">
                        102mg
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
                  <div class="text-11 valign-text-middle montserrat-light-pumice-16px">
                    2
                  </div>
                </div>
                <div class="component-4 component">
                  <div class="text-4 valign-text-middle montserrat-light-pumice-16px">
                    3
                  </div>
                </div>
                <div class="component-5 component">
                  <div class="text-13 valign-text-middle montserrat-light-pumice-16px">
                    4
                  </div>
                </div>
                <div class="overlap-group3">
                  <div class="component-1 component">
                    <div class="text-4 valign-text-middle montserrat-light-pumice-16px">
                      5
                    </div>
                  </div>
                  <div class="border-1">
                    <img class="image" src="img/image@2x.png" alt="Image" />
                  </div>
                </div>
              </div>
              <div class="button">
                <div class="overlap-group-1">
                  <div class="text-57 valign-text-middle">메뉴 등록</div>
                  <div class="small-btn_brown">
                    <div class="text-58 valign-text-middle themewagongithubiosemanticheading-6">
                      메뉴등록
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="footer">
              <div class="footer-contents">
                <div class="flex-row-2 flex-row-3">
                  <div class="flex-col flex">
                    <div class="overlap-group-2">
                      <p class="x valign-text-middle notosanskr-light-coconut-12px">
                        상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                        서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동,
                        센터필드)
                        <br />
                        사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 :
                        제2009호-서울강남-00847호
                      </p>
                      <div class="text-60 valign-text-middle">
                        사업자정보확인
                      </div>
                      <p class="text-61 valign-text-middle notosanskr-light-coconut-12px">
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
                    <div class="text-62 valign-text-middle notosanskr-light-coconut-12px">
                      보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                    </div>
                    <div class="text-63 valign-text-middle">
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
  );
}

export default MenuList;
