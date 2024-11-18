import React from "react";
import * as m from "../styles/StyledMain.tsx";
import frame_300 from "../assets/img/frame-300.svg";
import plus from "../assets/img/plus-circle-outline.svg";
import minus from "../assets/img/minus-circle-outline.svg";
import circle_small from "../assets/img/circle-small.svg";
import styles from "../styles/Category.module.css";

function Category() {
  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="category" />
        <div className={styles["container-center-horizontal"]}>
          <div className={`${styles["category"]} ${styles["screen"]}`}>
            <div
              className={`${styles["text-8"]} ${styles["valign-text-middle"]}`}
            >
              상품 카테고리 등록
            </div>
            <div className={styles["frame-container"]}>
              <div className={styles["frame-293"]}>
                <div
                  className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-12px"]}`}
                >
                  대분류
                </div>
              </div>
              <div className={styles["frame-294"]}>
                <div
                  className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-12px"]}`}
                >
                  중분류
                </div>
              </div>
              <div className={styles["frame-295"]}>
                <div
                  className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-12px"]}`}
                >
                  소분류
                </div>
              </div>
            </div>
            <div className={styles["overlap-group2"]}>
              <div className={styles["frame-292"]}>
                <div className={styles["view"]}>
                  <div className={styles["flex-col"]}>
                    <div className={styles["overlap-group-container"]}>
                      <div className={styles["smallbtn"]}>
                        <div
                          className={`${styles["small-btn_white"]} ${styles["small"]}`}
                        >
                          <div
                            className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-log-cabin-12px"]}`}
                          >
                            수정
                          </div>
                        </div>
                        <div
                          className={`${styles["small-btn_white"]} ${styles["small"]}`}
                        >
                          <div
                            className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-log-cabin-12px"]}`}
                          >
                            수정
                          </div>
                        </div>
                      </div>
                      <div className={styles["smallbtn"]}>
                        <div
                          className={`${styles["small-btn_brown"]} ${styles["small"]}`}
                        >
                          <div
                            className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-white-12px"]}`}
                          >
                            저장
                          </div>
                        </div>
                        <div
                          className={`${styles["small-btn_brown"]} ${styles["small"]}`}
                        >
                          <div
                            className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-white-12px"]}`}
                          >
                            저장
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame-301"]}>
                      <div className={styles["frame-299"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                        >
                          커피자재
                        </div>
                      </div>
                      <img
                        className={styles["frame-300"]}
                        src={frame_300}
                        alt="Frame 300"
                      />
                    </div>
                    <div className={styles["frame-30"]}>
                      <div className={styles["frame-299"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                        >
                          분말가공
                        </div>
                      </div>
                      <img
                        className={styles["frame-300"]}
                        src={frame_300}
                        alt="Frame 300"
                      />
                    </div>
                    <div className={styles["frame-30"]}>
                      <div className={styles["frame-299"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                        >
                          시럽
                        </div>
                      </div>
                      <img
                        className={styles["frame-300"]}
                        src={frame_300}
                        alt="Frame 300"
                      />
                    </div>
                    <div className={styles["frame-30"]}>
                      <div className={styles["frame-299"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                        >
                          차류
                        </div>
                      </div>
                      <img
                        className={styles["frame-300"]}
                        src={frame_300}
                        alt="Frame 300"
                      />
                    </div>
                    <div className={styles["frame-30"]}>
                      <div className={styles["frame-299"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                        >
                          액체류
                        </div>
                      </div>
                      <img
                        className={styles["frame-300"]}
                        src={frame_300}
                        alt="Frame 300"
                      />
                    </div>
                    <div className={styles["frame-30"]}>
                      <div className={styles["frame-299"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                        >
                          유가공품
                        </div>
                      </div>
                      <img
                        className={styles["frame-300"]}
                        src={frame_300}
                        alt="Frame 300"
                      />
                    </div>
                    <div className={styles["frame-30"]}>
                      <div className={styles["frame-299"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                        >
                          유지류
                        </div>
                      </div>
                      <img
                        className={styles["frame-300"]}
                        src={frame_300}
                        alt="Frame 300"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles["view-1"]}>
                  <div className={styles["view-2"]}>
                    <div className={styles["smallbtn_-container"]}>
                      <div className={styles["small-btn_white-1"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-log-cabin-12px"]}`}
                        >
                          수정
                        </div>
                      </div>
                      <div className={styles["small-btn_brown-1"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-white-12px"]}`}
                        >
                          저장
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles["frame-301-1"]} ${styles["frame-301-3"]}`}
                    >
                      <div className={styles["frame-299"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                        >
                          카페인
                        </div>
                      </div>
                      <img
                        className={styles["frame-300"]}
                        src={frame_300}
                        alt="Frame 300"
                      />
                    </div>
                    <div className={styles["frame-30-1"]}>
                      <div className={styles["frame-299-1"]}>
                        <div
                          className={`${styles["text-4"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                        >
                          디카페인
                        </div>
                      </div>
                      <img
                        className={styles["frame-300"]}
                        src={frame_300}
                        alt="Frame 300"
                      />
                    </div>
                    <div className={styles["frame-30-1"]}>
                      <div className={styles["frame-299"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                        >
                          기타
                        </div>
                      </div>
                      <img
                        className={styles["frame-300"]}
                        src={frame_300}
                        alt="Frame 300"
                      />
                    </div>
                    <div className={styles["input"]}>
                      <div
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-gray-nurse-16px"]}`}
                      >
                        카테고리명 입력
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles["view-3"]}>
                <div className={styles["smallbtn_-container"]}>
                  <div className={styles["small-btn_white-1"]}>
                    <div
                      className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-log-cabin-12px"]}`}
                    >
                      수정
                    </div>
                  </div>
                  <div className={styles["small-btn_brown-1"]}>
                    <div
                      className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-white-12px"]}`}
                    >
                      저장
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles["frame-301-2"]} ${styles["frame-301-3"]}`}
                >
                  <div className={styles["frame-299"]}>
                    <div
                      className={`${styles["text-34"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                    >
                      원두
                    </div>
                  </div>
                  <img
                    className={styles["frame-300"]}
                    src={frame_300}
                    alt="Frame 300"
                  />
                </div>
                <div className={styles["frame-30-1"]}>
                  <div className={styles["frame-299-1"]}>
                    <div
                      className={`${styles["text-4"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                    >
                      콜드부르
                    </div>
                  </div>
                  <img
                    className={styles["frame-300"]}
                    src={frame_300}
                    alt="Frame 300"
                  />
                </div>
                <div className={styles["frame-30-1"]}>
                  <div className={styles["frame-299"]}>
                    <div
                      className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                    >
                      기타
                    </div>
                  </div>
                  <img
                    className={styles["frame-300"]}
                    src={frame_300}
                    alt="Frame 300"
                  />
                </div>
                <div className={styles["input"]}>
                  <div
                    className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-gray-nurse-16px"]}`}
                  >
                    카테고리명 입력
                  </div>
                </div>
              </div>
              <img
                className={styles["plus-circle-outline"]}
                src={plus}
                alt="plus-circle-outline"
              />
              <img
                className={styles["minus-circle-outline"]}
                src={minus}
                alt="minus-circle-outline"
              />
              <img
                className={`${styles["plus-circle-outline-1"]} ${styles["plus-circle-outline-3"]}`}
                src={plus}
                alt="plus-circle-outline"
              />
              <img
                className={`${styles["minus-circle-outline-1"]} ${styles["minus-circle-outline-3"]}`}
                src={minus}
                alt="minus-circle-outline"
              />
              <img
                className={`${styles["plus-circle-outline-2"]} ${styles["plus-circle-outline-3"]}`}
                src={plus}
                alt="plus-circle-outline"
              />
              <img
                className={`${styles["minus-circle-outline-2"]} ${styles["minus-circle-outline-3"]}`}
                src={minus}
                alt="minus-circle-outline"
              />
            </div>
            <div className={styles["flex-row"]}>
              <img
                className={styles["circle-small"]}
                src={circle_small}
                alt="circle-small"
              />
              <div
                className={`${styles["text-45"]} ${styles["valign-text-middle"]}`}
              >
                선택한 대분류 카테고리
              </div>
            </div>
            <div className={styles["frame-309"]}>
              <div
                className={`${styles["frame-310"]} ${styles["notosanskr-light-black-16px"]}`}
              >
                <div
                  className={`${styles["text-40"]} ${styles["valign-text-middle"]}`}
                >
                  커피자재&gt;원두&gt;카페인
                </div>
                <div
                  className={`${styles["text-41"]} ${styles["valign-text-middle"]}`}
                >
                  커피자재&gt;원두&gt;디카페인
                </div>
                <div
                  className={`${styles["text-42"]} ${styles["valign-text-middle"]}`}
                >
                  커피자재&gt;원두&gt;기타
                </div>
                <div
                  className={`${styles["text-43"]} ${styles["valign-text-middle"]}`}
                >
                  커피자재&gt;콜드부르
                </div>
                <div
                  className={`${styles["text-44"]} ${styles["valign-text-middle"]}`}
                >
                  커피자재&gt;기타
                </div>
              </div>
            </div>
            <footer className={styles["footer"]}>
              <div className={styles["footer-contents"]}>
                <div className={styles["flex-row-1"]}>
                  <div
                    className={`${styles["flex-col-1"]} ${styles["flex-col-3"]}`}
                  >
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
                        className={`${styles["text-9"]} ${styles["valign-text-middle"]}`}
                      >
                        사업자정보확인
                      </div>
                      <p
                        className={`${styles["text-10"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
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
                <div
                  className={`${styles["flex-col-2"]} ${styles["flex-col-3"]}`}
                >
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
                      className={`${styles["text-11"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                    >
                      보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                    </div>
                    <div
                      className={`${styles["text-12"]} ${styles["valign-text-middle"]}`}
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

export default Category;
