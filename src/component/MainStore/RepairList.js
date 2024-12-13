import React from "react";
import styles from "../styles/RepairList.module.css";
import * as m from "../styles/StyledMain.tsx";
import * as s from "../styles/StyledStore.tsx";
import { StyledButton } from "../styledcomponent/button.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import img from "../assets/img/img.svg";
import { Option, Input } from "@material-tailwind/react";
import axios from "axios";
import { Select } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { axiosInToken } from "../../config.js";
import { tokenAtom, memberAtom } from "../../atoms";
import { useAtomValue, useAtom } from "jotai/react";
function RepairListCopy() {
  const [token, setToken] = useAtom(tokenAtom);
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

  const [category, setCategory] = useState({
    ItemCategoryMajorName: "",
    ItemCategoryMiddleName: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyList, setEmptyList] = useState([]);
  const [pageNumList, setPageNumList] = useState([]);
  const [majorCategoryList, setMajorCategoryList] = useState([]);
  const [middleCategoryList, setMiddleCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const navigate = useNavigate();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}년-${month}월-${day}일`;
  };
  const handleNavigate = (index) => () => {
    const page = pageList[index];
    navigate(`/repairDetail/${page.repairNum}`);
  };

  const handleChangeKeyword = (e) => {
    const value = e.target.value;
    
    setKeyWord(value);
    setUsingKeyword(true);
    setUsingCategory(false);
  };

  const handleSelectMajorCategory = (value) => {
    console.log(value);
    setCategory({
      ...category,
      ItemCategoryMajorName: value,
    });

    setUsingKeyword(false);
    setUsingCategory(true);
    fetchCategoryData(
      {
        ...category,
        ItemCategoryMajorName: value,
      },
      0
    );
    fetchMiddleData(value);
  };

  const handleSelectMiddleCategory = (value) => {
    console.log(value);
    setCategory({
      ...category,
      ItemCategoryMiddleName: value,
    });

    setUsingKeyword(false);
    setUsingCategory(true);
    fetchCategoryData(
      {
        ...category,
        ItemCategoryMiddleName: value,
      },
      0
    );
    fetchSubData(value);
  };

  const handleSelectSubCategory = (value) => {
    console.log(value);
    setCategory({
      ...category,
      ItemCategorySubName: value,
    });

    setUsingKeyword(false);
    setUsingCategory(true);
    fetchCategoryData(
      {
        ...category,
        ItemCategorySubName: value,
      },
      0
    );
  };

  const fetchMajorData = async () => {
    try {
      const response = await axiosInToken(token).get(
        `http://localhost:8080/majorCategoryCopy`
      );
      setMajorCategoryList(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMiddleData = async (value) => {
    try {
      const response = await axiosInToken(token).get(
        `http://localhost:8080/middleCategoryCopy?categoryName=${value}`
      );
      setMiddleCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubData = async (value) => {
    try {
      const response = await axiosInToken(token).get(
        `http://localhost:8080/subCategoryCopy?categoryName=${value}`
      );
      setSubCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchKeywordData = async (keyword, pageNum) => {
    console.log(keyword)
    console.log(pageNum)
    try {
      setLoading(true);
      const response = await axiosInToken(token).get(
        `http://localhost:8080/repairListByKeyword?keyword=${keyword}&pageNum=${pageNum}&pageSize=10`
      );
      console.log(response.data)
      setCurrentPage(response.data.pageable.pageNumber);

      setStartPage(Math.floor(response.data.pageable.pageNumber / 5) * 5);

      setTotalElements(response.data.totalElements);
      setTotalPageNumber(response.data.totalPages);
      //넘어가는 부분이 있음
      if (
        Math.floor(response.data.pageable.pageNumber / 5) <
        Math.floor((response.data.totalPages - 1) / 5)
      ) {
        // setHasNext(true);
        // setEmptyList([]);
        setPageNumList(
          Array.from(
            { length: 5 },
            (_, index) =>
              response.data.pageable.pageNumber -
              (response.data.pageable.pageNumber % 5) +
              index
          )
        );
      } else {
        // setHasNext(false);

        //마지막 페이지 확인
        if (response.data.last) {
          // const emptyListSize = 10 - response.data.numberOfElements;

          // setEmptyList(new Array(emptyListSize).fill(1));

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
          // setEmptyList([]);

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
      // if (currentPage > 4) {
      //   setHasPrevious(true);
      // } else {
      //   setHasPrevious(false);
      // }
      if (response.data.first === true) {
        setHasPrevious(false);
      } else {
        setHasPrevious(true);
      }
      if (response.data.last === true) {
        setHasNext(false);
      } else {
        setHasNext(true);
      }

      setPageList(response.data.content);
      setEmpty(response.data.empty);
      setUsingKeyword(true);
      setUsingCategory(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
    
  };

  const fetchCategoryData = async (category, pageNum) => {
    try {
      setLoading(true);
      const response = await axiosInToken(token).get(
        `http://localhost:8080/repairListByCategory?ItemCategoryMajorName=${category.ItemCategoryMajorName}&ItemCategoryMiddleName=${category.ItemCategoryMiddleName}&pageNum=${pageNum}&pageSize=10`
      );
      console.log(response.data);

      setCurrentPage(response.data.pageable.pageNumber);

      setStartPage(Math.floor(response.data.pageable.pageNumber / 5) * 5);

      setTotalElements(response.data.totalElements);
      setTotalPageNumber(response.data.totalPages);
      //넘어가는 부분이 있음
      if (
        Math.floor(response.data.pageable.pageNumber / 5) <
        Math.floor((response.data.totalPages - 1) / 5)
      ) {
        // setHasNext(true);
        // setEmptyList([]);
        setPageNumList(
          Array.from(
            { length: 5 },
            (_, index) =>
              response.data.pageable.pageNumber -
              (response.data.pageable.pageNumber % 5) +
              index
          )
        );
      } else {
        // setHasNext(false);

        //마지막 페이지 확인
        if (response.data.last) {
          // const emptyListSize = 10 - response.data.numberOfElements;

          // setEmptyList(new Array(emptyListSize).fill(1));

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
          // setEmptyList([]);

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
      // if (currentPage > 4) {
      //   setHasPrevious(true);
      // } else {
      //   setHasPrevious(false);
      // }
      if (response.data.first === true) {
        setHasPrevious(false);
      } else {
        setHasPrevious(true);
      }
      if (response.data.last === true) {
        setHasNext(false);
      } else {
        setHasNext(true);
      }

      setPageList(response.data.content);
      setEmpty(response.data.empty);
      setUsingKeyword(false);
      setUsingCategory(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchKeywordData("", 0);
      fetchMajorData();
    }
  }, [token]);

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
              {/* <div
                className={`${styles["text-1-1"]} ${styles["valign-text-middle"]}`}
              >
                {`총${totalElements}건`}
              </div> */}
              <div className={styles["frame-container"]}>
                <div
                  className={`${styles["text-1-1"]} ${styles["valign-text-middle"]}`}
                >
                  {`총${totalElements}건`}
                </div>
                <s.ButtonInnerDiv
                  className="w-16 p-r-2"
                  style={{ width: "120px" }}
                >
                  {/* <div className="select-wrap" style={{ width: "200px" }}> */}
                  <Select label="대분류" onChange={handleSelectMajorCategory}>
                    {majorCategoryList.map((majorCategory, index) => (
                      <Option value={majorCategory.categoryValue} key={index}>
                        {majorCategory.categoryName}
                      </Option>
                    ))}
                  </Select>
                  {/* </div> */}
                </s.ButtonInnerDiv>

                <s.ButtonInnerDiv
                  className="w-16 p-r-2"
                  style={{ width: "120px" }}
                >
                  {/* <div className="select-wrap" style={{ width: "200px" }}> */}
                  <Select label="중분류" onChange={handleSelectMiddleCategory}>
                    {middleCategoryList.map((middleCategory, index) => (
                      <Option value={middleCategory.categoryValue} key={index}>
                        {middleCategory.categoryName}
                      </Option>
                    ))}
                  </Select>
                  {/* </div> */}
                </s.ButtonInnerDiv>

                <s.ButtonInnerDiv
                  className="w-16 p-r-2"
                  style={{ width: "120px" }}
                >
                  {/* <div className="select-wrap" style={{ width: "200px" }}> */}
                  <Select label="소분류" onChange={handleSelectSubCategory}>
                    {subCategoryList.map((subCategory, index) => (
                      <Option value={subCategory.categoryValue} key={index}>
                        {subCategory.categoryName}
                      </Option>
                    ))}
                  </Select>
                  {/* </div> */}
                </s.ButtonInnerDiv>

                <div style={{ width: "200px", marginLeft: "310px" }}>
                  <Input
                    icon={
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        onClick={() => fetchKeywordData(keyWord, 0)}
                      />
                    }
                    label="가맹점 검색"
                    onChange={handleChangeKeyword}
                    value={keyWord}
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
                        수리번호
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

                  {!empty &&
                    pageList.map((page, index) => (
                      <div className={styles["frame"]}>
                        <div className={styles["data"]}>
                          <div
                            className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                            onClick={handleNavigate(index)}
                            style={{ cursor: "pointer" }}
                          >
                            {page.repairNum}
                          </div>
                        </div>
                        <div
                          className={`${styles["data-1"]} ${styles["data-6"]}`}
                        >
                          <div className={styles["frame-89"]}>
                            <div
                              className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                            >
                              {`${page.itemCategoryMajorName}/${page.itemCategoryMiddleName}`}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${styles["data-2"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            {formatDate(new Date(page.repairDate))}
                          </div>
                        </div>
                        <div
                          className={`${styles["data-3"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            {page.repairType}
                          </div>
                        </div>
                        <div
                          className={`${styles["data-4"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            {page.storeName}
                          </div>
                        </div>
                        <div
                          className={`${styles["data-5"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          >
                            {page.repairStatus}
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* {!empty &&
                    emptyList.map((page, index) => (
                      <div className={styles["frame"]}>
                        <div className={styles["data"]}>
                          <div
                            className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                        <div
                          className={`${styles["data-1"]} ${styles["data-6"]}`}
                        >
                          <div className={styles["frame-89"]}>
                            <div
                              className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                            ></div>
                          </div>
                        </div>
                        <div
                          className={`${styles["data-2"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["date"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                        <div
                          className={`${styles["data-3"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                        <div
                          className={`${styles["data-4"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["strong-8900"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                        <div
                          className={`${styles["data-5"]} ${styles["data-6"]}`}
                        >
                          <div
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                          ></div>
                        </div>
                      </div>
                    ))} */}
                </div>
              </div>
              <div className={`${styles["flex-row"]} ${styles["flex"]}`}>
                <div style={{ marginTop: "30px" }}>
                  <s.PageButtonGroupDiv>
                    <s.ButtonGroupStyle variant="outlined">
                      {!empty && hasPrevious && usingKeyword && (
                        <s.IconButtonStyle
                          onClick={() =>
                            fetchKeywordData(keyWord, currentPage - 1)
                          }
                        >
                          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                        </s.IconButtonStyle>
                      )}
                      {!empty && hasPrevious && usingCategory && (
                        <s.IconButtonStyle
                          onClick={() =>
                            fetchCategoryData(category, currentPage - 1)
                          }
                        >
                          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                        </s.IconButtonStyle>
                      )}
                      {/* {usingKeyword && !empty && hasNext && (
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
                      )} */}

                      {usingKeyword &&
                        !empty &&
                        pageNumList.map((value, index) => (
                          <s.IconButtonStyle
                            style={
                              currentPage == value
                                ? { backgroundColor: "skyblue" }
                                : null
                            }
                            onClick={() => fetchKeywordData(keyWord, value)}
                          >
                            {value + 1}
                          </s.IconButtonStyle>
                        ))}
                      {usingCategory &&
                        !empty &&
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

                      {!empty && hasNext && usingKeyword && (
                        <s.IconButtonStyle
                          onClick={() =>
                            fetchKeywordData(keyWord, currentPage + 1)
                          }
                        >
                          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                        </s.IconButtonStyle>
                      )}
                      {!empty && hasNext && usingCategory && (
                        <s.IconButtonStyle
                          onClick={() =>
                            fetchCategoryData(category, currentPage + 1)
                          }
                        >
                          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                        </s.IconButtonStyle>
                      )}
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
