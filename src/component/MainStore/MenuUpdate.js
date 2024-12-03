import * as m from "../styles/StyledMain.tsx";
import styles from "../styles/MenuUpdate.module.css";
import upload_file from "../assets/img/upload-files-4ee86225-svg.svg";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import * as s from "../styles/StyledStore.tsx";
import { Option, Select } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import thumb from "../assets/img/product-thumb-1-bfdce747-webp@2x.png";
function MenuInsert() {
  const navigate = useNavigate();
  const imageInput = useRef();
  const { menuCode } = useParams();
  const [menu, setMenu] = useState({
    menuCode: "",
    menuName: "",
    menuPrice: "",
    menuCapacity: "",
    caffeine: "",
    calories: "",
    carbohydrate: "",
    sugar: "",
    natrium: "",
    fat: "",
    protein: "",
    menuStatus: "",
    menuCategoryName: "",
    imageUrl: "",
  });
  const [categoryList, setCategoryList] = useState([]);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleInput = (e) => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value,
    });
  };
  const handleUploadImage = (e) => {
    imageInput.current.click();
  };
  const handleImageInput = (e) => {
    setFile(e.target.files[0]);
    setMenu({
      ...menu,
      imageUrl: URL.createObjectURL(e.target.files[0]),
    });
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  const handleMenuStatusSelectbox = (value) => {
    setMenu({
      ...menu,
      menuStatus: value,
    });
  };
  const handleCategoryeSelectbox = (value) => {
    setMenu({
      ...menu,
      menuCategoryName: value,
    });
  };
  const fetchMenuCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/menuCategory`);
      setCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/selectMenuByMenuCode/${menuCode}`
      );
      setMenu(response.data);
      console.log(response.data);

      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.log(error);

      alert("해당하는 상품이 없습니다");
      navigate("/mainItemList");
    }
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const itemSaveForm = {
      menuName: menu.menuName,
      menuPrice: menu.menuPrice,
      menuCapacity: menu.menuCapacity,
      caffeine: menu.caffeine,
      calories: menu.calories,
      carbohydrate: menu.carbohydrate,
      sugar: menu.sugar,
      natrium: menu.natrium,
      fat: menu.fat,
      protein: menu.protein,
      menuStatus: menu.menuStatus,
      menuCategoryName: menu.menuCategoryName,
    };
    const json = JSON.stringify(itemSaveForm);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("menuUpdateForm", blob);
    console.log(blob);
    try {
      const response = await axios.post(
        `http://localhost:8080/updateMenu/${menuCode}`,
        formData
      );
      alert("수정 성공: " + response.data);
      navigate(`/mainMenuDetail/${menuCode}`);
    } catch (error) {
      console.log(error);
      alert("수정 실패");
      navigate("/mainMenuList");
    }
  };
  const handleSubmit = () => {
    handleUpload();
  };
  useEffect(() => {
    fetchData();
    fetchMenuCategory();
  }, []);
  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="MenuUpdate" />
        <div className={styles["container-center-horizontal"]}>
          <div className={`${styles["MenuUpdate"]} ${styles["screen"]}`}>
            <div className={styles["background"]}>
              <div
                className={`${styles["heading-4-create-products"]} ${styles["valign-text-middle"]}`}
              >
                메뉴 수정
              </div>
              <div className={styles["form"]}>
                <div className={`${styles["flex-col"]} ${styles["flex"]}`}>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      메뉴명
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      placeholder="메뉴명을 입력하세요"
                      name="menuName"
                      value={menu.menuName}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      가격
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      placeholder="가격을 입력하세요"
                      name="menuPrice"
                      value={menu.menuPrice}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      용량
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      placeholder="용량을 입력하세요"
                      name="menuCapacity"
                      value={menu.menuCapacity}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      카페인 함유량
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      placeholder="카페인 함유량을 입력하세요"
                      name="caffeine"
                      value={menu.caffeine}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      지방 함유량
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      placeholder="지방 함유량을 입력하세요"
                      name="fat"
                      value={menu.fat}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      당류&nbsp;&nbsp;함유량
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      placeholder="당류 함유량을 입력하세요"
                      name="sugar"
                      value={menu.sugar}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={`${styles["input-1"]} ${styles["input-4"]}`}>
                    <div
                      className={`${styles["label-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      이미지 등록
                    </div>
                    <div
                      className={styles["border-1"]}
                      onClick={handleUploadImage}
                    >
                      <img
                        className={styles["upload-files4ee86225svg"]}
                        src={upload_file}
                        alt="upload-files.4ee86225.svg"
                      />
                      <div
                        className={`${styles["text-20"]} ${styles["valign-text-middle"]} ${styles["themewagongithubiosemanticitem"]}`}
                      >
                        <span>
                          <span className={styles["span0"]}>
                            <br />
                          </span>
                          <span className={styles["span1-1"]}>이미지 선택</span>
                        </span>
                      </div>
                    </div>
                    <img
                      className={styles["product-thumb-1bfdce747webp"]}
                      src={imageUrl === null ? thumb : imageUrl}
                      alt="image"
                    ></img>
                  </div>
                  <input
                    ref={imageInput}
                    style={{ display: "none" }}
                    onChange={handleImageInput}
                    type="file"
                  ></input>
                </div>
                <div className={styles["container-container"]}>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      메뉴 코드
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      value={menu.menuCode}
                      readOnly
                    />
                  </div>
                  <div className={styles["container-3"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      카테고리
                    </div>
                    <div
                      className="select-wrap"
                      style={{ width: "440px", marginBottom: "20px" }}
                    >
                      <Select
                        label="카테고리"
                        onChange={handleCategoryeSelectbox}
                      >
                        {categoryList.map((category, index) => (
                          <Option value={category.categoryName}>
                            {category.categoryName}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      열량
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      placeholder="열량을 입력하세요"
                      name="calories"
                      value={menu.calories}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      탄수화물 함유량
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      placeholder="탄수화물 함유량을 입력하세요"
                      name="carbohydrate"
                      value={menu.carbohydrate}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      나트륨 함유량
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      placeholder="나트륨 함유량을 입력하세요"
                      name="natrium"
                      value={menu.natrium}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      단백질 함유량
                    </div>
                    <s.InputStyle
                      width="440px"
                      type="text"
                      placeholder="단백질 함유량을 입력하세요"
                      name="protein"
                      value={menu.protein}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={styles["container"]}>
                    <div
                      className={`${styles["label"]} ${styles["valign-text-middle"]} ${styles["notosanskr-bold-black-16px"]}`}
                    >
                      상태
                    </div>
                    <div
                      className="select-wrap"
                      style={{ width: "440px", marginBottom: "20px" }}
                    >
                      <Select
                        label="상태"
                        
                        onChange={handleMenuStatusSelectbox}
                      >
                        <Option value="">상태</Option>
                        <Option value="상태1">상태1</Option>
                        <Option value="상태2">상태2</Option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={styles["small-btn_brown"]}
                style={{ cursor: "pointer" }}
                onClick={handleSubmit}
              >
                <div
                  className={`${styles["text-21"]} ${styles["valign-text-middle"]} ${styles["themewagongithubiosemanticheading-6"]}`}
                >
                  메뉴 수정
                </div>
              </div>
            </div>
            <footer className={styles["footer"]}>
              <div className={styles["footer-contents"]}>
                <div className={`${styles["flex-row"]} ${styles["flex"]}`}>
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
                        className={`${styles["text-22"]} ${styles["valign-text-middle"]}`}
                      >
                        사업자정보확인
                      </div>
                      <p
                        className={`${styles["text-23"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
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
                      className={`${styles["text-24"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                    >
                      보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                    </div>
                    <div
                      className={`${styles["text-25"]} ${styles["valign-text-middle"]}`}
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

export default MenuInsert;
