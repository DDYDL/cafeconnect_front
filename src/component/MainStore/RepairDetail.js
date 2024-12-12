import React, { useEffect, useState } from "react";
import * as m from "../styles/StyledMain.tsx";
import styles from "../styles/RepairDetail.module.css";
import axios from "axios";
import { axiosInToken } from "../../config.js";
import { tokenAtom, memberAtom } from "../../atoms";
import { useAtomValue,useAtom } from "jotai/react";
import { useParams, useNavigate } from "react-router";
function RepairDetail() {
  const [token,setToken] = useAtom(tokenAtom);
  const { repairNum } = useParams();
  const navigate = useNavigate();
  const [repair, setRepair] = useState({
    repairType: "",
    repairTitle: "",
    repairContent: "",
    repairDate: "",
    repairStatus: "",
    repairAnswer: "",
    repairAnswerDate: "",
    storeName: "",
    storeCode: "",
    itemCode: "",
    itemName: "",
    itemCategoryMajorName: "",
    itemCategoryMiddleName: "",
    itemCategorySubName: "",
  });
  const [activeIng, setActiveIng] = useState(false);
  const [activeComplete, setActiveComplete] = useState(false);

  const handleRepairAnswer = (e) => {
    setRepair({
      ...repair,
      repairAnswer: e.target.value,
    });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const fetchData = async () => {
    console.log(repairNum);
    try {
      const response = await axiosInToken(token).get(
        `http://localhost:8080/selectRepairByRepairNum/${repairNum}`
      );
      setRepair(response.data);
      console.log(response.data);
      if (response.data.repairStatus === "접수") {
        activeIng(true);
      }
      if (response.data.repairStatus === "수리중") {
        activeComplete(true);
      }
    } catch (error) {
      alert("해당하는 수리내용이 없습니다");
      navigate("/repairList");
    }
  };
  useEffect(() => {
    if(token){
      fetchData();
    }
    
  }, [token]);
  const handleActiveIng = async () => {
    const formData = new FormData();
    const itemSaveForm = {
      repairAnswer: repair.repairAnswer,
      repairStatus: "수리중",
    };
    const json = JSON.stringify(itemSaveForm);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("repairUpdateForm", blob);

    try {
      await axiosInToken(token).post(
        `http://localhost:8080/updateStateRepair/${repairNum}`,
        formData
      );
      alert("수정 성공");
      navigate(`/repairList`);
    } catch (error) {
      console.log(error);
      alert("수정 실패");
      navigate("/repairList");
    }
  };
  const handleActiveComplete = async () => {
    const formData = new FormData();
    const itemSaveForm = {
      repairAnswer: repair.repairAnswer,
      repairStatus: "수리완료",
    };
    const json = JSON.stringify(itemSaveForm);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("repairUpdateForm", blob);

    try {
      await axiosInToken(token).post(
        `http://localhost:8080/updateStateRepair/${repairNum}`,
        formData
      );
      alert("수정 성공");
      navigate(`/repairList`);
    } catch (error) {
      console.log(error);
      alert("수정 실패");
      navigate("/repairList");
    }
  };

  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="RepairDetail" />
        <div className={styles["container-center-horizontal"]}>
          <div className={`${styles["RepairDetail"]} ${styles["screen"]}`}>
            <div
              className={`${styles["heading-2"]} ${styles["valign-text-middle"]}`}
            >
              수리 상세
            </div>
            <div className={styles["frame-119"]}>
              <div className={styles["frame-117"]}>
                <div
                  className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-16px"]}`}
                >
                  가맹점명
                </div>
              </div>
              <div className={styles["frame-118"]}>
                <div
                  className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                >
                  {repair.storeName}
                </div>
              </div>
            </div>
            <div className={styles["frame-12"]}>
              <div className={styles["frame-117"]}>
                <div
                  className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-16px"]}`}
                >
                  수리유형 *
                </div>
              </div>
              <div className={styles["frame-1"]}>
                <div className={styles["frame-118"]}>
                  <div
                    className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                  >
                    {repair.repairType}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["frame-12"]}>
              <div className={styles["frame-117"]}>
                <div
                  className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-16px"]}`}
                >
                  수리제목 *
                </div>
              </div>
              <div className={styles["frame-1"]}>
                <div className={styles["frame-118"]}>
                  <div
                    className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                  >
                    {repair.repairTitle}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["frame-12"]}>
              <div className={styles["frame-117"]}>
                <div
                  className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-16px"]}`}
                >
                  수리내용 *
                </div>
              </div>
              <div className={styles["frame-1"]}>
                <div className={styles["frame-118"]}>
                  <div
                    className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                  >
                    {repair.repairContent}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["frame-12"]}>
              <div className={styles["frame-117"]}>
                <div
                  className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-16px"]}`}
                >
                  상품코드 *
                </div>
              </div>
              <div className={styles["frame-1"]}>
                <div className={styles["frame-134"]}>
                  <div className={styles["frame-118"]}>
                    <div
                      className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                    >
                      {repair.itemCode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["frame-12"]}>
              <div className={styles["frame-117"]}>
                <div
                  className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-16px"]}`}
                >
                  수리접수날짜*
                </div>
              </div>
              <div className={styles["frame-1"]}>
                <div className={styles["frame-118"]}>
                  <div
                    className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                  >
                    {formatDate(new Date(repair.repairDate))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["frame-12"]}>
              <div className={styles["frame-117"]}>
                <div
                  className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-16px"]}`}
                >
                  답변날짜*
                </div>
              </div>
              <div className={styles["frame-1"]}>
                <div className={styles["frame-118"]}>
                  <div
                    className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                  >
                    {formatDate(new Date(repair.repairAnswerDate))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["frame-124"]}>
              <div className={styles["frame-117"]}>
                <div
                  className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-16px"]}`}
                >
                  카테고리*
                </div>
              </div>
              <div className={styles["frame-118-1"]}>
                <div className={styles["frame-118"]}>
                  <div
                    className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                  >
                    {`${repair.itemCategoryMajorName}/${repair.itemCategoryMiddleName}/${repair.itemCategorySubName}`}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["frame-123"]}>
              <div className={styles["frame-117"]}>
                <div
                  className={`${styles["text"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-black-16px"]}`}
                >
                  답변 *
                </div>
              </div>
              <div className={styles["frame-118-2"]}>
                <textarea
                  className={`${styles["input-3"]} ${styles["input-4"]} `}
                  type="text"
                  value={repair.repairAnswer}
                  onChange={handleRepairAnswer}
                >
                  <div
                    className={`${styles["text-10"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-black-16px"]}`}
                  ></div>
                </textarea>
              </div>
            </div>
            <div className={styles["button"]}>
              <div className={styles["overlap-group1"]}>
                <div
                  className={`${styles["text-11"]} ${styles["valign-text-middle"]}`}
                >
                  수리중 변경
                </div>

                <div className={styles["overlap-group"]}>
                  <div
                    className={`${styles["text-12"]} ${styles["valign-text-middle"]}`}
                  >
                    메뉴 등록
                  </div>
                  {activeIng && (
                    <div
                      className={styles["small-btn_brown"]}
                      style={{ cursor: "pointer" }}
                      onClick={handleActiveIng}
                    >
                      <div
                        className={`${styles["text-13"]} ${styles["valign-text-middle"]} ${styles["themewagongithubiosemanticheading-6"]}`}
                      >
                        수리중 변경
                      </div>
                    </div>
                  )}
                  {activeComplete && (
                    <div
                      className={styles["small-btn_brown"]}
                      style={{ cursor: "pointer" }}
                      onClick={handleActiveComplete}
                    >
                      <div
                        className={`${styles["text-13"]} ${styles["valign-text-middle"]} ${styles["themewagongithubiosemanticheading-6"]}`}
                      >
                        수리완료 변경
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <footer className={styles["footer"]}>
              <div className={styles["footer-contents"]}>
                <div className={`${styles["flex-row"]} ${styles["flex"]}`}>
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
                        className={`${styles["text-14"]} ${styles["valign-text-middle"]}`}
                      >
                        사업자정보확인
                      </div>
                      <p
                        className={`${styles["text-15"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
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
                      className={`${styles["text-16"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                    >
                      보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                    </div>
                    <div
                      className={`${styles["text-17"]} ${styles["valign-text-middle"]}`}
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

export default RepairDetail;
