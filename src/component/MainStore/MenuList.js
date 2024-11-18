import * as m from "../styles/StyledMain.tsx";
import styles from "../styles/MenuList.module.css";
import img from "../assets/img/img.svg";
import React from "react";
import * as s from "../styles/StyledStore.tsx";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
function MenuList() {
  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="menulist" />
        <div className={styles["container-center-horizontal"]}>
          <div className={`${styles["menulist"]} ${styles["screen"]}`}>
            <div className={styles["background"]}>
              <div
                className={`${styles["heading-2"]} ${styles["valign-text-middle"]}`}
              >
                메뉴 목록
              </div>
              <div className={styles["overlap-group3"]}>
                <div className={styles["overlap-group1"]}>
                  <div className={styles["horizontal-border-1"]}></div>
                  <div className={styles["frame-104"]}>
                    <div className={styles["frame-105"]}>
                      <div
                        className={`${styles["text-1-1"]} ${styles["valign-text-middle"]}`}
                      >
                        분류
                      </div>
                    </div>
                    <img
                      className={styles["sort-down"]}
                      src={require("../assets/img/sort-down@2x.png")}
                      alt="Sort Down"
                    />
                  </div>
                  <div className={styles["frame-107"]}>
                    <div
                      className={`${styles["text-2-1"]} ${styles["valign-text-middle"]}`}
                    >
                      검색
                    </div>
                    <img className={styles["img"]} src={img} alt="Img" />
                  </div>
                  <div className={styles["frame-92"]}>
                    <div className={styles["frame-87"]}>
                      <div
                        className={`${styles["cell-1"]} ${styles["cell-4"]}`}
                      >
                        <div
                          className={`${styles["text-6"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                        >
                          카테고리
                        </div>
                      </div>
                      <div
                        className={`${styles["cell-2"]} ${styles["cell-4"]}`}
                      >
                        <div
                          className={`${styles["text-7"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                        >
                          상품정보
                        </div>
                      </div>
                      <div
                        className={`${styles["cell-3"]} ${styles["cell-4"]}`}
                      >
                        <div
                          className={`${styles["text-8"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                        >
                          가격
                        </div>
                      </div>
                      <div className={styles["cell"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                        >
                          용량
                        </div>
                      </div>
                      <div className={styles["cell"]}>
                        <div
                          className={`${styles["text-10"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                        >
                          탄수화물
                        </div>
                      </div>
                      <div className={styles["cell"]}>
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                        >
                          당류
                        </div>
                      </div>
                      <div className={styles["cell"]}>
                        <div
                          className={`${styles["text-12"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                        >
                          나트륨
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame"]}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          스무디
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-4"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          >
                            <img
                              className={styles["x2024-10-28-103829-1"]}
                              src={require("../assets/img/------2024-10-28-103829-1.png")}
                              alt="2024-10-28 103829 1"
                            />
                          </div>
                        </div>
                        <div className={styles["frame-89"]}>
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            딸기 스무디
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          5,000원
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          591ml
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          63g
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          102mg
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame"]}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          스무디
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-4"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          >
                            <img
                              className={styles["x2024-10-28-103829-1"]}
                              src={require("../assets/img/------2024-10-28-103829-1.png")}
                              alt="2024-10-28 103829 1"
                            />
                          </div>
                        </div>
                        <div className={styles["frame-89"]}>
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            딸기 스무디
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          5,000원
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          591ml
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          63g
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          102mg
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame"]}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          스무디
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-4"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          >
                            <img
                              className={styles["x2024-10-28-103829-1"]}
                              src={require("../assets/img/------2024-10-28-103829-1.png")}
                              alt="2024-10-28 103829 1"
                            />
                          </div>
                        </div>
                        <div className={styles["frame-89"]}>
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            딸기 스무디
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          5,000원
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          591ml
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          63g
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          102mg
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame"]}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          스무디
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-4"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          >
                            <img
                              className={styles["x2024-10-28-103829-1"]}
                              src={require("../assets/img/------2024-10-28-103829-1.png")}
                              alt="2024-10-28 103829 1"
                            />
                          </div>
                        </div>
                        <div className={styles["frame-89"]}>
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            딸기 스무디
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          5,000원
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          591ml
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          63g
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          102mg
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame"]}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          스무디
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-4"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          >
                            <img
                              className={styles["x2024-10-28-103829-1"]}
                              src={require("../assets/img/------2024-10-28-103829-1.png")}
                              alt="2024-10-28 103829 1"
                            />
                          </div>
                        </div>
                        <div className={styles["frame-89"]}>
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            딸기 스무디
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          5,000원
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          591ml
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          63g
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          102mg
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame"]}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          스무디
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-4"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          >
                            <img
                              className={styles["x2024-10-28-103829-1"]}
                              src={require("../assets/img/------2024-10-28-103829-1.png")}
                              alt="2024-10-28 103829 1"
                            />
                          </div>
                        </div>
                        <div className={styles["frame-89"]}>
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            딸기 스무디
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          5,000원
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          591ml
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          63g
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          102mg
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame"]}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          스무디
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-4"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          >
                            <img
                              className={styles["x2024-10-28-103829-1"]}
                              src={require("../assets/img/------2024-10-28-103829-1.png")}
                              alt="2024-10-28 103829 1"
                            />
                          </div>
                        </div>
                        <div className={styles["frame-89"]}>
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            딸기 스무디
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          5,000원
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          591ml
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          63g
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          102mg
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame"]}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          스무디
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-4"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          >
                            <img
                              className={styles["x2024-10-28-103829-1"]}
                              src={require("../assets/img/------2024-10-28-103829-1.png")}
                              alt="2024-10-28 103829 1"
                            />
                          </div>
                        </div>
                        <div className={styles["frame-89"]}>
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            딸기 스무디
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          5,000원
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          591ml
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          63g
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          102mg
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame"]}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          스무디
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-4"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          >
                            <img
                              className={styles["x2024-10-28-103829-1"]}
                              src={require("../assets/img/------2024-10-28-103829-1.png")}
                              alt="2024-10-28 103829 1"
                            />
                          </div>
                        </div>
                        <div className={styles["frame-89"]}>
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            딸기 스무디
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          5,000원
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          591ml
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          63g
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          102mg
                        </div>
                      </div>
                    </div>
                    <div className={styles["frame"]}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          스무디
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-4"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          >
                            <img
                              className={styles["x2024-10-28-103829-1"]}
                              src={require("../assets/img/------2024-10-28-103829-1.png")}
                              alt="2024-10-28 103829 1"
                            />
                          </div>
                        </div>
                        <div className={styles["frame-89"]}>
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            딸기 스무디
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          5,000원
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          591ml
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          63g
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-4"]}`}
                      >
                        <div
                          className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          102mg
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles["text-3-1"]} ${styles["valign-text-middle"]}`}
                >
                  총102건
                </div>
              </div>
              <div className={`${styles["flex-row"]} ${styles["flex"]}`}>
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
              <div className={styles["overlap-group"]}>
                <div
                  className={`${styles["text-4-1"]} ${styles["valign-text-middle"]}`}
                >
                  메뉴 등록
                </div>
                <div className={styles["small-btn_brown"]}>
                  <div
                    className={`${styles["text-5-1"]} ${styles["valign-text-middle"]}`}
                  >
                    메뉴등록
                  </div>
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
                        className={`${styles["text-50"]} ${styles["valign-text-middle"]}`}
                      >
                        사업자정보확인
                      </div>
                      <p
                        className={`${styles["text-51"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
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
                      className={`${styles["text-52"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                    >
                      보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                    </div>
                    <div
                      className={`${styles["text-53"]} ${styles["valign-text-middle"]}`}
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

export default MenuList;
