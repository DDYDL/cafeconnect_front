import React, { useState, useEffect } from "react";
import * as m from "../styles/StyledMain.tsx";
import frame_300 from "../assets/img/frame-300.svg";
import plus from "../assets/img/plus-circle-outline.svg";
import minus from "../assets/img/minus-circle-outline.svg";
import styles from "../styles/ItemCategory.module.css";
import axios from "axios";

function Category() {
  const [majorCategoryList, setMajorCategoryList] = useState([]);
  const [middleCategoryList, setMiddleCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [activeMajorCategoryName, setActiveMajorCategoryName] = useState(null);
  const [activeMajorCategoryNum, setActiveMajorCategoryNum] = useState(null);
  const [activeMiddleCategoryName, setActiveMiddleCategoryName] =
    useState(null);
  const [activeMiddleCategoryNum, setActiveMiddleCategoryNum] = useState(null);
  const [activeSubCategoryName, setActiveSubCategoryName] = useState(null);
  const [activeSubCategoryNum, setActiveSubCategoryNum] = useState(null);

  const [activeMajorInput, setActiveMajorInput] = useState(false);
  const [activeMiddleInput, setActiveMiddleInput] = useState(false);
  const [activeSubInput, setActiveSubInput] = useState(false);

  const [majorSaveState, setMajorSaveState] = useState(false);
  const [majorUpdateState, setMajorUpdateState] = useState(false);
  const [majorSaveText, setMajorSaveText] = useState("");
  const [majorUpdateText, setMajorUpdateText] = useState("");
  const [middleSaveState, setMiddleSaveState] = useState(false);
  const [middleUpdateState, setMiddleUpdateState] = useState(false);
  const [middleSaveText, setMiddleSaveText] = useState("");
  const [middleUpdateText, setMiddleUpdateText] = useState("");
  const [subSaveState, setSubSaveState] = useState(false);
  const [subUpdateState, setSubUpdateState] = useState(false);
  const [subSaveText, setSubSaveText] = useState("");
  const [subUpdateText, setSubUpdateText] = useState("");

  const [totalCategoryString, setTotalCategoryString] = useState([]);

  const [activeMajorUpdateInput, setActiveMajorUpdateInput] = useState({
    name: "",
    state: false,
  });

  const [activeMiddleUpdateInput, setActiveMiddleUpdateInput] = useState({
    name: "",
    state: false,
  });

  const [activeSubUpdateInput, setActiveSubUpdateInput] = useState({
    name: "",
    state: false,
  });

  const [middleCategoryForm, setMiddleCategoryForm] = useState(false);
  const [subCategoryForm, setSubCategoryForm] = useState(false);

  const handleMajorSaveText = (e) => {
    setMajorSaveText(e.target.value);
    setMajorSaveState(true);
    setMajorUpdateState(false);
  };
  const handleMajorUpdateText = (e) => {
    setMajorUpdateText(e.target.value);
    setMajorSaveState(false);
    setMajorUpdateState(true);
  };

  const handleMiddleSaveText = (e) => {
    setMiddleSaveText(e.target.value);
    setMiddleSaveState(true);
    setMiddleUpdateState(false);
  };
  const handleMiddleUpdateText = (e) => {
    setMiddleUpdateText(e.target.value);
    setMiddleSaveState(false);
    setMiddleUpdateState(true);
  };

  const handleSubSaveText = (e) => {
    setSubSaveText(e.target.value);
    setSubSaveState(true);
    setSubUpdateState(false);
  };
  const handleSubUpdateText = (e) => {
    setSubUpdateText(e.target.value);
    setSubSaveState(false);
    setSubUpdateState(true);
  };

  const handleMajorClick = (index) => () => {
    const target = majorCategoryList[index];
    fetchTotalCategoryStringData(target.categoryNum);
    setActiveMajorCategoryName(target.categoryName);
    setActiveMajorCategoryNum(target.categoryNum);
    setActiveMajorUpdateInput({
      name: target.categoryName,
      state: false,
    });

    setMajorUpdateText(target.categoryName);

    fetchMiddleData(target.categoryName);
    setMiddleCategoryForm(true);
    setSubCategoryForm(false);
  };
  const handleMiddleClick = (index) => () => {
    const target = middleCategoryList[index];
    setActiveMiddleCategoryName(target.categoryName);
    setActiveMiddleCategoryNum(target.categoryNum);
    setActiveMiddleUpdateInput({
      name: target.categoryName,
      state: false,
    });

    setMiddleUpdateText(target.categoryName);

    fetchSubData(target.categoryName);
    setMiddleCategoryForm(true);
    setSubCategoryForm(true);
  };
  const handleSubClick = (index) => () => {
    const target = subCategoryList[index];
    setActiveSubCategoryName(target.categoryName);
    setActiveSubCategoryNum(target.categoryNum);
    setActiveSubUpdateInput({
      name: target.categoryName,
      state: false,
    });

    setSubUpdateText(target.categoryName);
  };
  const handleMajorPlusButton = () => {
    setActiveMajorInput(!activeMajorInput);
    setMajorSaveState(true);
    setMajorUpdateState(false);
  };
  const handleMiddlePlusButton = () => {
    setActiveMiddleInput(!activeMiddleInput);
    setMiddleSaveState(true);
    setMiddleUpdateState(false);
  };
  const handleSubPlusButton = () => {
    setActiveSubInput(!activeSubInput);
    setSubSaveState(true);
    setSubUpdateState(false);
  };
  const handleMajorMinusButton = () => {
    deleteMajorData();
  };
  const handleMiddleMinusButton = () => {
    deleteMiddleData();
  };
  const handleSubMinusButton = () => {
    deleteSubData();
  };
  const handleMajorUpdate = () => {
    setActiveMajorUpdateInput({
      name: activeMajorCategoryName,
      state: true,
    });
    setMajorSaveState(false);
    setMajorUpdateState(true);
  };
  const handleMiddleUpdate = () => {
    setActiveMiddleUpdateInput({
      name: activeMiddleCategoryName,
      state: true,
    });
    setMiddleSaveState(false);
    setMiddleUpdateState(true);
  };
  const handleSubUpdate = () => {
    setActiveSubUpdateInput({
      name: activeSubCategoryName,
      state: true,
    });
    setSubSaveState(false);
    setSubUpdateState(true);
  };

  const fetchMajorData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/majorCategory`);

      setMajorCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMiddleData = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/middleCategory?categoryName=${value}`
      );
      console.log(response.data);
      setMiddleCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSubData = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/subCategory?categoryName=${value}`
      );
      console.log(response.data);
      setSubCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMajorButton = () => {
    if (majorUpdateState) {
      handleMajorUpdateSubmit();
    }
    if (majorSaveState) {
      handleMajorAddSubmit();
    }
  };

  const handleMiddleButton = () => {
    if (middleUpdateState) {
      handleMiddleUpdateSubmit();
    }
    if (middleSaveState) {
      handleMiddleAddSubmit();
    }
  };
  const handleSubButton = () => {
    if (subUpdateState) {
      handleSubUpdateSubmit();
    }
    if (subSaveState) {
      handleSubAddSubmit();
    }
  };

  const deleteMajorData = async () => {
    const formData = new FormData();
    const payload = {
      itemCategoryName: activeMajorCategoryName,
      itemCategoryNum: activeMajorCategoryNum,
    };

    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemMajorCategoryForm", blob);

    try {
      await axios.post(`http://localhost:8080/deleteMajorCategory`, formData);

      const ModifyCategoryList = majorCategoryList.filter(
        (category) => category.categoryNum !== activeMajorCategoryNum
      );
      setMajorCategoryList(ModifyCategoryList);
      setActiveMajorCategoryNum(null);
      setActiveMajorCategoryName(null);
    } catch (error) {
      console.log(error);
      alert("삭제 실패하였습니다");
    }
  };
  const deleteMiddleData = async () => {
    const formData = new FormData();
    const payload = {
      itemCategoryName: activeMiddleCategoryName,
      itemCategoryNum: activeMiddleCategoryNum,
      itemCategoryMajorName: activeMajorCategoryName,
      itemCategoryMajorNum: activeMajorCategoryNum,
    };

    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemMiddleCategoryForm", blob);

    try {
      await axios.post(`http://localhost:8080/deleteMiddleCategory`, formData);

      const ModifyCategoryList = middleCategoryList.filter(
        (category) => category.categoryNum !== activeMiddleCategoryNum
      );
      setMiddleCategoryList(ModifyCategoryList);
      setActiveMiddleCategoryNum(null);
      setActiveMiddleCategoryName(null);
    } catch (error) {
      console.log(error);
      alert("삭제 실패하였습니다");
    }
  };
  const deleteSubData = async () => {
    const formData = new FormData();
    const payload = {
      itemCategoryName: activeSubCategoryName,
      itemCategoryNum: activeSubCategoryNum,
      itemCategoryMiddleName: activeMiddleCategoryName,
      itemCategoryMiddleNum: activeMiddleCategoryNum,
    };

    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemSubCategoryForm", blob);

    try {
      await axios.post(`http://localhost:8080/deleteSubCategory`, formData);

      const ModifyCategoryList = subCategoryList.filter(
        (category) => category.categoryNum !== activeSubCategoryNum
      );
      setSubCategoryList(ModifyCategoryList);
      setActiveSubCategoryNum(null);
      setActiveSubCategoryName(null);
    } catch (error) {
      console.log(error);
      alert("삭제 실패하였습니다");
    }
  };
  const handleMajorAddSubmit = async () => {
    const formData = new FormData();
    const payload = {
      itemCategoryName: majorSaveText,
    };
    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemMajorCategoryForm", blob);

    try {
      const response = await axios.post(
        `http://localhost:8080/addMajorCategory`,
        formData
      );

      setMajorCategoryList([
        ...majorCategoryList,
        {
          categoryNum: response.data.num,
          categoryName: majorSaveText,
        },
      ]);
      setMajorSaveText("");
      setMajorSaveState(false);
      setActiveMajorInput(false);
      alert("등록 성공");
    } catch (error) {
      console.log(error);
      alert("등록 실패");
    }
  };
  const handleMiddleAddSubmit = async () => {
    const formData = new FormData();
    const payload = {
      itemCategoryName: middleSaveText,
      itemCategoryMajorName: activeMajorCategoryName,
      itemCategoryMajorNum: activeMajorCategoryNum,
    };
    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemMiddleCategoryForm", blob);

    try {
      const response = await axios.post(
        `http://localhost:8080/addMiddleCategory`,
        formData
      );

      setMiddleCategoryList([
        ...middleCategoryList,
        {
          categoryNum: response.data.num,
          categoryName: middleSaveText,
        },
      ]);
      setMiddleSaveText("");
      setMiddleSaveState(false);
      setActiveMiddleInput(false);
      alert("등록 성공");
    } catch (error) {
      console.log(error);
      alert("등록 실패");
    }
  };
  const handleSubAddSubmit = async () => {
    const formData = new FormData();
    const payload = {
      itemCategoryName: subSaveText,
      itemCategoryMiddleName: activeMiddleCategoryName,
      itemCategoryMiddleNum: activeMiddleCategoryNum,
    };
    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemSubCategoryForm", blob);

    try {
      const response = await axios.post(
        `http://localhost:8080/addSubCategory`,
        formData
      );

      setSubCategoryList([
        ...subCategoryList,
        {
          categoryNum: response.data.num,
          categoryName: subSaveText,
        },
      ]);
      setSubSaveText("");
      setSubSaveState(false);
      setActiveSubInput(false);
      alert("등록 성공");
    } catch (error) {
      console.log(error);
      alert("등록 실패");
    }
  };
  const handleMajorUpdateSubmit = async () => {
    const formData = new FormData();
    const payload = {
      itemCategoryName: majorUpdateText,
      itemCategoryNum: activeMajorCategoryNum,
    };

    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemMajorCategoryForm", blob);

    try {
      await axios.post(
        `http://localhost:8080/updateItemMajorCategory`,
        formData
      );
      setMajorCategoryList(
        majorCategoryList.map((category, index) => {
          if (category.categoryNum === activeMajorCategoryNum) {
            return {
              categoryNum: activeMajorCategoryNum,
              categoryName: majorUpdateText,
            };
          } else {
            return category;
          }
        })
      );
      setMajorUpdateText("");
      setMajorUpdateState(false);
      setActiveMajorUpdateInput({
        name: "",
        state: false,
      });

      alert("수정 성공");
    } catch (error) {
      console.log(error);
      alert("수정 실패");
    }
  };
  const handleMiddleUpdateSubmit = async () => {
    const formData = new FormData();
    const payload = {
      itemCategoryName: middleUpdateText,
      itemCategoryNum: activeMiddleCategoryNum,
      itemCategoryMajorName: activeMajorCategoryName,
      itemCategoryMajorNum: activeMajorCategoryNum,
    };

    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemMiddleCategoryForm", blob);

    try {
      await axios.post(
        `http://localhost:8080/updateItemMiddleCategory`,
        formData
      );
      setMiddleCategoryList(
        middleCategoryList.map((category, index) => {
          if (category.categoryNum === activeMiddleCategoryNum) {
            return {
              categoryNum: activeMiddleCategoryNum,
              categoryName: middleUpdateText,
            };
          } else {
            return category;
          }
        })
      );
      setMiddleUpdateText("");
      setMiddleUpdateState(false);
      setActiveMiddleUpdateInput({
        name: "",
        state: false,
      });

      alert("수정 성공");
    } catch (error) {
      console.log(error);
      alert("수정 실패");
    }
  };
  const handleSubUpdateSubmit = async () => {
    const formData = new FormData();
    const payload = {
      itemCategoryName: subUpdateText,
      itemCategoryNum: activeSubCategoryNum,
      itemCategoryMiddleName: activeMiddleCategoryName,
      itemCategoryMiddleNum: activeMiddleCategoryNum,
    };

    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemSubCategoryForm", blob);

    try {
      await axios.post(`http://localhost:8080/updateItemSubCategory`, formData);
      setSubCategoryList(
        subCategoryList.map((category, index) => {
          if (category.categoryNum === activeSubCategoryNum) {
            return {
              categoryNum: activeSubCategoryNum,
              categoryName: subUpdateText,
            };
          } else {
            return category;
          }
        })
      );
      setSubUpdateText("");
      setSubUpdateState(false);
      setActiveSubUpdateInput({
        name: "",
        state: false,
      });

      alert("수정 성공");
    } catch (error) {
      console.log(error);
      alert("수정 실패");
    }
  };

  const fetchTotalCategoryStringData = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/categoryList?categoryNum=${value}`
      );

      setTotalCategoryString(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMajorData();
  }, []);

  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="ItemCategory" />
        <div className={styles["container-center-horizontal"]}>
          <div className={`${styles["ItemCategory"]} ${styles["screen"]}`}>
            <div
              className={`${styles["text-18"]} ${styles["valign-text-middle"]}`}
            >
              상품 카테고리 등록
            </div>
            <div className={styles["frame-container"]}>
              <div className={styles["frame-293"]}>
                <div
                  className={`${styles["text-4"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-12px"]}`}
                >
                  대분류
                </div>
              </div>
              <div className={styles["frame-29"]}>
                <div
                  className={`${styles["text-4"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-12px"]}`}
                >
                  중분류
                </div>
              </div>
              <div className={styles["frame-29"]}>
                <div
                  className={`${styles["text-4"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-12px"]}`}
                >
                  소분류
                </div>
              </div>
            </div>
            <div className={styles["frame-292"]}>
              <div className={styles["view"]}>
                <div className={styles["flex-col"]}>
                  <div className={styles["frame-308-1"]}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <img
                        src={plus}
                        alt="Frame 296"
                        style={{ cursor: "pointer" }}
                        onClick={handleMajorPlusButton}
                      />
                      <img
                        src={minus}
                        alt="Frame 296"
                        style={{ cursor: "pointer" }}
                        onClick={handleMajorMinusButton}
                      />
                    </div>

                    <div className={styles["frame-297"]}>
                      <div
                        className={`${styles["small-btn_white"]} ${styles["small"]}`}
                        style={{ cursor: "pointer" }}
                        onClick={handleMajorUpdate}
                      >
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-log-cabin-12px"]}`}
                        >
                          수정
                        </div>
                      </div>
                      <div
                        className={`${styles["small-btn_brown"]} ${styles["small"]}`}
                        style={{ cursor: "pointer" }}
                        onClick={handleMajorButton}
                      >
                        <div
                          className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-white-12px"]}`}
                        >
                          저장
                        </div>
                      </div>
                    </div>
                  </div>

                  {majorCategoryList.map((majorCategory, index) => {
                    if (
                      activeMajorUpdateInput.name !==
                        majorCategory.categoryName ||
                      (activeMajorUpdateInput.name ===
                        majorCategory.categoryName &&
                        activeMajorUpdateInput.state === false)
                    ) {
                      return (
                        <>
                          <div
                            className={styles["frame-30"]}
                            key={index}
                            onClick={handleMajorClick(index)}
                            style={
                              activeMajorCategoryName ===
                              majorCategory.categoryName
                                ? {
                                    backgroundColor: "#f2878773",
                                    cursor: "pointer",
                                  }
                                : { cursor: "pointer" }
                            }
                          >
                            <div className={styles["frame-299"]}>
                              <div
                                className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                              >
                                {majorCategory.categoryName}
                              </div>
                            </div>
                            <img
                              className={styles["frame-300"]}
                              src={frame_300}
                              alt="Frame 300"
                            />
                          </div>
                        </>
                      );
                    }
                    if (
                      activeMajorUpdateInput.name ===
                        majorCategory.categoryName &&
                      activeMajorUpdateInput.state === true
                    ) {
                      return (
                        <>
                          <div className={styles["input"]}>
                            <input
                              className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-gray-nurse-16px"]}`}
                              placeholder="카테고리명 입력"
                              value={majorUpdateText}
                              onChange={handleMajorUpdateText}
                            ></input>
                          </div>
                        </>
                      );
                    }
                  })}

                  {activeMajorInput && (
                    <div className={styles["input"]}>
                      <input
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-gray-nurse-16px"]}`}
                        placeholder="카테고리명 입력"
                        value={majorSaveText}
                        onChange={handleMajorSaveText}
                      ></input>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles["view-1"]}>
                <div
                  className={`${styles["flex-col-1"]} ${styles["flex-col-4"]}`}
                >
                  {middleCategoryForm && (
                    <div className={styles["frame-308"]}>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <img
                          src={plus}
                          alt="Frame 296"
                          style={{ cursor: "pointer" }}
                          onClick={handleMiddlePlusButton}
                        />
                        <img
                          src={minus}
                          alt="Frame 296"
                          style={{ cursor: "pointer" }}
                          onClick={handleMiddleMinusButton}
                        />
                      </div>
                      <div className={styles["frame-297"]}>
                        <div
                          className={`${styles["small-btn_white"]} ${styles["small"]}`}
                          style={{ cursor: "pointer" }}
                          onClick={handleMiddleUpdate}
                        >
                          <div
                            className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-log-cabin-12px"]}`}
                          >
                            수정
                          </div>
                        </div>
                        <div
                          className={`${styles["small-btn_brown"]} ${styles["small"]}`}
                          style={{ cursor: "pointer" }}
                          onClick={handleMiddleButton}
                        >
                          <div
                            className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-white-12px"]}`}
                          >
                            저장
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {middleCategoryForm &&
                    middleCategoryList.map((middleCategory, index) => {
                      if (
                        activeMiddleUpdateInput.name !==
                          middleCategory.categoryName ||
                        (activeMiddleUpdateInput.name ===
                          middleCategory.categoryName &&
                          activeMiddleUpdateInput.state === false)
                      ) {
                        return (
                          <>
                            <div
                              className={styles["frame-30"]}
                              key={index}
                              onClick={handleMiddleClick(index)}
                              style={
                                activeMiddleCategoryName ===
                                middleCategory.categoryName
                                  ? {
                                      backgroundColor: "#f2878773",
                                      cursor: "pointer",
                                    }
                                  : { cursor: "pointer" }
                              }
                            >
                              <div className={styles["frame-299"]}>
                                <div
                                  className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                                >
                                  {middleCategory.categoryName}
                                </div>
                              </div>
                              <img
                                className={styles["frame-300"]}
                                src={frame_300}
                                alt="Frame 300"
                              />
                            </div>
                          </>
                        );
                      }
                      if (
                        activeMiddleUpdateInput.name ===
                          middleCategory.categoryName &&
                        activeMiddleUpdateInput.state === true
                      ) {
                        return (
                          <>
                            <div className={styles["input"]}>
                              <input
                                className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-gray-nurse-16px"]}`}
                                placeholder="카테고리명 입력"
                                value={middleUpdateText}
                                onChange={handleMiddleUpdateText}
                              ></input>
                            </div>
                          </>
                        );
                      }
                    })}

                  {middleCategoryForm && activeMiddleInput && (
                    <div className={styles["input"]}>
                      <input
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-gray-nurse-16px"]}`}
                        placeholder="카테고리명 입력"
                        value={middleSaveText}
                        onChange={handleMiddleSaveText}
                      ></input>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles["view-2"]}>
                <div className={styles["view-3"]}>
                  {subCategoryForm && (
                    <div className={styles["frame-308"]}>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <img
                          src={plus}
                          alt="Frame 296"
                          style={{ cursor: "pointer" }}
                          onClick={handleSubPlusButton}
                        />
                        <img
                          src={minus}
                          alt="Frame 296"
                          style={{ cursor: "pointer" }}
                          onClick={handleSubMinusButton}
                        />
                      </div>
                      <div className={styles["frame-297"]}>
                        <div
                          className={`${styles["small-btn_white"]} ${styles["small"]}`}
                          style={{ cursor: "pointer" }}
                          onClick={handleSubUpdate}
                        >
                          <div
                            className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-log-cabin-12px"]}`}
                          >
                            수정
                          </div>
                        </div>
                        <div
                          className={`${styles["small-btn_brown"]} ${styles["small"]}`}
                          style={{ cursor: "pointer" }}
                          onClick={handleSubButton}
                        >
                          <div
                            className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-white-12px"]}`}
                          >
                            저장
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {subCategoryForm &&
                    subCategoryList.map((subCategory, index) => {
                      if (
                        activeSubUpdateInput.name !==
                          subCategory.categoryName ||
                        (activeSubUpdateInput.name ===
                          subCategory.categoryName &&
                          activeSubUpdateInput.state === false)
                      ) {
                        return (
                          <>
                            <div
                              className={styles["frame-30"]}
                              key={index}
                              onClick={handleSubClick(index)}
                              style={
                                activeSubCategoryName ===
                                subCategory.categoryName
                                  ? {
                                      backgroundColor: "#f2878773",
                                      cursor: "pointer",
                                    }
                                  : { cursor: "pointer" }
                              }
                            >
                              <div className={styles["frame-299"]}>
                                <div
                                  className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                                >
                                  {subCategory.categoryName}
                                </div>
                              </div>
                              <img
                                className={styles["frame-300"]}
                                src={frame_300}
                                alt="Frame 300"
                              />
                            </div>
                          </>
                        );
                      }
                      if (
                        activeSubUpdateInput.name ===
                          subCategory.categoryName &&
                        activeSubUpdateInput.state === true
                      ) {
                        return (
                          <>
                            <div className={styles["input"]}>
                              <input
                                className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-gray-nurse-16px"]}`}
                                placeholder="카테고리명 입력"
                                value={subUpdateText}
                                onChange={handleSubUpdateText}
                              ></input>
                            </div>
                          </>
                        );
                      }
                    })}

                  {subCategoryForm && activeSubInput && (
                    <div className={styles["input"]}>
                      <input
                        className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-gray-nurse-16px"]}`}
                        placeholder="카테고리명 입력"
                        value={subSaveText}
                        onChange={handleSubSaveText}
                      ></input>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles["frame-309"]}>
              <div
                className={`${styles["text-17"]} ${styles["valign-text-middle"]}`}
              >
                선택한 대분류 카테고리
              </div>
              <div
                className={`${styles["frame-310"]} ${styles["notosanskr-light-black-16px"]}`}
              >
                {totalCategoryString.length > 0 &&
                  totalCategoryString.map((string, index) => (
                    <div
                      className={`${styles["text-16"]} ${styles["valign-text-middle"]}`}
                    >
                      &middot; {string}
                    </div>
                  ))}
              </div>
            </div>
            <footer className={styles["footer"]}>
              <div className={styles["footer-contents"]}>
                <div className={styles["flex-row"]}>
                  <div
                    className={`${styles["flex-col-2"]} ${styles["flex-col-4"]}`}
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
                  className={`${styles["flex-col-3"]} ${styles["flex-col-4"]}`}
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
    </>
  );
}

export default Category;
