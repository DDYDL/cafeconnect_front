import * as m from '../styles/StyledMain.tsx';
import styles from '../styles/MenuInsert.module.css'
import upload_file from '../assets/img/upload-files-4ee86225-svg.svg'
import React from 'react'

function MenuInsert() {
    return (
        <>
            <m.CarouselDiv>

                <input type="hidden" id="anPageName" name="page" value="menuinsert" />
                <div className={styles['container-center-horizontal']}>
                    <div className={`${styles['menuinsert']} ${styles['screen']}`}>
                        <div className={styles['flex-col']}>
                            <div className={`${styles['heading-4-create-products']} ${styles['valign-text-middle']}`}>
                                메뉴 등록
                            </div>
                        </div>
                        <div className={styles['flex-row']}>
                            <div className={styles['container']}>
                                <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                    메뉴명
                                </div>
                                <div className={styles['input']}>
                                    <div className={styles['container-1']}>
                                        <div
                                            className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                        >
                                            메뉴명을 입력하세요
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles['flex-col-1']} ${styles['flex-col-5']}`}>
                                <div className={`${styles['label-5']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                    카테고리
                                </div>
                                <div className={styles['input-1']}>
                                    <div className={styles['container-4']}>
                                        <div
                                            className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                        >
                                            분류
                                        </div>
                                    </div>
                                    <img
                                        className={styles['sort-down']}
                                        src={require("../assets/img/sort-down@2x.png")}
                                        alt="Sort Down"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`${styles['flex-col-2']} ${styles['flex-col-5']}`}>
                            <div className={styles['container-container']}>
                                <div className={styles['container-2']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        가격
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            >
                                                가격을&nbsp;&nbsp;입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['container']}>
                                    <div
                                        className={`${styles['label-2']} ${styles['valign-text-middle']} ${styles['label-5']} ${styles['notosanskr-bold-black-16px']}`}
                                    >
                                        용량
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            >
                                                용량을 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles['container-container-1']} ${styles['container-container-5']}`}>
                                <div className={styles['container-2']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        열량
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            >
                                                열량을&nbsp;&nbsp;입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['container']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        카페인 함유량
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            >
                                                카페인 함유량을 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles['container-container-2']} ${styles['container-container-5']}`}>
                                <div className={styles['container']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        탄수화물 함유량
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            >
                                                탄수화물 함유량&nbsp;&nbsp;입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['container']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        지방
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            >
                                                지방 함유량을 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles['container-container-3']} ${styles['container-container-5']}`}>
                                <div className={styles['container']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        나트륨 함유량
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            >
                                                나트륨 함유량&nbsp;&nbsp;입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['container']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        당류 함유량
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            >
                                                당류 함유량 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles['container-container-4']} ${styles['container-container-5']}`}>
                                <div className={styles['container-2']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        단백질 함유량
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            >
                                                탄수화물 함유량&nbsp;&nbsp;입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['container']}>
                                    <div
                                        className={`${styles['label-3']} ${styles['valign-text-middle']} ${styles['label-5']} ${styles['notosanskr-bold-black-16px']}`}
                                    >
                                        지방
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div
                                                className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}
                                            >
                                                지방 함유량을 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles['label-4']} ${styles['valign-text-middle']} ${styles['label-5']} ${styles['notosanskr-bold-black-16px']}`}>
                                이미지 등록
                            </div>
                            <div className={styles['border-1']}>
                                <img
                                    className={styles['upload-files4ee86225svg']}
                                    src={upload_file}
                                    alt="upload-files.4ee86225.svg"
                                />
                                <div className={`${styles['text-24']} ${styles['valign-text-middle']}`}>
                                    <span>
                                        <span className={styles['span0']}>
                                            <br />
                                        </span>
                                        <span className={styles['span1-1']}>이미지 선택</span>
                                    </span>
                                </div>
                            </div>
                            <div className={styles['product-thumb-1bfdce747webp']}></div>
                            <div className={styles['button']}>
                                <div className={styles['overlap-group2']}>
                                    <div className={styles['small-btn_brown']}>
                                        <div className={`${styles['text-26']} ${styles['valign-text-middle']}`}>메뉴등록</div>
                                    </div>
                                </div>
                            </div>

                            <footer className={styles['footer']}>
                                <div className={styles['footer-contents']}>
                                    <div className={styles['flex-row-1']}>
                                        <div className={`${styles['flex-col-3']} ${styles['flex-col-5']}`}>
                                            <div className={styles['overlap-group-1']}>
                                                <p className={`${styles['x']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                    상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                                                    서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동, 센터필드)
                                                    <br />
                                                    사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 : 제2009호-서울강남-00847호
                                                </p>
                                                <div className={`${styles['text-8']} ${styles['valign-text-middle']}`}>사업자정보확인</div>
                                                <p className={`${styles['text-9']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                    │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜ 더블유컨셉코리아
                                                </p>
                                            </div>
                                            <p className={`${styles['copyright']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                                            </p>
                                        </div>
                                        <div className={styles['vertical-divider-1']}></div>
                                    </div>
                                    <div className={`${styles['flex-col-4']} ${styles['flex-col-5']}`}>
                                        <p className={`${styles['heading-3']} ${styles['valign-text-middle']}`}>
                                            <span>
                                                <span className={styles['span0-1']}>
                                                    소비자피해보상보험
                                                    <br />
                                                </span>
                                                <span className={styles['span1-2']}>
                                                    고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서 가입한
                                                    <br />
                                                    소비자피해보상보험 서비스를 이용하실 수 있습니다.
                                                </span>
                                            </span>
                                        </p>
                                        <div className={styles['text-container']}>
                                            <div
                                                className={`${styles['text-10']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}
                                            >
                                                보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                            </div>
                                            <div className={`${styles['text-11']} ${styles['valign-text-middle']}`}>서비스 가입사실 확인</div>
                                        </div>
                                    </div>
                                </div>
                            </footer>

                        </div>
                    </div>
                </div>
            </m.CarouselDiv>
        </>
    )
}

export default MenuInsert