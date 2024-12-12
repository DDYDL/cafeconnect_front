import * as m from "../styles/StyledMain.tsx";
import React, { useEffect, useState } from "react";
import styles from "../styles/ItemInsert.module.css";
import upload_file from "../assets/img/upload-files-4ee86225-svg.svg";
import { useNavigate } from "react-router";
import * as s from "../styles/StyledStore.tsx";
import { Option, Select } from "@material-tailwind/react";
import { useRef } from "react";
import { useParams } from "react-router";
import thumb from "../assets/img/product-thumb-1-bfdce747-webp@2x.png";
import { axiosInToken } from "../../config.js";
import { tokenAtom, memberAtom } from "../../atoms";
import { useAtomValue,useAtom } from "jotai/react";
import axios from "axios";
function ItemInsert() {
  const [token,setToken] = useAtom(tokenAtom);
  const { itemCode } = useParams();
  const imageInput = useRef();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    itemCode: "",
    itemName: "",
    itemPrice: "",
    itemCapacity: "",
    itemUnitQuantity: "",
    itemUnit: "",
    itemStandard: null,
    itemStorage: "",
    itemCountryOrigin: "",
    itemMajorCategoryName: "",
    itemMiddleCategoryName: "",
    itemSubCategoryName: "",
    imageUrl: null,
  });
  const [capacityUnit, setCapacityUnit] = useState("");
  const handleCapacityUnit = (e) => {
    setCapacityUnit(e);
    setItem({
      ...item,
      itemCapacity: capacity + e.target.value,
    });
  };
  const [capacity, setCapacity] = useState("");
  const handleCapacity = (e) => {
    setCapacity(e.target.value);
    setItem({
      ...item,
      itemCapacity: e.target.value + capacityUnit,
    });
  };
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [z, setZ] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [majorCategoryList, setMajorCategoryList] = useState([]);
  const [middleCategoryList, setMiddleCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [file, setFile] = useState(null);
  const handleInput = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };
  const handleXStandardInput = (e) => {
    setX(e.target.value);
    setItem({
      ...item,
      itemStandard:
        e.target.value +
        "X" +
        (item.itemStandard !== null &&
        item.itemStandard.split("X")[1] !== undefined
          ? item.itemStandard.split("X")[1]
          : "") +
        "X" +
        (item.itemStandard !== null &&
        item.itemStandard.split("X")[2] !== undefined
          ? item.itemStandard.split("X")[2]
          : ""),
    });
  };
  const handleYStandardInput = (e) => {
    setY(e.target.value);
    setItem({
      ...item,
      itemStandard:
        (item.itemStandard !== null &&
        item.itemStandard.split("X")[0] !== undefined
          ? item.itemStandard.split("X")[0]
          : "") +
        "X" +
        e.target.value +
        "X" +
        (item.itemStandard !== null &&
        item.itemStandard.split("X")[2] !== undefined
          ? item.itemStandard.split("X")[2]
          : ""),
    });
  };
  const handleZStandardInput = (e) => {
    setZ(e.target.value);
    setItem({
      ...item,
      itemStandard:
        (item.itemStandard !== null &&
        item.itemStandard.split("X")[0] !== undefined
          ? item.itemStandard.split("X")[0]
          : "") +
        "X" +
        (item.itemStandard !== null &&
        item.itemStandard.split("X")[1] !== undefined
          ? item.itemStandard.split("X")[1]
          : "") +
        "X" +
        e.target.value,
    });
  };
  const handleItemMajorCategorySelectBox = (value) => {
    setItem({
      ...item,
      itemMajorCategoryName: value,
    });

    fetchMiddleData(value);
  };
  const handleItemMiddleCategorySelectBox = (value) => {
    setItem({
      ...item,
      itemMiddleCategoryName: value,
    });
    fetchSubData(value);
  };
  const handleItemSubCategorySelectBox = (value) => {
    setItem({
      ...item,
      itemSubCategoryName: value,
    });
  };
  const handleItemUnitSelectbox = (value) => {
    setItem({
      ...item,
      itemUnit: value,
    });
  };
  const handleItemStorageSelectbox = (value) => {
    setItem({
      ...item,
      itemStorage: value,
    });
  };
  const handleUploadImage = (e) => {
    imageInput.current.click();
  };

  const handleImageInput = (e) => {
    if(!e.target.files[0]){
      return;
    }
    setFile(e.target.files[0]);
    setItem({
      ...item,
      imageUrl: URL.createObjectURL(e.target.files[0]),
    });
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  const fetchMajorData = async () => {
    try {
      const response = await axiosInToken(token).get(`http://localhost:8080/majorCategory`);
      setMajorCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConvertToFile = async (imageUrl) => {
    try {
      // fetch를 사용해 imageUrl의 데이터 가져오기
      const response = await fetch(imageUrl);

      // Blob으로 변환
      const blob = await response.blob();

      // File 객체 생성
      const file = new File([blob], "image.jpg", { type: blob.type });

      setFile(file);
    } catch (error) {
      console.error("Error converting imageUrl to File:", error);
    }
  };

  const fetchMiddleData = async (value) => {
    try {
      const response = await axiosInToken(token).get(
        `http://localhost:8080/middleCategory?categoryName=${value}`
      );
      setMiddleCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubData = async (value) => {
    try {
      const response = await axiosInToken(token).get(
        `http://localhost:8080/subCategory?categoryName=${value}`
      );
      setSubCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axiosInToken(token).get(
        `http://localhost:8080/selectItemByItemCode/${itemCode}`
      );
      console.log(response.data);
      setItem(response.data);
      setX(
        response.data.itemStandard !== null &&
          response.data.itemStandard.split("X")[0] !== undefined
          ? response.data.itemStandard.split("X")[0]
          : ""
      );
      setY(
        response.data.itemStandard !== null &&
          response.data.itemStandard.split("X")[1] !== undefined
          ? response.data.itemStandard.split("X")[1]
          : ""
      );
      setZ(
        response.data.itemStandard !== null &&
          response.data.itemStandard.split("X")[2] !== undefined
          ? response.data.itemStandard.split("X")[2]
          : ""
      );
      setImageUrl(response.data.imageUrl);
      setCapacityUnit(
        response.data.itemCapacity.match(/[a-zA-Z]+$/)?.[0] || ""
      );
      setCapacity(response.data.itemCapacity.match(/\d+/)?.[0] || "");
      handleConvertToFile(response.data.imageUrl);
    } catch (error) {
      console.log(error);

      alert("해당하는 상품이 없습니다");
      navigate("/mainItemList");
    }
  };
  const checkProperties = () => {
    if (
      item.itemName !== "" &&
      item.itemPrice !== "" &&
      item.itemCapacity !== "" &&
      item.itemUnitQuantity !== "" &&
      item.itemStorage !== "" &&
      item.itemCountryOrigin !== "" &&
      item.itemMajorCategory !== ""
    ) {
      return true;
    }
    return false;
  };
  const handleUpload = async () => {
    const formData = new FormData();
    if (!file) {
      alert("이미지를 등록하세요");
      return;
    }
    formData.append("file", file);
    if (!checkProperties()) {
      alert("등록되지 않은 항목이 존재합니다");
      return;
    }
    const itemSaveForm = {
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      itemCapacity: item.itemCapacity,
      itemUnitQuantity: item.itemUnitQuantity,
      itemUnit: item.itemUnit,
      itemStandard: item.itemStandard,
      itemStorage: item.itemStorage,
      itemCountryOrigin: item.itemCountryOrigin,
      itemCategoryMajorName: item.itemMajorCategoryName,
      itemCategoryMiddleName: item.itemMiddleCategoryName,
      itemCategorySubName: item.itemSubCategoryName,
    };

    const json = JSON.stringify(itemSaveForm);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemUpdateForm", blob);
    console.log(blob);
    try {
      const response = await axiosInToken(token).post(
        `http://localhost:8080/updateItem/${item.itemCode}`,
        formData
      );
      alert("수정 성공: " + response.data);
      navigate(`/mainItemDetail/${item.itemCode}`);
    } catch (error) {
      console.log(error);
      alert("수정 실패");
    }
  };
  const handleSubmit = () => {
    handleUpload();
  };

  useEffect(() => {
    if(token){
      fetchData();
    fetchMajorData();
    }
    
  }, [token]);

  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="ItemInsert" />
        <div className={styles["container-center-horizontal"]}>
          <div className={`${styles["ItemInsert"]} ${styles["screen"]}`}>
            <div className={styles["background"]}>
              <div
                className={`${styles["heading-4-create-products"]} ${styles["valign-text-middle"]}`}
              >
                상품 수정
              </div>
              <div className={styles["form"]}>
                <div className={styles["container-container"]}>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      상품코드
                    </div>

                    <s.InputStyle
                      name="itemName"
                      width="440px"
                      type="text"
                      placeholder="상품코드를 입력하세요"
                      value={item.itemCode}
                      readOnly
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      상품명
                    </div>

                    <s.InputStyle
                      name="itemName"
                      width="440px"
                      type="text"
                      placeholder="상품명을 입력하세요"
                      value={item.itemName}
                      onChange={handleInput}
                    />
                  </div>

                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      공급가(원)
                    </div>
                    <s.InputStyle
                      name="itemPrice"
                      width="440px"
                      type="text"
                      placeholder="공급가를 입력하세요(단위생략)"
                      value={item.itemPrice}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      용량
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <s.InputStyle
                        name="itemCapacity"
                        width="220px"
                        type="text"
                        placeholder="용량을 입력하세요"
                        value={capacity}
                        onChange={handleCapacity}
                      />
                      <div className="select-wrap" style={{ width: "100px" }}>
                        <Select
                          label="용량단위"
                          onChange={handleCapacityUnit}
                          value={capacityUnit}
                        >
                          <Option value="">용량 단위를 선택하세요</Option>
                          <Option value="kg">kg</Option>
                          <Option value="g">g</Option>
                          <Option value="ml">ml</Option>
                          <Option value="L">L</Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className={styles["container-3"]}>
                    <div className={`${styles["flex-col"]} ${styles["flex"]}`}>
                      <div
                        className={`${styles["label-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                      >
                        규격
                      </div>
                      <s.InputStyle
                        name="itemX"
                        width="120px"
                        type="text"
                        placeholder="가로(cm)"
                        value={x}
                        onChange={handleXStandardInput}
                      />
                    </div>
                    <div
                      style={{
                        width: "40px",
                        textAlign: "center",
                        marginBottom: "22px",
                      }}
                    >
                      X
                    </div>
                    <div style={{ width: "120px", marginBottom: "11px" }}>
                      <s.InputStyle
                        name="itemY"
                        width="120px"
                        type="text"
                        placeholder="세로(cm)"
                        value={y}
                        onChange={handleYStandardInput}
                      />
                    </div>
                    <div
                      style={{
                        width: "40px",
                        textAlign: "center",
                        marginBottom: "22px",
                      }}
                    >
                      X
                    </div>
                    <div style={{ width: "120px", marginBottom: "11px" }}>
                      <s.InputStyle
                        name="itemZ"
                        width="120px"
                        type="text"
                        placeholder="높이(cm)"
                        value={z}
                        onChange={handleZStandardInput}
                      />
                    </div>
                  </div>
                  <div className={styles["container-3"]}>
                    <div className={`${styles["flex-col"]} ${styles["flex"]}`}>
                      <div
                        className={`${styles["label-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                      >
                        카테고리
                      </div>
                      <div>
                        <div
                          className="select-wrap"
                          style={{ width: "440px", marginBottom: "20px" }}
                        >
                          <s.ButtonInnerDiv
                            className="w-16"
                            style={{ width: "440px", marginBottom: "20px" }}
                          >
                            <div
                              className="select-wrap"
                              style={{ width: "440px" }}
                            >
                              <Select
                                label="대분류"
                                onChange={handleItemMajorCategorySelectBox}
                              >
                                {majorCategoryList.map((majorCategory) => (
                                  <Option
                                    key={majorCategory.categoryName}
                                    value={majorCategory.categoryName}
                                  >
                                    {majorCategory.categoryName}
                                  </Option>
                                ))}
                              </Select>
                              {/* <select value={item.itemMajorCategoryName} onChange={handleItemMajorCategorySelectBox} label="대분류" style={{borderRadius:"7px",width:"440px",height:"40px",backgroundColor:"#f8f8f8"}}>
                                {majorCategoryList.map((majorCategory,index)=>(
                                  <option value={majorCategory.categoryName}>{majorCategory.categoryName}</option>
                                ))}
                              </select> */}
                            </div>
                          </s.ButtonInnerDiv>
                        </div>
                        <div
                          className="select-wrap"
                          style={{ width: "440px", marginBottom: "20px" }}
                        >
                          <s.ButtonInnerDiv
                            className="w-16"
                            style={{ width: "440px", marginBottom: "20px" }}
                          >
                            <div
                              className="select-wrap"
                              style={{ width: "440px" }}
                            >
                              <Select
                                label="중분류"
                                onChange={handleItemMiddleCategorySelectBox}
                              >
                                {middleCategoryList.map((middleCategory) => (
                                  <Option
                                    key={middleCategory.categoryName}
                                    value={middleCategory.categoryName}
                                  >
                                    {middleCategory.categoryName}
                                  </Option>
                                ))}
                              </Select>
                            </div>
                          </s.ButtonInnerDiv>
                        </div>
                        <div className="select-wrap" style={{ width: "440px" }}>
                          <s.ButtonInnerDiv
                            className="w-16"
                            style={{ width: "440px", marginBottom: "20px" }}
                          >
                            <div
                              className="select-wrap"
                              style={{ width: "440px" }}
                            >
                              <Select
                                label="소분류"
                                onChange={handleItemSubCategorySelectBox}
                              >
                                {subCategoryList.map((subCategory) => (
                                  <Option
                                    key={subCategory.categoryName}
                                    value={subCategory.categoryName}
                                  >
                                    {subCategory.categoryName}
                                  </Option>
                                ))}
                              </Select>
                            </div>
                          </s.ButtonInnerDiv>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles["flex-col-1"]} ${styles["flex-col-4"]}`}
                >
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      원산지
                    </div>
                    <s.InputStyle
                      name="itemCountryOrigin"
                      width="440px"
                      type="text"
                      placeholder="원산지를 입력하세요"
                      value={item.itemCountryOrigin}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container-6"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      단위
                    </div>
                    <div className="select-wrap" style={{ width: "440px" }}>
                      <Select
                        label="단위구분"
                        value={item.itemUnit}
                        onChange={handleItemUnitSelectbox}
                      >
                        <Option value="">단위를 선택하세요</Option>
                        <Option value="BOX">BOX</Option>
                        <Option value="EA">EA</Option>
                        <Option value="PK">PK</Option>
                        <Option value="CAN">CAN</Option>
                        <Option value="BTL">BTL</Option>
                      </Select>
                    </div>
                  </div>
                  <div className={styles["container-4"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      보관 상태
                    </div>
                    <div className="select-wrap" style={{ width: "440px" }}>
                      <Select
                        label="보관상태"
                        value={item.itemStorage}
                        onChange={handleItemStorageSelectbox}
                      >
                        <Option value="">보관상태를 선택하세요</Option>
                        <Option value="냉장">냉장</Option>
                        <Option value="냉동">냉동</Option>
                        <Option value="상온">상온</Option>
                      </Select>
                    </div>
                  </div>
                  <div className={styles["container-4"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      단위 수량(개수)
                    </div>
                    <s.InputStyle
                      name="itemUnitQuantity"
                      width="440px"
                      type="text"
                      placeholder="단위수량을 입력하세요(단위 생락)"
                      value={item.itemUnitQuantity}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={`${styles["input-4"]} ${styles["input-5"]}`}>
                    <div
                      className={`${styles["label-2"]} ${styles["valign-text-middle"]} ${styles["label-3"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      이미지 등록
                    </div>
                    <div className={styles["border-1"]}>
                      <img
                        className={styles["upload-files4ee86225svg"]}
                        src={imageUrl === null ? thumb : imageUrl}
                        style={{
                          width: "224px",
                          height: "204px",
                          marginRight: "0px",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        alt="upload-files.4ee86225.svg"
                      ></img>
                    </div>
                    <div
                      className={styles["product-thumb-1bfdce747webp"]}
                      onClick={handleUploadImage}
                      style={{
                        marginRight: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        backgroundColor: "#54473f",
                        marginTop: "10px",
                        borderRadius: "5px",
                        color: "white",
                      }}
                    >
                      업로드
                    </div>
                  </div>
                  <input
                    style={{ display: "none" }}
                    ref={imageInput}
                    type="file"
                    onChange={handleImageInput}
                  ></input>
                  <div
                    className={styles["small-btn_brown"]}
                    style={{ cursor: "pointer" }}
                    onClick={handleSubmit}
                  >
                    <div
                      className={`${styles["text-12"]} ${styles["valign-text-middle"]} ${styles["themewagongithubiosemanticheading-6"]}`}
                    >
                      상품 수정
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className={styles["footer"]}>
              <div className={styles["footer-contents"]}>
                <div className={`${styles["flex-row"]} ${styles["flex"]}`}>
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
                        className={`${styles["text-21"]} ${styles["valign-text-middle"]}`}
                      >
                        사업자정보확인
                      </div>
                      <p
                        className={`${styles["text-22"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
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
                      <span className={styles["span0-1"]}>
                        소비자피해보상보험
                        <br />
                      </span>
                      <span className={styles["span1-2"]}>
                        고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서
                        가입한
                        <br />
                        소비자피해보상보험 서비스를 이용하실 수 있습니다.
                      </span>
                    </span>
                  </p>
                  <div className={styles["text-container"]}>
                    <div
                      className={`${styles["text-23"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                    >
                      보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                    </div>
                    <div
                      className={`${styles["text-24"]} ${styles["valign-text-middle"]}`}
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

export default ItemInsert;
