import * as m from "../styles/StyledMain.tsx";
import styles from "../styles/ItemListCopy.module.css";
import React from "react";
import img from "../assets/img/img.svg";
import * as s from "../styles/StyledStore.tsx";

function ItemListCopy() {
  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="ItemListCopy" />
        <div className="container-center-horizontal">
          <div className="ItemListCopy screen">
            <div className="background">
              <div className="heading-2 valign-text-middle">상품 목록</div>
              <div className="flex-row">
                <div className="frame-104">
                  <div className="frame-105">
                    <div className="text valign-text-middle notosanskr-light-cotton-seed-20px">
                      대분류
                    </div>
                    <img
                      className="sort-down"
                      src={require("img/sort-down@2x.png")}
                      alt="Sort Down"
                    />
                  </div>
                </div>
                <div className="frame-10">
                  <div className="frame-105">
                    <div className="text valign-text-middle notosanskr-light-cotton-seed-20px">
                      중분류
                    </div>
                    <img
                      className="sort-down"
                      src={require("img/sort-down@2x.png")}
                      alt="Sort Down"
                    />
                  </div>
                </div>
                <div className="frame-10">
                  <div className="frame-105">
                    <div className="text valign-text-middle notosanskr-light-cotton-seed-20px">
                      소분류
                    </div>
                    <img
                      className="sort-down"
                      src={require("img/sort-down@2x.png")}
                      alt="Sort Down"
                    />
                  </div>
                </div>
                <div className="frame-107">
                  <div className="text-51 valign-text-middle notosanskr-light-cotton-seed-20px">
                    검색
                  </div>
                  <img className="img" src={img} alt="Img" />
                </div>
                <div className="text-47 valign-text-middle">총102건</div>
              </div>
              <div className="overlap-group2">
                <div className="horizontal-border-1"></div>
                <div className="frame-92">
                  <div className="frame-87">
                    <div className="cell">
                      <div className="text-1-1 valign-text-middle notosanskr-medium-shark-16px">
                        카테고리
                      </div>
                    </div>
                    <div className="cell-1 cell-6">
                      <div className="text-2-1 valign-text-middle notosanskr-medium-shark-16px">
                        상품 코드
                      </div>
                    </div>
                    <div className="cell-2 cell-6">
                      <div className="text-3-1 valign-text-middle notosanskr-medium-shark-16px">
                        상품정보
                      </div>
                    </div>
                    <div className="cell-3 cell-6">
                      <div className="text-4-1 valign-text-middle notosanskr-medium-shark-16px">
                        단위수량
                      </div>
                    </div>
                    <div className="cell-4 cell-6">
                      <div className="text-5-1 valign-text-middle notosanskr-medium-shark-16px">
                        공급가
                      </div>
                    </div>
                    <div className="cell-5 cell-6">
                      <div className="text-6 valign-text-middle notosanskr-medium-shark-16px">
                        보관상태
                      </div>
                    </div>
                  </div>
                  <div className="frame">
                    <div className="data">
                      <div className="text-1 valign-text-middle notosanskr-light-shark-16px">
                        가공자재/원두/디카페인
                      </div>
                    </div>
                    <div className="frame-88">
                      <div className="a12345 valign-text-middle notosanskr-light-shark-16px">
                        A12345
                      </div>
                    </div>
                    <div className="data-1 data-5">
                      <div className="frame-90">
                        <div className="x39607d95d144c4751fedd9d44017d8b7jpg"></div>
                        <div className="frame-89">
                          <div className="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-2 data-5">
                      <div className="number valign-text-middle notosanskr-light-shark-16px">
                        30
                      </div>
                    </div>
                    <div className="data-3 data-5">
                      <div className="text-3 valign-text-middle notosanskr-light-shark-16px">
                        10,000원
                      </div>
                    </div>
                    <div className="data-4 data-5">
                      <div className="text-4 valign-text-middle notosanskr-light-shark-16px">
                        상온
                      </div>
                    </div>
                  </div>
                  <div className="frame">
                    <div className="data">
                      <div className="text-1 valign-text-middle notosanskr-light-shark-16px">
                        가공자재/원두/디카페인
                      </div>
                    </div>
                    <div className="frame-88">
                      <div className="a12345 valign-text-middle notosanskr-light-shark-16px">
                        A12345
                      </div>
                    </div>
                    <div className="data-1 data-5">
                      <div className="frame-90">
                        <div className="x39607d95d144c4751fedd9d44017d8b7jpg"></div>
                        <div className="frame-89">
                          <div className="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-2 data-5">
                      <div className="number valign-text-middle notosanskr-light-shark-16px">
                        30
                      </div>
                    </div>
                    <div className="data-3 data-5">
                      <div className="text-3 valign-text-middle notosanskr-light-shark-16px">
                        10,000원
                      </div>
                    </div>
                    <div className="data-4 data-5">
                      <div className="text-4 valign-text-middle notosanskr-light-shark-16px">
                        상온
                      </div>
                    </div>
                  </div>
                  <div className="frame">
                    <div className="data">
                      <div className="text-1 valign-text-middle notosanskr-light-shark-16px">
                        가공자재/원두/디카페인
                      </div>
                    </div>
                    <div className="frame-88">
                      <div className="a12345 valign-text-middle notosanskr-light-shark-16px">
                        A12345
                      </div>
                    </div>
                    <div className="data-1 data-5">
                      <div className="frame-90">
                        <div className="x39607d95d144c4751fedd9d44017d8b7jpg"></div>
                        <div className="frame-89">
                          <div className="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-2 data-5">
                      <div className="number valign-text-middle notosanskr-light-shark-16px">
                        30
                      </div>
                    </div>
                    <div className="data-3 data-5">
                      <div className="text-3 valign-text-middle notosanskr-light-shark-16px">
                        10,000원
                      </div>
                    </div>
                    <div className="data-4 data-5">
                      <div className="text-4 valign-text-middle notosanskr-light-shark-16px">
                        상온
                      </div>
                    </div>
                  </div>
                  <div className="frame">
                    <div className="data">
                      <div className="text-1 valign-text-middle notosanskr-light-shark-16px">
                        가공자재/원두/디카페인
                      </div>
                    </div>
                    <div className="frame-88">
                      <div className="a12345 valign-text-middle notosanskr-light-shark-16px">
                        A12345
                      </div>
                    </div>
                    <div className="data-1 data-5">
                      <div className="frame-90">
                        <div className="x39607d95d144c4751fedd9d44017d8b7jpg"></div>
                        <div className="frame-89">
                          <div className="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-2 data-5">
                      <div className="number valign-text-middle notosanskr-light-shark-16px">
                        30
                      </div>
                    </div>
                    <div className="data-3 data-5">
                      <div className="text-3 valign-text-middle notosanskr-light-shark-16px">
                        10,000원
                      </div>
                    </div>
                    <div className="data-4 data-5">
                      <div className="text-4 valign-text-middle notosanskr-light-shark-16px">
                        상온
                      </div>
                    </div>
                  </div>
                  <div className="frame">
                    <div className="data">
                      <div className="text-1 valign-text-middle notosanskr-light-shark-16px">
                        가공자재/원두/디카페인
                      </div>
                    </div>
                    <div className="frame-88">
                      <div className="a12345 valign-text-middle notosanskr-light-shark-16px">
                        A12345
                      </div>
                    </div>
                    <div className="data-1 data-5">
                      <div className="frame-90">
                        <div className="x39607d95d144c4751fedd9d44017d8b7jpg"></div>
                        <div className="frame-89">
                          <div className="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-2 data-5">
                      <div className="number valign-text-middle notosanskr-light-shark-16px">
                        30
                      </div>
                    </div>
                    <div className="data-3 data-5">
                      <div className="text-3 valign-text-middle notosanskr-light-shark-16px">
                        10,000원
                      </div>
                    </div>
                    <div className="data-4 data-5">
                      <div className="text-4 valign-text-middle notosanskr-light-shark-16px">
                        상온
                      </div>
                    </div>
                  </div>
                  <div className="frame">
                    <div className="data">
                      <div className="text-1 valign-text-middle notosanskr-light-shark-16px">
                        가공자재/원두/디카페인
                      </div>
                    </div>
                    <div className="frame-88">
                      <div className="a12345 valign-text-middle notosanskr-light-shark-16px">
                        A12345
                      </div>
                    </div>
                    <div className="data-1 data-5">
                      <div className="frame-90">
                        <div className="x39607d95d144c4751fedd9d44017d8b7jpg"></div>
                        <div className="frame-89">
                          <div className="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-2 data-5">
                      <div className="number valign-text-middle notosanskr-light-shark-16px">
                        30
                      </div>
                    </div>
                    <div className="data-3 data-5">
                      <div className="text-3 valign-text-middle notosanskr-light-shark-16px">
                        10,000원
                      </div>
                    </div>
                    <div className="data-4 data-5">
                      <div className="text-4 valign-text-middle notosanskr-light-shark-16px">
                        상온
                      </div>
                    </div>
                  </div>
                  <div className="frame">
                    <div className="data">
                      <div className="text-1 valign-text-middle notosanskr-light-shark-16px">
                        가공자재/원두/디카페인
                      </div>
                    </div>
                    <div className="frame-88">
                      <div className="a12345 valign-text-middle notosanskr-light-shark-16px">
                        A12345
                      </div>
                    </div>
                    <div className="data-1 data-5">
                      <div className="frame-90">
                        <div className="x39607d95d144c4751fedd9d44017d8b7jpg"></div>
                        <div className="frame-89">
                          <div className="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-2 data-5">
                      <div className="number valign-text-middle notosanskr-light-shark-16px">
                        30
                      </div>
                    </div>
                    <div className="data-3 data-5">
                      <div className="text-3 valign-text-middle notosanskr-light-shark-16px">
                        10,000원
                      </div>
                    </div>
                    <div className="data-4 data-5">
                      <div className="text-4 valign-text-middle notosanskr-light-shark-16px">
                        상온
                      </div>
                    </div>
                  </div>
                  <div className="frame">
                    <div className="data">
                      <div className="text-1 valign-text-middle notosanskr-light-shark-16px">
                        가공자재/원두/디카페인
                      </div>
                    </div>
                    <div className="frame-88">
                      <div className="a12345 valign-text-middle notosanskr-light-shark-16px">
                        A12345
                      </div>
                    </div>
                    <div className="data-1 data-5">
                      <div className="frame-90">
                        <div className="x39607d95d144c4751fedd9d44017d8b7jpg"></div>
                        <div className="frame-89">
                          <div className="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-2 data-5">
                      <div className="number valign-text-middle notosanskr-light-shark-16px">
                        30
                      </div>
                    </div>
                    <div className="data-3 data-5">
                      <div className="text-3 valign-text-middle notosanskr-light-shark-16px">
                        10,000원
                      </div>
                    </div>
                    <div className="data-4 data-5">
                      <div className="text-4 valign-text-middle notosanskr-light-shark-16px">
                        상온
                      </div>
                    </div>
                  </div>
                  <div className="frame">
                    <div className="data">
                      <div className="text-1 valign-text-middle notosanskr-light-shark-16px">
                        가공자재/원두/디카페인
                      </div>
                    </div>
                    <div className="frame-88">
                      <div className="a12345 valign-text-middle notosanskr-light-shark-16px">
                        A12345
                      </div>
                    </div>
                    <div className="data-1 data-5">
                      <div className="frame-90">
                        <div className="x39607d95d144c4751fedd9d44017d8b7jpg"></div>
                        <div className="frame-89">
                          <div className="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-2 data-5">
                      <div className="number valign-text-middle notosanskr-light-shark-16px">
                        30
                      </div>
                    </div>
                    <div className="data-3 data-5">
                      <div className="text-3 valign-text-middle notosanskr-light-shark-16px">
                        10,000원
                      </div>
                    </div>
                    <div className="data-4 data-5">
                      <div className="text-4 valign-text-middle notosanskr-light-shark-16px">
                        상온
                      </div>
                    </div>
                  </div>
                  <div className="frame">
                    <div className="data">
                      <div className="text-1 valign-text-middle notosanskr-light-shark-16px">
                        가공자재/원두/디카페인
                      </div>
                    </div>
                    <div className="frame-88">
                      <div className="a12345 valign-text-middle notosanskr-light-shark-16px">
                        A12345
                      </div>
                    </div>
                    <div className="data-1 data-5">
                      <div className="frame-90">
                        <div className="x39607d95d144c4751fedd9d44017d8b7jpg"></div>
                        <div className="frame-89">
                          <div className="text-2 valign-text-middle notosanskr-light-shark-16px">
                            과테말라 코반 스페셜티
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="data-2 data-5">
                      <div className="number valign-text-middle notosanskr-light-shark-16px">
                        30
                      </div>
                    </div>
                    <div className="data-3 data-5">
                      <div className="text-3 valign-text-middle notosanskr-light-shark-16px">
                        10,000원
                      </div>
                    </div>
                    <div className="data-4 data-5">
                      <div className="text-4 valign-text-middle notosanskr-light-shark-16px">
                        상온
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-row-1 flex-row-3">
                <div className="component-2 component">
                  <div className="text-7 valign-text-middle">1</div>
                </div>
                <div className="component-3 component">
                  <div className="text-8 valign-text-middle montserrat-light-pumice-16px">
                    2
                  </div>
                </div>
                <div className="component-4 component">
                  <div className="text-5 valign-text-middle montserrat-light-pumice-16px">
                    3
                  </div>
                </div>
                <div className="component-5 component">
                  <div className="text-9 valign-text-middle montserrat-light-pumice-16px">
                    4
                  </div>
                </div>
                <div className="overlap-group1">
                  <div className="component-1 component">
                    <div className="text-5 valign-text-middle montserrat-light-pumice-16px">
                      5
                    </div>
                  </div>
                  <div className="border-1">
                    <img
                      className="image"
                      src={require("img/image@2x.png")}
                      alt="Image"
                    />
                  </div>
                </div>
              </div>
              <div className="button">
                <div className="overlap-group">
                  <div className="text-52 valign-text-middle">메뉴 등록</div>
                  <div className="small-btn_brown">
                    <div className="text-53 valign-text-middle themewagongithubiosemanticheading-6">
                      메뉴등록
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="footer">
              <div className="footer-contents">
                <div className="flex-row-2 flex-row-3">
                  <div className="flex-col">
                    <div className="overlap-group-1">
                      <p className="x valign-text-middle notosanskr-light-coconut-12px">
                        상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                        서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동,
                        센터필드)
                        <br />
                        사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 :
                        제2009호-서울강남-00847호
                      </p>
                      <div className="text-61 valign-text-middle">
                        사업자정보확인
                      </div>
                      <p className="text-62 valign-text-middle notosanskr-light-coconut-12px">
                        │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜
                        더블유컨셉코리아
                      </p>
                    </div>
                    <p className="copyright valign-text-middle notosanskr-light-coconut-12px">
                      COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                    </p>
                  </div>
                  <div className="vertical-divider-1"></div>
                </div>
                <div className="flex-col-1">
                  <p className="heading-3 valign-text-middle">
                    <span>
                      <span className="span0">
                        소비자피해보상보험
                        <br />
                      </span>
                      <span className="span1-1">
                        고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서
                        가입한
                        <br />
                        소비자피해보상보험 서비스를 이용하실 수 있습니다.
                      </span>
                    </span>
                  </p>
                  <div className="text-container">
                    <div className="text-63 valign-text-middle notosanskr-light-coconut-12px">
                      보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                    </div>
                    <div className="text-64 valign-text-middle">
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
