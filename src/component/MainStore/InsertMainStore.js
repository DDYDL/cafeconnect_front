import * as m from '../styles/StyledMain.tsx';
import styles from '../styles/InsertMainStore.module.css'
import React from 'react'

function InsertMainStore() {
    return (
        <>
            <m.CarouselDiv>

                <input
                    type="hidden"
                    id="anPageName"
                    name="page"
                    value="InsertMainStore"
                />
                <div className={styles['container-center-horizontal']}>
                    <div className={`${styles['InsertMainStore']} ${styles['screen']}`}>

                        <div className={styles['background']}>
                            <div className={`${styles['heading-4-create-products']} ${styles['valign-text-middle']}`}>
                                계정 등록
                            </div>
                            <div className={styles['container-container']}>
                                <div className={styles['container']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        아이디
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                아이디를 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['container']}>
                                    <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                        비밀번호
                                    </div>
                                    <div className={styles['input']}>
                                        <div className={styles['container-1']}>
                                            <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                                비밀번호를 입력하세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['container-3']}>
                                <div className={`${styles['label']} ${styles['valign-text-middle']} ${styles['notosanskr-bold-black-16px']}`}>
                                    부서명
                                </div>
                                <div className={styles['input']}>
                                    <div className={styles['container-1']}>
                                        <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-pink-swan-15px']}`}>
                                            부서명을 입력하세요
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['overlap-group']}>
                                <div className={`${styles['text-4']} ${styles['valign-text-middle']}`}>
                                    계정 등록
                                </div>
                                <div className={styles['small-btn_brown']}>
                                    <div className={`${styles['text-5']} ${styles['valign-text-middle']} ${styles['themewagongithubiosemanticheading-6']}`}>
                                        계정등록
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className={styles['footer']}>
                            <div className={styles['footer-contents']}>
                                <div className={`${styles['flex-row']} ${styles['flex']}`}>
                                    <div className={`${styles['flex-col']} ${styles['flex']}`}>
                                        <div className={styles['overlap-group-1']}>
                                            <p className={`${styles['x']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 : 서울특별시 강남구
                                                테헤란로 231, EAST동 20층(역삼동, 센터필드)
                                                <br />
                                                사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 : 제2009호-서울강남-00847호
                                            </p>
                                            <div className={`${styles['text-13']} ${styles['valign-text-middle']}`}>
                                                사업자정보확인
                                            </div>
                                            <p className={`${styles['text-14']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜ 더블유컨셉코리아
                                            </p>
                                        </div>
                                        <p className={`${styles['copyright']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                                        </p>
                                    </div>
                                    <div className={styles['vertical-divider-1']}></div>
                                </div>
                                <div className={styles['flex-col-1']}>
                                    <p className={`${styles['heading-3']} ${styles['valign-text-middle']}`}>
                                        <span>
                                            <span className={styles['span0']}>
                                                소비자피해보상보험
                                                <br />
                                            </span>
                                            <span className={styles['span1-1']}>
                                                고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서 가입한
                                                <br />
                                                소비자피해보상보험 서비스를 이용하실 수 있습니다.
                                            </span>
                                        </span>
                                    </p>
                                    <div className={styles['text-container']}>
                                        <div className={`${styles['text-15']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                        </div>
                                        <div className={`${styles['text-16']} ${styles['valign-text-middle']}`}>
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
    )
}

export default InsertMainStore