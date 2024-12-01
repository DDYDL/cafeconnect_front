import * as m from "../styles/StyledMain.tsx";
import styles from "../styles/MenuList.module.css";
import img from "../assets/img/img.svg";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input, Option } from "@material-tailwind/react";
import { StyledButton } from "../styledcomponent/button.tsx";
import * as s from "../styles/StyledStore.tsx";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
function MenuList() {
  const [pageList, setPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [startPage, setStartPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [hasNext, setHasNext] = useState(null);
  const [hasPrevious, setHasPrevious] = useState(null);
  const [empty, setEmpty] = useState(null);
  const [usingKeyword, setUsingKeyword] = useState(true);
  const [usingCategory, setUsingCategory] = useState(false);

  const [keyWord, setKeyWord] = useState("");

  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyList, setEmptyList] = useState([]);
  const [pageNumList, setPageNumList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const handleNavigate = (index) => () => {
    const page = pageList[index];

    navigate(`/mainMenuDetail/${page.menuCode}`);
  };

  const handleChangeKeyword = (e) => {
    const value = e.target.value;
    setKeyWord(value);
    setUsingKeyword(true);
    setUsingCategory(false);
    fetchKeywordData(value, 0);
  };

  const handleChangeCategory = (value) => {
    setCategory(value);

    setUsingKeyword(false);
    setUsingCategory(true);
    fetchCategoryData(value, 0);
  };
  const fetchMenuCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/menuCategoryCopy`
      );
      setCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchKeywordData = async (keyword, pageNum) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/menuListByKeyword?keyword=${keyword}&pageNum=${pageNum}&pageSize=10`
      );

      setCurrentPage(response.data.pageable.pageNumber);

      setStartPage(Math.floor(response.data.pageable.pageNumber / 5) * 5);

      setTotalElements(response.data.totalElements);
      setTotalPageNumber(response.data.totalPages);
      //넘어가는 부분이 있음
      if (
        Math.floor(response.data.pageable.pageNumber / 5) <
        Math.floor((response.data.totalPages - 1) / 5)
      ) {
        setHasNext(true);
        setEmptyList([]);
      } else {
        setHasNext(false);

        //마지막 페이지 확인
        if (response.data.last) {
          const emptyListSize = 10 - response.data.numberOfElements;

          setEmptyList(new Array(emptyListSize).fill(1));

          if (response.data.pageable.pageNumber % 5 === 0) {
            setPageNumList(
              Array.from(
                { length: 1 },
                (_, index) =>
                  response.data.pageable.pageNumber -
                  (response.data.pageable.pageNumber % 5) +
                  index
              )
            );
          } else {
            setPageNumList(
              Array.from(
                { length: (response.data.pageable.pageNumber % 5) + 1 },
                (_, index) =>
                  response.data.pageable.pageNumber -
                  (response.data.pageable.pageNumber % 5) +
                  index
              )
            );
          }
        } else {
          setEmptyList([]);

          const pageNumListSize =
            response.data.totalPages -
            Math.floor(response.data.pageable.pageNumber / 5) * 5;

          setPageNumList(
            Array.from(
              { length: pageNumListSize },
              (_, index) =>
                response.data.pageable.pageNumber -
                (response.data.pageable.pageNumber % 5) +
                index
            )
          );
        }
      }
      if (currentPage > 4) {
        setHasPrevious(true);
      } else {
        setHasPrevious(false);
      }

      setPageList(response.data.content);
      setEmpty(response.data.empty);
      console.log(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryData = async (category, pageNum) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/menuListByCategory?categoryName=${category}&pageNum=${pageNum}&pageSize=10`
      );

      setCurrentPage(response.data.pageable.pageNumber);

      setStartPage(Math.floor(response.data.pageable.pageNumber / 5) * 5);

      setTotalElements(response.data.totalElements);
      setTotalPageNumber(response.data.totalPages);
      //넘어가는 부분이 있음
      if (
        Math.floor(response.data.pageable.pageNumber / 5) <
        Math.floor((response.data.totalPages - 1) / 5)
      ) {
        setHasNext(true);
        setEmptyList([]);
      } else {
        setHasNext(false);

        //마지막 페이지 확인
        if (response.data.last) {
          const emptyListSize = 10 - response.data.numberOfElements;

          setEmptyList(new Array(emptyListSize).fill(1));

          if (response.data.pageable.pageNumber % 5 === 0) {
            setPageNumList(
              Array.from(
                { length: 1 },
                (_, index) =>
                  response.data.pageable.pageNumber -
                  (response.data.pageable.pageNumber % 5) +
                  index
              )
            );
          } else {
            setPageNumList(
              Array.from(
                { length: (response.data.pageable.pageNumber % 5) + 1 },
                (_, index) =>
                  response.data.pageable.pageNumber -
                  (response.data.pageable.pageNumber % 5) +
                  index
              )
            );
          }
        } else {
          setEmptyList([]);

          const pageNumListSize =
            response.data.totalPages -
            Math.floor(response.data.pageable.pageNumber / 5) * 5;

          console.log(Math.floor(response.data.pageable.pageNumber / 5) * 5);

          setPageNumList(
            Array.from(
              { length: pageNumListSize },
              (_, index) =>
                response.data.pageable.pageNumber -
                (response.data.pageable.pageNumber % 5) +
                index
            )
          );
        }
      }
      if (currentPage > 4) {
        setHasPrevious(true);
      } else {
        setHasPrevious(false);
      }

      setPageList(response.data.content);
      setEmpty(response.data.empty);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeywordData("", 0);
    fetchMenuCategory();
  }, []);

  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="MenuList" />
        <div className={styles["container-center-horizontal"]}>
          <div className={`${styles["MenuList"]} ${styles["screen"]}`}>
            <div className={styles["background"]}>
              <div
                className={`${styles["heading-2"]} ${styles["valign-text-middle"]}`}
              >
                메뉴 목록
              </div>
              <div
                className={`${styles["text-1-1"]} ${styles["valign-text-middle"]}`}
              >
                {`총${totalElements}건`}
              </div>
              <div className={`${styles["flex-row"]} ${styles["flex"]}`}>
                <s.ButtonInnerDiv className="w-16 p-r-2">
                  <s.SelectStyle label="분류" onChange={handleChangeCategory}>
                    {categoryList.map((category, index) => (
                      <Option value={category.categoryValue}>
                        {category.categoryName}
                      </Option>
                    ))}
                  </s.SelectStyle>
                </s.ButtonInnerDiv>
                <div style={{ marginLeft: "508px" }}>
                  <Input
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    label="매장명 검색"
                    onChange={handleChangeKeyword}
                  />
                </div>
              </div>
              <div className={styles["overlap-group2"]}>
                <div className={styles["horizontal-border-1"]}></div>
                <div className={styles["frame-92"]}>
                  <div className={styles["frame-87"]}>
                    <div className={`${styles["cell-1"]} ${styles["cell-6"]}`}>
                      <div
                        className={`${styles["text-12"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        카테고리
                      </div>
                    </div>
                    <div className={`${styles["cell-2"]} ${styles["cell-6"]}`}>
                      <div
                        className={`${styles["text-13"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        상품정보
                      </div>
                    </div>
                    <div className={`${styles["cell-3"]} ${styles["cell-6"]}`}>
                      <div
                        className={`${styles["text-14"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        가격
                      </div>
                    </div>
                    <div className={`${styles["cell-4"]} ${styles["cell-6"]}`}>
                      <div
                        className={`${styles["text-15"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        용량
                      </div>
                    </div>
                    <div className={styles["cell"]}>
                      <div
                        className={`${styles["text-16"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        탄수화물
                      </div>
                    </div>
                    <div className={styles["cell"]}>
                      <div
                        className={`${styles["text-17"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        당류
                      </div>
                    </div>
                    <div className={`${styles["cell-5"]} ${styles["cell-6"]}`}>
                      <div
                        className={`${styles["text-18"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      >
                        나트륨
                      </div>
                    </div>
                  </div>

                  {!empty &&
                    pageList.map((page, index) => (
                      <div className={styles["frame"]}>
                        <div className={styles["data"]}>
                          <div
                            className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            {page.menuCategoryName}
                          </div>
                        </div>
                        <div
                          className={`${styles["data-1"]} ${styles["data-6"]}`}
                        >
                          <div className={styles["frame-91"]}>
                            <div
                              className={
                                styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                              }
                            >
                              <img
                                className={styles["x2024-10-28-103829-1"]}
                                src={page.imageUrl}
                                alt="2024-10-28 103829 1"
                                onClick={handleNavigate(index)}
                              />
                            </div>
                            <div className={styles["frame-89"]}>
                              <div
                                className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                                onClick={handleNavigate(index)}
                              >
                                {page.menuName}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${styles["data-2"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            {`${page.menuPrice}원`}
                          </div>
                        </div>
                        <div
                          className={`${styles["data-3"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            {page.menuCapacity ? page.menuCapacity : "-"}
                          </div>
                        </div>
                        <div
                          className={`${styles["data-4"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["text-22"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            {page.carbohydrate ? page.carbohydrate : "-"}
                          </div>
                        </div>
                        <div
                          className={`${styles["data-4"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            {page.sugar ? page.sugar : "-"}
                          </div>
                        </div>
                        <div
                          className={`${styles["data-5"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            {page.natrium ? page.natrium : "-"}
                          </div>
                        </div>
                      </div>
                    ))}

                  {!empty &&
                    emptyList.map((page, index) => (
                      <div className={styles["frame"]}>
                        <div className={styles["data"]}>
                          <div
                            className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                        <div
                          className={`${styles["data-1"]} ${styles["data-6"]}`}
                        >
                          <div className={styles["frame-91"]}>
                            <div
                              className={
                                styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                              }
                            >
                              <div
                                className={styles["x2024-10-28-103829-1"]}
                              ></div>
                            </div>
                            <div className={styles["frame-89"]}>
                              <div
                                className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${styles["data-2"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                        <div
                          className={`${styles["data-3"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["x591ml"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                        <div
                          className={`${styles["data-4"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["text-22"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                        <div
                          className={`${styles["data-4"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["x63g"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                        <div
                          className={`${styles["data-5"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["x102mg"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div
                className={`${styles["flex-row-1"]} ${styles["flex-row-3"]}`}
              >
                <div style={{ marginTop: "30px" }}>
                  <s.PageButtonGroupDiv>
                    <s.ButtonGroupStyle variant="outlined">
                      {!empty && hasPrevious && (
                        <s.IconButtonStyle
                          onClick={() =>
                            fetchKeywordData(keyWord, startPage - 1)
                          }
                        >
                          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                        </s.IconButtonStyle>
                      )}
                      {usingKeyword && !empty && hasNext && (
                        <>
                          <s.IconButtonStyle
                            style={
                              currentPage == startPage
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() => fetchKeywordData(keyWord, startPage)}
                          >
                            {startPage + 1}
                          </s.IconButtonStyle>
                          <s.IconButtonStyle
                            style={
                              currentPage == startPage + 1
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() =>
                              fetchKeywordData(keyWord, startPage + 1)
                            }
                          >
                            {startPage + 2}
                          </s.IconButtonStyle>
                          <s.IconButtonStyle
                            style={
                              currentPage == startPage + 2
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() =>
                              fetchKeywordData(keyWord, startPage + 2)
                            }
                          >
                            {startPage + 3}
                          </s.IconButtonStyle>
                          <s.IconButtonStyle
                            style={
                              currentPage == startPage + 3
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() =>
                              fetchKeywordData(keyWord, startPage + 3)
                            }
                          >
                            {startPage + 4}
                          </s.IconButtonStyle>
                          <s.IconButtonStyle
                            style={
                              currentPage == startPage + 4
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() =>
                              fetchKeywordData(keyWord, startPage + 4)
                            }
                          >
                            {startPage + 5}
                          </s.IconButtonStyle>
                        </>
                      )}
                      {usingCategory && !empty && hasNext && (
                        <>
                          <s.IconButtonStyle
                            style={
                              currentPage == startPage
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() =>
                              fetchCategoryData(category, startPage)
                            }
                          >
                            {startPage + 1}
                          </s.IconButtonStyle>
                          <s.IconButtonStyle
                            style={
                              currentPage == startPage + 1
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() =>
                              fetchCategoryData(category, startPage + 1)
                            }
                          >
                            {startPage + 2}
                          </s.IconButtonStyle>
                          <s.IconButtonStyle
                            style={
                              currentPage == startPage + 2
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() =>
                              fetchCategoryData(category, startPage + 2)
                            }
                          >
                            {startPage + 3}
                          </s.IconButtonStyle>
                          <s.IconButtonStyle
                            style={
                              currentPage == startPage + 3
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() =>
                              fetchCategoryData(category, startPage + 3)
                            }
                          >
                            {startPage + 4}
                          </s.IconButtonStyle>
                          <s.IconButtonStyle
                            style={
                              currentPage == startPage + 4
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() =>
                              fetchCategoryData(category, startPage + 4)
                            }
                          >
                            {startPage + 5}
                          </s.IconButtonStyle>
                        </>
                      )}

                      {usingKeyword &&
                        !empty &&
                        !hasNext &&
                        pageNumList.map((value, index) => (
                          <s.IconButtonStyle
                            style={
                              currentPage == value
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() => fetchKeywordData("", value)}
                          >
                            {value + 1}
                          </s.IconButtonStyle>
                        ))}
                      {usingCategory &&
                        !empty &&
                        !hasNext &&
                        pageNumList.map((value, index) => (
                          <s.IconButtonStyle
                            style={
                              currentPage == value
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() => fetchCategoryData(category, value)}
                          >
                            {value + 1}
                          </s.IconButtonStyle>
                        ))}

                      {usingKeyword && empty && (
                        <s.IconButtonStyle
                          style={{ backgroundColor: "skyblue" }}
                        >
                          1
                        </s.IconButtonStyle>
                      )}

                      {!empty && hasNext && (
                        <s.IconButtonStyle
                          onClick={fetchKeywordData(
                            keyWord,
                            5 * (Math.floor(fetchKeywordData / 5) + 1)
                          )}
                        >
                          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                        </s.IconButtonStyle>
                      )}
                    </s.ButtonGroupStyle>
                  </s.PageButtonGroupDiv>
                </div>
              </div>
              <div className={styles["overlap-group-1"]}>
                <div
                  className={`${styles["text-61"]} ${styles["valign-text-middle"]}`}
                >
                  메뉴 등록
                </div>
                <div
                  className={styles["small-btn_brown"]}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/menuInsert")}
                >
                  <div
                    className={`${styles["text-62"]} ${styles["valign-text-middle"]} ${styles["themewagongithubiosemanticheading-6"]}`}
                  >
                    메뉴등록
                  </div>
                </div>
              </div>
            </div>
            <footer className={styles["footer"]}>
              <div className={styles["footer-contents"]}>
                <div
                  className={`${styles["flex-row-2"]} ${styles["flex-row-3"]}`}
                >
                  <div className={`${styles["flex-col"]} ${styles["flex"]}`}>
                    <div className={styles["overlap-group-2"]}>
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
                        className={`${styles["text-9"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
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

export default MenuList;
