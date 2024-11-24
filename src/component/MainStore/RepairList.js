import React from "react";
import styles from "../styles/RepairList.module.css";
import * as m from "../styles/StyledMain.tsx";
import * as s from "../styles/StyledStore.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import img from "../assets/img/img.svg";
import { Option, Input } from "@material-tailwind/react";

function RepairListCopy() {
  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="RepairList" />
        <div className={styles["container-center-horizontal"]}>
          <div className={`${styles["RepairList"]} ${styles["screen"]}`}>
            <div className={styles["background"]}>
              <div
                className={`${styles["heading-2"]} ${styles["valign-text-middle"]}`}
              >
                수리 목록
              </div>
              <div
                className={`${styles["text-1-1"]} ${styles["valign-text-middle"]}`}
              >
                총102건
              </div>
              <div className={styles["frame-container"]}>
                <s.ButtonInnerDiv className="w-16 p-r-2">
                  <s.SelectStyle label="대분류">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                  </s.SelectStyle>
                </s.ButtonInnerDiv>

                <s.ButtonInnerDiv className="w-16 p-r-2">
                  <s.SelectStyle label="대분류">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                  </s.SelectStyle>
                </s.ButtonInnerDiv>

                <div style={{ marginLeft: "307px" }}>
                  <Input
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    label="매장명 검색"
                  />
                </div>
              </div>
              <div className={styles["overlap-group3"]}>
                <div className={styles["horizontal-border-1"]}></div>
                <div className={styles["frame-92"]}>
                  <div className={styles["frame-87"]}>
                    <div className={styles["cell"]}>
                      <div
                        className={`${styles["text-12"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        수리코드
                      </div>
                    </div>
                    <div className={`${styles["cell-1"]} ${styles["cell-6"]}`}>
                      <div
                        className={`${styles["text-13"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        카테고리
                      </div>
                    </div>
                    <div className={`${styles["cell-2"]} ${styles["cell-6"]}`}>
                      <div
                        className={`${styles["text-14"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        접수 날짜
                      </div>
                    </div>
                    <div className={`${styles["cell-3"]} ${styles["cell-6"]}`}>
                      <div
                        className={`${styles["text-15"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        수리유형
                      </div>
                    </div>
                    <div className={`${styles["cell-4"]} ${styles["cell-6"]}`}>
                      <div
                        className={`${styles["text-16"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        가맹점
                      </div>
                    </div>
                    <div className={`${styles["cell-5"]} ${styles["cell-6"]}`}>
                      <div
                        className={`${styles["text-17"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        수리 상태
                      </div>
                    </div>
                  </div>
                  <div className={styles["frame"]}>
                    <div className={styles["data"]}>
                      <div
                        className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        A12345
                      </div>
                    </div>
                    <div className={`${styles["data-1"]} ${styles["data-6"]}`}>
                      <div className={styles["frame-89"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          머신/소도구
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["data-2"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        2024/01/01
                      </div>
                    </div>
                    <div className={`${styles["data-3"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        기기 세척
                      </div>
                    </div>
                    <div className={`${styles["data-4"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        독산점
                      </div>
                    </div>
                    <div className={`${styles["data-5"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        수리중
                      </div>
                    </div>
                  </div>
                  <div className={styles["frame"]}>
                    <div className={styles["data"]}>
                      <div
                        className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        A12345
                      </div>
                    </div>
                    <div className={`${styles["data-1"]} ${styles["data-6"]}`}>
                      <div className={styles["frame-89"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          머신/소도구
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["data-2"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        2024/01/01
                      </div>
                    </div>
                    <div className={`${styles["data-3"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        기기 세척
                      </div>
                    </div>
                    <div className={`${styles["data-4"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        독산점
                      </div>
                    </div>
                    <div className={`${styles["data-5"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        수리중
                      </div>
                    </div>
                  </div>
                  <div className={styles["frame"]}>
                    <div className={styles["data"]}>
                      <div
                        className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        A12345
                      </div>
                    </div>
                    <div className={`${styles["data-1"]} ${styles["data-6"]}`}>
                      <div className={styles["frame-89"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          머신/소도구
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["data-2"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        2024/01/01
                      </div>
                    </div>
                    <div className={`${styles["data-3"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        기기 세척
                      </div>
                    </div>
                    <div className={`${styles["data-4"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        독산점
                      </div>
                    </div>
                    <div className={`${styles["data-5"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        수리중
                      </div>
                    </div>
                  </div>
                  <div className={styles["frame"]}>
                    <div className={styles["data"]}>
                      <div
                        className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        A12345
                      </div>
                    </div>
                    <div className={`${styles["data-1"]} ${styles["data-6"]}`}>
                      <div className={styles["frame-89"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          머신/소도구
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["data-2"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        2024/01/01
                      </div>
                    </div>
                    <div className={`${styles["data-3"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        기기 세척
                      </div>
                    </div>
                    <div className={`${styles["data-4"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        독산점
                      </div>
                    </div>
                    <div className={`${styles["data-5"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        수리중
                      </div>
                    </div>
                  </div>
                  <div className={styles["frame"]}>
                    <div className={styles["data"]}>
                      <div
                        className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        A12345
                      </div>
                    </div>
                    <div className={`${styles["data-1"]} ${styles["data-6"]}`}>
                      <div className={styles["frame-89"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          머신/소도구
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["data-2"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        2024/01/01
                      </div>
                    </div>
                    <div className={`${styles["data-3"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        기기 세척
                      </div>
                    </div>
                    <div className={`${styles["data-4"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        독산점
                      </div>
                    </div>
                    <div className={`${styles["data-5"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        수리중
                      </div>
                    </div>
                  </div>
                  <div className={styles["frame"]}>
                    <div className={styles["data"]}>
                      <div
                        className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        A12345
                      </div>
                    </div>
                    <div className={`${styles["data-1"]} ${styles["data-6"]}`}>
                      <div className={styles["frame-89"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          머신/소도구
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["data-2"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        2024/01/01
                      </div>
                    </div>
                    <div className={`${styles["data-3"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        기기 세척
                      </div>
                    </div>
                    <div className={`${styles["data-4"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        독산점
                      </div>
                    </div>
                    <div className={`${styles["data-5"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        수리중
                      </div>
                    </div>
                  </div>
                  <div className={styles["frame"]}>
                    <div className={styles["data"]}>
                      <div
                        className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        A12345
                      </div>
                    </div>
                    <div className={`${styles["data-1"]} ${styles["data-6"]}`}>
                      <div className={styles["frame-89"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          머신/소도구
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["data-2"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        2024/01/01
                      </div>
                    </div>
                    <div className={`${styles["data-3"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        기기 세척
                      </div>
                    </div>
                    <div className={`${styles["data-4"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        독산점
                      </div>
                    </div>
                    <div className={`${styles["data-5"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        수리중
                      </div>
                    </div>
                  </div>
                  <div className={styles["frame"]}>
                    <div className={styles["data"]}>
                      <div
                        className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        A12345
                      </div>
                    </div>
                    <div className={`${styles["data-1"]} ${styles["data-6"]}`}>
                      <div className={styles["frame-89"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          머신/소도구
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["data-2"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        2024/01/01
                      </div>
                    </div>
                    <div className={`${styles["data-3"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        기기 세척
                      </div>
                    </div>
                    <div className={`${styles["data-4"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        독산점
                      </div>
                    </div>
                    <div className={`${styles["data-5"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        수리중
                      </div>
                    </div>
                  </div>
                  <div className={styles["frame"]}>
                    <div className={styles["data"]}>
                      <div
                        className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        A12345
                      </div>
                    </div>
                    <div className={`${styles["data-1"]} ${styles["data-6"]}`}>
                      <div className={styles["frame-89"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          머신/소도구
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["data-2"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        2024/01/01
                      </div>
                    </div>
                    <div className={`${styles["data-3"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        기기 세척
                      </div>
                    </div>
                    <div className={`${styles["data-4"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        독산점
                      </div>
                    </div>
                    <div className={`${styles["data-5"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        수리중
                      </div>
                    </div>
                  </div>
                  <div className={styles["frame"]}>
                    <div className={styles["data"]}>
                      <div
                        className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        A12345
                      </div>
                    </div>
                    <div className={`${styles["data-1"]} ${styles["data-6"]}`}>
                      <div className={styles["frame-89"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          머신/소도구
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["data-2"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        2024/01/01
                      </div>
                    </div>
                    <div className={`${styles["data-3"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        기기 세척
                      </div>
                    </div>
                    <div className={`${styles["data-4"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        독산점
                      </div>
                    </div>
                    <div className={`${styles["data-5"]} ${styles["data-6"]}`}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                      >
                        수리중
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles["flex-row"]} ${styles["flex"]}`}>
                <div style={{ marginTop: "30px" }}>
                  <s.PageButtonGroupDiv>
                    <s.ButtonGroupStyle variant="outlined">
                      <s.IconButtonStyle>
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                      </s.IconButtonStyle>
                      <s.IconButtonStyle>1</s.IconButtonStyle>
                      <s.IconButtonStyle>2</s.IconButtonStyle>
                      <s.IconButtonStyle>3</s.IconButtonStyle>
                      <s.IconButtonStyle>4</s.IconButtonStyle>
                      <s.IconButtonStyle>5</s.IconButtonStyle>
                      <s.IconButtonStyle>
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                      </s.IconButtonStyle>
                    </s.ButtonGroupStyle>
                  </s.PageButtonGroupDiv>
                </div>
              </div>
            </div>
            <footer className={styles["footer"]}>
              <div className={styles["footer-contents"]}>
                <div className={styles["flex-row-1"]}>
                  <div className={`${styles["flex-col"]} ${styles["flex"]}`}>
                    <div className={styles["overlap-group-1"]}>
                      <p
                        className={`${styles["x"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                      >
                        상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                        서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동,
                        센터필드)
                        <br />
                        사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 :
                        제2009호-서울강남-00847호
                      </p>
                      <div
                        className={`${styles["text-8-1"]} ${styles["valign-text-middle"]}`}
                      >
                        사업자정보확인
                      </div>
                      <p
                        className={`${styles["text-9-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                      >
                        │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜
                        더블유컨셉코리아
                      </p>
                    </div>
                    <p
                      className={`${styles["copyright"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                    >
                      COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                    </p>
                  </div>
                  <div className={styles["vertical-divider-1"]}></div>
                </div>
                <div className={styles["flex-col-1"]}>
                  <p
                    className={`${styles["heading-3"]} ${styles["valign-text-middle"]}`}
                  >
                    <span>
                      <span className={styles["span0"]}>
                        소비자피해보상보험
                        <br />
                      </span>
                      <span className={styles["span1-1"]}>
                        고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서
                        가입한
                        <br />
                        소비자피해보상보험 서비스를 이용하실 수 있습니다.
                      </span>
                    </span>
                  </p>
                  <div className={styles["text-container"]}>
                    <div
                      className={`${styles["text-10"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                    >
                      보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                    </div>
                    <div
                      className={`${styles["text-11"]} ${styles["valign-text-middle"]}`}
                    >
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

export default RepairListCopy;
