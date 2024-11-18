import * as m from '../styles/StyledMain.tsx';
import styles from '../styles/ItemDetail.module.css'
import React from 'react'

function ItemDetail() {
    return (
        <>
            <m.CarouselDiv>

                <input
                    type="hidden"
                    id="anPageName"
                    name="page"
                    value="itemdetail"
                />
                <div className={styles['container-center-horizontal']}>
                    <div className={`${styles['itemdetail']} ${styles['screen']}`}>
                        <div className={styles['overlap-group5']}>
                            <div className={styles['background']}>
                                <div className={styles['horizontal-border-1']}></div>
                            </div>
                            <div className={`${styles['heading-4-product-details']} ${styles['valign-text-middle']}`}>
                                커피 콩(상품 상세 예시)
                            </div>
                            <div className={styles['background-1']}>
                                <div className={`${styles['flex-row']} ${styles['flex']}`}>
                                    <div className={styles['image']}></div>
                                    <div className={styles['link']}>
                                        <div className={`${styles['overlap-group']} ${styles['inter-normal-white-16px']}`}>
                                            <div className={`${styles['text']} ${styles['valign-text-middle']}`}>수정</div>
                                            <div className={styles['small-btn_brown']}>
                                                <div className={`${styles['text-1']} ${styles['valign-text-middle']}`}>수정</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles['link-1']} ${styles['link-3']}`}>
                                        <div className={`${styles['overlap-group1']} ${styles['inter-normal-white-16px']}`}>
                                            <div className={`${styles['text-1-1']} ${styles['valign-text-middle']}`}>삭제</div>
                                            <div className={`${styles['link-2']} ${styles['link-3']}`}>
                                                <div className={styles['overlap-group']}>
                                                    <div className={`${styles['text']} ${styles['valign-text-middle']}`}>수정</div>
                                                    <div className={styles['small-btn_brown']}>
                                                        <div className={`${styles['text-1']} ${styles['valign-text-middle']}`}>삭제</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['x1ac11794-378f-404e-a96e-845e1444f16cjpg']}></div>
                                <div className={`${styles['flex-col']} ${styles['flex']}`}>
                                    <p className={`${styles['heading-3']} ${styles['valign-text-middle']}`}>
                                        데코 화이트 슈가 파우더(1kg /1ea)
                                    </p>
                                    <div className={`${styles['table-body']} ${styles['notosanskr-medium-black-16px']}`}>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>상품명</div>
                                            <div className={`${styles['data-2']} ${styles['data-5']}`}>
                                                <div className={`${styles['text-6']} ${styles['valign-text-middle']}`}>
                                                    데코 화이트 슈가 파우더
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>상품코드</div>
                                            <div className={`${styles['data-1']} ${styles['data-5']}`}>
                                                <div className={`${styles['g2000002676']} ${styles['valign-text-middle']}`}>
                                                    G2000002676
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>공급가</div>
                                            <div className={`${styles['data-1']} ${styles['data-5']}`}>
                                                <div className={`${styles['text-7']} ${styles['valign-text-middle']}`}>5,900원</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>단위</div>
                                            <div className={`${styles['data-1']} ${styles['data-5']}`}>
                                                <div className={`${styles['x1ea']} ${styles['valign-text-middle']}`}>1ea</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>보관상태</div>
                                            <div className={`${styles['data-1']} ${styles['data-5']}`}>
                                                <div className={`${styles['text-8']} ${styles['valign-text-middle']}`}>실온</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>용량</div>
                                            <div className={`${styles['data-3']} ${styles['data-5']}`}>
                                                <div className={`${styles['x10kg']} ${styles['valign-text-middle']}`}>10kg</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>규격</div>
                                            <div className={`${styles['data-4']} ${styles['data-5']}`}>
                                                <div className={`${styles['text-9']} ${styles['valign-text-middle']}`}>-</div>
                                            </div>
                                        </div>
                                        <div className={styles['table-body-item']}>
                                            <div className={`${styles['data']} ${styles['valign-text-middle']}`}>단위수량</div>
                                            <div className={`${styles['data-1']} ${styles['data-5']}`}>
                                                <div className={`${styles['number']} ${styles['valign-text-middle']}`}>10</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles['flex-col-1']} ${styles['flex-col-4']}`}>
                                    <div className={styles['flex-row-1']}>
                                        <div className={styles['background-2']}></div>
                                        <div className={`${styles['text-10']} ${styles['valign-text-middle']}`}>상품 정보 고시</div>
                                        <div className={styles['background-3']}></div>
                                    </div>
                                    <div className={styles['frame-101']}>
                                        <div className={styles['frame-99']}>
                                            <div className={styles['frame-97']}>
                                                <div className={`${styles['text-11']} ${styles['valign-text-middle']} ${styles['notosanskr-medium-black-16px']}`}>
                                                    카테고리
                                                </div>
                                            </div>
                                            <div className={styles['frame-98']}>
                                                <div className={`${styles['text-12']} ${styles['valign-text-middle']}`}>분말가공/파우더/-</div>
                                            </div>
                                        </div>
                                        <div className={styles['frame-100']}>
                                            <div className={styles['frame-97']}>
                                                <div className={`${styles['text-13']} ${styles['valign-text-middle']} ${styles['notosanskr-medium-black-16px']}`}>
                                                    원산지
                                                </div>
                                            </div>
                                            <div className={styles['frame-98']}>
                                                <div className={`${styles['text-14']} ${styles['valign-text-middle']}`}>대한민국</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className={styles['footer']}>
                            <div className={styles['footer-contents']}>
                                <div className={styles['flex-row-2']}>
                                    <div className={`${styles['flex-col-2']} ${styles['flex-col-4']}`}>
                                        <div className={styles['overlap-group-1']}>
                                            <p className={`${styles['x']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                                                서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동, 센터필드)
                                                <br />
                                                사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 : 제2009호-서울강남-00847호
                                            </p>
                                            <div className={`${styles['text-22']} ${styles['valign-text-middle']}`}>사업자정보확인</div>
                                            <p className={`${styles['text-23']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜ 더블유컨셉코리아
                                            </p>
                                        </div>
                                        <p className={`${styles['copyright']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                                        </p>
                                    </div>
                                    <div className={styles['vertical-divider-1']}></div>
                                </div>
                                <div className={`${styles['flex-col-3']} ${styles['flex-col-4']}`}>
                                    <p className={`${styles['heading-3-1']} ${styles['valign-text-middle']}`}>
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
                                        <div className={`${styles['text-24']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                        </div>
                                        <div className={`${styles['text-25']} ${styles['valign-text-middle']}`}>
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

export default ItemDetail