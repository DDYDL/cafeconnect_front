import React, { useState, useEffect } from "react";
import * as m from "../styles/StyledMain.tsx";
import frame_300 from "../assets/img/frame-300.svg";
import frame_296 from "../assets/img/frame-296.svg";
import plus from "../assets/img/plus-circle-outline.svg";
import minus from "../assets/img/minus-circle-outline.svg";
import styles from "../styles/MenuCategory.module.css";
import axios from "axios";

function MenuCategory() {
  const [categoryList, setCategoryList] = useState([]);
  const [activeInput, setActiveInput] = useState(false);
  const [activeCategoryName, setActiveCategoryName] = useState(null);
  const [activeCategoryNum, setActiveCategoryNum] = useState(null);
  const [activeUpdateInput, setActiveUpdateInput] = useState({
    name: "",
    state: false,
  });
  const [saveState, setSaveState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [saveText, setSaveText] = useState("");
  const [updateText, setUpdateText] = useState("");

  const handleSaveText = (e) => {
    setSaveText(e.target.value);
  };
  const handleUpdateText = (e) => {
    setUpdateText(e.target.value);
  };

  const handleClick = (index) => () => {
    const target = categoryList[index];

    if (target.categoryName === activeUpdateInput.name) {
      setActiveCategoryName(null);
      setActiveCategoryNum(null);
      setUpdateText("");
      setActiveUpdateInput({
        name: "",
        state: false,
      });
    } else {
      setActiveCategoryName(target.categoryName);
      setActiveCategoryNum(target.categoryNum);
      setUpdateText(target.categoryName);
      setActiveUpdateInput({
        name: target.categoryName,
        state: false,
      });
    }
  };
  const handlePlusButton = () => {
    if (activeUpdateInput.name !== "" && activeUpdateInput.state === true) {
      alert("이미 수정중이니 수정폼을 없앤 후 버튼을 눌러주세요");
      return;
    }
    setActiveInput(!activeInput);
    setSaveState(true);
    setUpdateState(false);
    setUpdateText("");
  };
  const handleMinusButton = () => {
    deleteData();
  };
  const handleUpdate = () => {
    if (activeInput === true) {
      alert(
        "이미 새로운 카테고리를 등록중이니 등록 폼을 없앤 후 버튼을 수정 버튼을 눌러주세요"
      );
      return;
    }
    setActiveUpdateInput({
      name: activeCategoryName,
      state: true,
    });
    setSaveState(false);
    setSaveText("");
    setUpdateState(true);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/menuCategory`);

      setCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButton = () => {
    if (updateState) {
      handleUpdateSubmit();
    }
    if (saveState) {
      handleAddSubmit();
    }
  };
  const deleteData = async () => {
    try {
      await axios.get(
        `http://localhost:8080/deleteMenuCategory/${activeCategoryNum}`
      );
      const ModifyCategoryList = categoryList.filter(
        (category) => category.categoryNum !== activeCategoryNum
      );
      setCategoryList(ModifyCategoryList);
      setActiveCategoryNum(null);
      setActiveCategoryName(null);
    } catch (error) {
      console.log(error);
      alert("삭제 실패하였습니다");
    }
  };
  const handleAddSubmit = async () => {
    const formData = new FormData();

    const addMenuCategoryForm = {
      categoryName: saveText,
    };

    const json = JSON.stringify(addMenuCategoryForm);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("addMenuCategoryForm", blob);

    try {
      const response = await axios.post(
        `http://localhost:8080/addMenuCategory`,
        formData
      );
      setCategoryList([
        ...categoryList,
        {
          categoryNum: response.data.num,
          categoryName: saveText,
        },
      ]);
      setSaveText("");
      setSaveState(false);
      setActiveInput(false);
      alert("등록 성공");
    } catch (error) {
      console.log(error);
      alert("등록 실패");
    }
  };
  const handleUpdateSubmit = async () => {
    const formData = new FormData();

    const updateMenuCategoryForm = {
      categoryNum: activeCategoryNum,
      categoryName: updateText,
    };

    const json = JSON.stringify(updateMenuCategoryForm);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("updateMenuCategoryForm", blob);

    try {
      await axios.post(`http://localhost:8080/updateMenuCategory`, formData);
      setCategoryList(
        categoryList.map((category, index) => {
          if (category.categoryNum === activeCategoryNum) {
            return {
              categoryNum: activeCategoryNum,
              categoryName: updateText,
            };
          } else {
            return category;
          }
        })
      );
      setUpdateText("");
      setUpdateState(false);
      setActiveUpdateInput({
        name: "",
        state: false,
      });

      alert("수정 성공");
    } catch (error) {
      console.log(error);
      alert("수정 실패");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <m.CarouselDiv>
      <input type="hidden" id="anPageName" name="page" value="MenuCategory" />
      <div className={styles["container-center-horizontal"]}>
        <div className={`${styles["MenuCategory"]} ${styles["screen"]}`}>
          <div
            className={`${styles["text-18"]} ${styles["valign-text-middle"]}`}
          >
            메뉴 카테고리 등록
          </div>
          <div className={styles["frame-293"]}>
            <div
              className={`${styles["text-29"]} ${styles["valign-text-middle"]}`}
            >
              분류
            </div>
          </div>
          <div className={styles["frame-292"]}>
            <div className={styles["view"]}>
              <div className={styles["flex-col"]}>
                <div className={styles["frame-308"]}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <img
                      src={plus}
                      alt="Frame 296"
                      style={{ cursor: "pointer" }}
                      onClick={handlePlusButton}
                    />
                    <img
                      src={minus}
                      alt="Frame 296"
                      style={{ cursor: "pointer" }}
                      onClick={handleMinusButton}
                    />
                  </div>
                  <div className={styles["frame-297"]}>
                    <div
                      className={`${styles["small-btn_white"]} ${styles["small"]}`}
                      style={{ cursor: "pointer" }}
                      onClick={handleUpdate}
                    >
                      <div
                        className={`${styles["text-27"]} ${styles["valign-text-middle"]}`}
                      >
                        수정
                      </div>
                    </div>
                    <div
                      className={`${styles["small-btn_brown"]} ${styles["small"]}`}
                      style={{ cursor: "pointer" }}
                      onClick={handleButton}
                    >
                      <div
                        className={`${styles["text-28"]} ${styles["valign-text-middle"]}`}
                      >
                        저장
                      </div>
                    </div>
                  </div>
                </div>
                {categoryList.map((category, index) => {
                  if (
                    activeUpdateInput.name !== category.categoryName ||
                    (activeUpdateInput.name === category.categoryName &&
                      activeUpdateInput.state === false)
                  ) {
                    return (
                      <>
                        <div
                          className={styles["frame-30"]}
                          key={index}
                          onClick={handleClick(index)}
                          style={
                            activeCategoryName === category.categoryName
                              ? {
                                  backgroundColor: "#f2878773",
                                  cursor: "pointer",
                                }
                              : { cursor: "pointer" }
                          }
                        >
                          <div className={styles["frame-299"]}>
                            <div
                              className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                            >
                              {category.categoryName}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                  if (
                    activeUpdateInput.name === category.categoryName &&
                    activeUpdateInput.state === true
                  ) {
                    return (
                      <>
                        <div className={styles["input"]}>
                          <input
                            className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-gray-nurse-16px"]}`}
                            style={{ width: "740px" }}
                            placeholder="카테고리명 입력"
                            value={updateText}
                            onChange={handleUpdateText}
                          ></input>
                        </div>
                      </>
                    );
                  }
                })}
                {activeInput && (
                  <div className={styles["input"]}>
                    <input
                      className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-gray-nurse-16px"]}`}
                      style={{ width: "740px" }}
                      placeholder="카테고리명 입력"
                      value={saveText}
                      onChange={handleSaveText}
                    ></input>
                  </div>
                )}
              </div>
            </div>
          </div>

          <footer className={styles["footer"]}>
            <div className={styles["footer-contents"]}>
              <div className={styles["flex-row"]}>
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
                      className={`${styles["text-8"]} ${styles["valign-text-middle"]}`}
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
  );
}

export default MenuCategory;
