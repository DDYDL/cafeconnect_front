import * as m from "../styles/StyledMain.tsx";
import React, { useEffect, useState } from "react";
import styles from "../styles/ItemInsert.module.css";
import upload_file from "../assets/img/upload-files-4ee86225-svg.svg";
import { useNavigate } from "react-router";
import { useRef } from "react";
import * as s from "../styles/StyledStore.tsx";
import { Option, Select } from "@material-tailwind/react";
import thumb from "../assets/img/product-thumb-1-bfdce747-webp@2x.png";
import axios from "axios";
import logo from '../assets/img/logo.svg'
function ItemInsert() {
  const [item, setItem] = useState({
    itemName: "",
    itemPrice: "",
    itemCapacity: "",
    itemUnitQuantity: "",
    itemUnit: "",
    itemStandard: {
      itemX: "",
      itemY: "",
      itemZ: "",
    },
    itemStorage: "",
    itemCountryOrigin: "",
    itemMajorCategory: "",
    itemMiddleCategory: "",
    itemSubCategory: "",
  });
  const [majorCategoryList, setMajorCategoryList] = useState([]);
  const [middleCategoryList, setMiddleCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [activeMiddle, setActiveMiddle] = useState(false);
  const [activeSub, setActiveSub] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [capacityUnit, setCapacityUnit] = useState('');
  const imageInput = useRef();
  const navigate = useNavigate();
  const handleInput = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };
  const handleStandardInput = (e) => {
    setItem({
      ...item,
      itemStandard: {
        ...item.itemStandard,
        [e.target.name]: `${e.target.value}`,
      },
    });
  };
  const handleItemMajorCategorySelectBox = (value) => {
    setItem({
      ...item,
      itemMajorCategory: value,
    });

    fetchMiddleData(value);
    setActiveMiddle(true);
    setActiveMiddle(false);
  };

  const handleItemMiddleCategorySelectBox = (value) => {
    setItem({
      ...item,
      itemMiddleCategory: value,
    });
    fetchSubData(value);
    setActiveMiddle(true);
    setActiveMiddle(true);
  };
  const handleItemSubCategorySelectBox = (value) => {
    setItem({
      ...item,
      itemSubCategory: value,
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
    setImageUrl(URL.createObjectURL(e.target.files[0]));
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
      setSubCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const checkProperties = () =>{
    if(item.itemName !== '' && item.itemPrice !== '' && item.itemCapacity !== '' &&  item.itemUnitQuantity !== '' &&    
      item.itemStorage  !== '' && item.itemCountryOrigin !== '' &&  item.itemMajorCategory !== ''
    ){
      return true;
    }
    return false;
      
  }
  const handleUpload = async () => {
    const formData = new FormData();
    if(!file){
      alert('이미지를 등록하세요')
      return;
    }
    formData.append("file", file);
    if(!checkProperties()){
      alert('등록되지 않은 항목이 존재합니다');
      return;
    }
    const itemSaveForm = {
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      itemCapacity: item.itemCapacity+capacityUnit,
      itemUnitQuantity: item.itemUnitQuantity,
      itemUnit: item.itemUnit,
      itemStandard: `${item.itemStandard.itemX}X${item.itemStandard.itemY}X${item.itemStandard.itemZ}`,
      itemStorage: item.itemStorage,
      itemCountryOrigin: item.itemCountryOrigin,
      itemCategoryMajorName: item.itemMajorCategory,
      itemCategoryMiddleName: item.itemMiddleCategory,
      itemCategorySubName: item.itemSubCategory,
    };
    const json = JSON.stringify(itemSaveForm);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("itemSaveForm", blob);
    console.log(blob);
    try {
      const response = await axios.post(
        "http://localhost:8080/addItem",
        formData
      );
      alert("업로드 성공");
      navigate(`/mainItemDetail/${response.data.code}`);
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드 실패");
    }
  };
  const handleSubmit = () => {
    handleUpload();
  };
  useEffect(() => {
    fetchMajorData();
  }, []);

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
                상품 등록
              </div>
              <div className={styles["form"]}>
                <div className={styles["container-container"]}>
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
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      용량
                    </div>
                    <div style={{display:"flex",gap:"20px"}}>
                    <s.InputStyle
                      name="itemCapacity"
                      width="220px"
                      type="text"
                      placeholder="용량을 입력하세요"
                      onChange={handleInput}
                    />
                    <div className="select-wrap" style={{ width: "100px" }}>
                      <Select
                        label="용량단위"
                        onChange={(e)=>(setCapacityUnit(e))}  
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
                        value={item.itemStandard.itemX}
                        onChange={handleStandardInput}
                      />
                    </div>
                    <div
                    style={{width:"40px",textAlign:"center",marginBottom:"22px"}}>
                      X
                    </div>
                    <div style={{ width: "120px", marginBottom: "11px" }}>
                      <s.InputStyle
                        name="itemY"
                        width="120px"
                        type="text"
                        placeholder="세로(cm)"
                        value={item.itemStandard.itemY}
                        onChange={handleStandardInput}
                      />
                    </div>
                    <div
                    style={{width:"40px",textAlign:"center",marginBottom:"22px"}}>
                      X
                    </div>
                    <div style={{ width: "120px", marginBottom: "11px" }}>
                      <s.InputStyle
                        name="itemZ"
                        width="120px"
                        type="text"
                        placeholder="높이(cm)"
                        value={item.itemStandard.itemZ}
                        onChange={handleStandardInput}
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
                            
                            <div className="select-wrap" style={{ width: "440px" }}>
                            <Select
                              label="대분류"
                              onChange={handleItemMajorCategorySelectBox}

                            >
                              {majorCategoryList.map((majorCategory, index) => (
                                <Option
                                  key={index}
                                  value={majorCategory.categoryName}
                                >
                                  {majorCategory.categoryName}
                                </Option>
                              ))}
                            </Select>
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
                            <div className="select-wrap" style={{ width: "440px" }}>
                            <Select
                              label="중분류"
                              onChange={handleItemMiddleCategorySelectBox}
                            >
                              {middleCategoryList.map(
                                (middleCategory, index) => (
                                  <Option
                                    key={index}
                                    value={middleCategory.categoryName}
                                  >
                                    {middleCategory.categoryName}
                                  </Option>
                                )
                              )}
                            </Select>
                            </div>
                          </s.ButtonInnerDiv>
                        </div>
                        <div className="select-wrap" style={{ width: "440px" }}>
                          <s.ButtonInnerDiv
                            className="w-16"
                            style={{ width: "440px", marginBottom: "20px" }}
                          >
                            <div className="select-wrap" style={{ width: "440px" }}>
                            <Select
                              label="소분류"
                              onChange={handleItemSubCategorySelectBox}
                            >
                              {subCategoryList.map((subCategory, index) => (
                                <Option
                                  key={index}
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
                      placeholder="단위수량을 입력하세요(개수 생략)"
                      onChange={handleInput}
                    />
                  </div>
                  <div className={`${styles["input-4"]} ${styles["input-5"]}`}>
                    <div
                      className={`${styles["label-2"]} ${styles["valign-text-middle"]} ${styles["label-3"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      이미지 등록
                    </div>
                    <div
                      className={styles["border-1"]}
                      
                    >
                      <img
                      className={styles["product-thumb-1bfdce747webp"]}
                      style={{width:"224px" ,height:"204px",marginRight:"100px", marginTop:"10px",marginBottom:"10px"}}
                      src={imageUrl === null ? logo : imageUrl}
                    ></img>
                      
                    </div>
                    <div
                      className={styles["product-thumb-1bfdce747webp"]}
                      style={{marginRight:"10px",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",backgroundColor:"#54473f",marginTop:"10px",borderRadius:"5px",color:"white"}}
                      onClick={handleUploadImage}
                      
                    >업로드</div>
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
                      상품등록
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
