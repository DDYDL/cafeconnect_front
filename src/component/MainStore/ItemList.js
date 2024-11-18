import * as m from '../styles/StyledMain.tsx';
import styles from '../styles/ItemList.module.css'
import React from 'react'
import img from '../assets/img/img.svg'

function ItemList() {
    return (
        <>
            <m.CarouselDiv>

                <input type="hidden" id="anPageName" name="page" value="itemlist" />
                <div className={styles['container-center-horizontal']}>
                    <div className={`${styles['itemlist']} ${styles['screen']}`}>
                        <div className={styles['background']}>
                            <div className={`${styles['heading-2']} ${styles['valign-text-middle']}`}>상품 목록</div>
                            <div className={styles['flex-row']}>
                                <div className={styles['frame-104']}>
                                    <div className={styles['frame-105']}>
                                        <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-cotton-seed-20px']}`}>
                                            대분류
                                        </div>
                                        <img
                                            className={styles['sort-down']}
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div className={styles['frame-10']}>
                                    <div className={styles['frame-105']}>
                                        <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-cotton-seed-20px']}`}>
                                            중분류
                                        </div>
                                        <img
                                            className={styles['sort-down']}
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div className={styles['frame-10']}>
                                    <div className={styles['frame-105']}>
                                        <div className={`${styles['text']} ${styles['valign-text-middle']} ${styles['notosanskr-light-cotton-seed-20px']}`}>
                                            소분류
                                        </div>
                                        <img
                                            className={styles['sort-down']}
                                            src={require("../assets/img/sort-down@2x.png")}
                                            alt="Sort Down"
                                        />
                                    </div>
                                </div>
                                <div className={styles['frame-107']}>
                                    <div className={`${styles['text-41']} ${styles['valign-text-middle']} ${styles['notosanskr-light-cotton-seed-20px']}`}>
                                        검색
                                    </div>
                                    <img className={styles['img']} src={img} alt="Img" />
                                </div>
                                <div className={`${styles['text-37']} ${styles['valign-text-middle']}`}>총102건</div>
                            </div>
                            <div className={styles['overlap-group1']}>
                                <div className={styles['horizontal-border-1']}></div>
                                <div className={styles['frame-92']}>
                                    <div className={styles['frame-87']}>
                                        <div className={styles['cell']}>
                                            <div className={`${styles['text-1-1']} ${styles['valign-text-middle']} ${styles['notosanskr-medium-shark-16px']}`}>
                                                카테고리
                                            </div>
                                        </div>
                                        <div className={styles['cell']}>
                                            <div className={`${styles['text-2-1']} ${styles['valign-text-middle']} ${styles['notosanskr-medium-shark-16px']}`}>
                                                상품 코드
                                            </div>
                                        </div>
                                        <div className={`${styles['cell-1']} ${styles['cell-5']}`}>
                                            <div className={`${styles['text-3-1']} ${styles['valign-text-middle']} ${styles['notosanskr-medium-shark-16px']}`}>
                                                상품정보
                                            </div>
                                        </div>
                                        <div className={`${styles['cell-2']} ${styles['cell-5']}`}>
                                            <div className={`${styles['text-4-1']} ${styles['valign-text-middle']} ${styles['notosanskr-medium-shark-16px']}`}>
                                                단위수량
                                            </div>
                                        </div>
                                        <div className={`${styles['cell-3']} ${styles['cell-5']}`}>
                                            <div className={`${styles['text-5']} ${styles['valign-text-middle']} ${styles['notosanskr-medium-shark-16px']}`}>
                                                공급가
                                            </div>
                                        </div>
                                        <div className={`${styles['cell-4']} ${styles['cell-5']}`}>
                                            <div className={`${styles['text-6']} ${styles['valign-text-middle']} ${styles['notosanskr-medium-shark-16px']}`}>
                                                보관상태
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['frame']}>
                                        <div className={`${styles['data-3']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                가공자재/원두/디카페인
                                            </div>
                                        </div>
                                        <div className={styles['frame-88']}>
                                            <div className={`${styles['a12345']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                A12345
                                            </div>
                                        </div>
                                        <div className={styles['data']}>
                                            <div className={styles['frame-90']}>
                                                <div className={styles['x39607d95d144c4751fedd9d44017d8b7jpg']}></div>
                                                <div className={styles['frame-89']}>
                                                    <div className={`${styles['text-2']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                        과테말라 코반 스페셜티
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['data-1']} ${styles['data-13']}`}>
                                            <div className={`${styles['number']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                30
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                10,000원
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['strong-8900']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                상온
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['frame']}>
                                        <div className={`${styles['data-3']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                가공자재/원두/디카페인
                                            </div>
                                        </div>
                                        <div className={styles['frame-88']}>
                                            <div className={`${styles['a12345']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                A12345
                                            </div>
                                        </div>
                                        <div className={styles['data']}>
                                            <div className={styles['frame-90']}>
                                                <div className={styles['x39607d95d144c4751fedd9d44017d8b7jpg']}></div>
                                                <div className={styles['frame-89']}>
                                                    <div className={`${styles['text-2']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                        과테말라 코반 스페셜티
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['data-1']} ${styles['data-13']}`}>
                                            <div className={`${styles['number']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                30
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                10,000원
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['strong-8900']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                상온
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['frame']}>
                                        <div className={`${styles['data-3']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                가공자재/원두/디카페인
                                            </div>
                                        </div>
                                        <div className={styles['frame-88']}>
                                            <div className={`${styles['a12345']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                A12345
                                            </div>
                                        </div>
                                        <div className={styles['data']}>
                                            <div className={styles['frame-90']}>
                                                <div className={styles['x39607d95d144c4751fedd9d44017d8b7jpg']}></div>
                                                <div className={styles['frame-89']}>
                                                    <div className={`${styles['text-2']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                        과테말라 코반 스페셜티
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['data-1']} ${styles['data-13']}`}>
                                            <div className={`${styles['number']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                30
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                10,000원
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['strong-8900']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                상온
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['frame']}>
                                        <div className={`${styles['data-3']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                가공자재/원두/디카페인
                                            </div>
                                        </div>
                                        <div className={styles['frame-88']}>
                                            <div className={`${styles['a12345']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                A12345
                                            </div>
                                        </div>
                                        <div className={styles['data']}>
                                            <div className={styles['frame-90']}>
                                                <div className={styles['x39607d95d144c4751fedd9d44017d8b7jpg']}></div>
                                                <div className={styles['frame-89']}>
                                                    <div className={`${styles['text-2']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                        과테말라 코반 스페셜티
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['data-1']} ${styles['data-13']}`}>
                                            <div className={`${styles['number']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                30
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                10,000원
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['strong-8900']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                상온
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['frame']}>
                                        <div className={`${styles['data-3']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                가공자재/원두/디카페인
                                            </div>
                                        </div>
                                        <div className={styles['frame-88']}>
                                            <div className={`${styles['a12345']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                A12345
                                            </div>
                                        </div>
                                        <div className={styles['data']}>
                                            <div className={styles['frame-90']}>
                                                <div className={styles['x39607d95d144c4751fedd9d44017d8b7jpg']}></div>
                                                <div className={styles['frame-89']}>
                                                    <div className={`${styles['text-2']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                        과테말라 코반 스페셜티
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['data-1']} ${styles['data-13']}`}>
                                            <div className={`${styles['number']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                30
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                10,000원
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['strong-8900']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                상온
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['frame']}>
                                        <div className={`${styles['data-3']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                가공자재/원두/디카페인
                                            </div>
                                        </div>
                                        <div className={styles['frame-88']}>
                                            <div className={`${styles['a12345']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                A12345
                                            </div>
                                        </div>
                                        <div className={styles['data']}>
                                            <div className={styles['frame-90']}>
                                                <div className={styles['x39607d95d144c4751fedd9d44017d8b7jpg']}></div>
                                                <div className={styles['frame-89']}>
                                                    <div className={`${styles['text-2']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                        과테말라 코반 스페셜티
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['data-1']} ${styles['data-13']}`}>
                                            <div className={`${styles['number']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                30
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                10,000원
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['strong-8900']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                상온
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['frame']}>
                                        <div className={`${styles['data-3']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                가공자재/원두/디카페인
                                            </div>
                                        </div>
                                        <div className={styles['frame-88']}>
                                            <div className={`${styles['a12345']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                A12345
                                            </div>
                                        </div>
                                        <div className={styles['data']}>
                                            <div className={styles['frame-90']}>
                                                <div className={styles['x39607d95d144c4751fedd9d44017d8b7jpg']}></div>
                                                <div className={styles['frame-89']}>
                                                    <div className={`${styles['text-2']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                        과테말라 코반 스페셜티
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['data-1']} ${styles['data-13']}`}>
                                            <div className={`${styles['number']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                30
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                10,000원
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['strong-8900']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                상온
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['frame']}>
                                        <div className={`${styles['data-3']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                가공자재/원두/디카페인
                                            </div>
                                        </div>
                                        <div className={styles['frame-88']}>
                                            <div className={`${styles['a12345']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                A12345
                                            </div>
                                        </div>
                                        <div className={styles['data']}>
                                            <div className={styles['frame-90']}>
                                                <div className={styles['x39607d95d144c4751fedd9d44017d8b7jpg']}></div>
                                                <div className={styles['frame-89']}>
                                                    <div className={`${styles['text-2']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                        과테말라 코반 스페셜티
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['data-1']} ${styles['data-13']}`}>
                                            <div className={`${styles['number']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                30
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                10,000원
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['strong-8900']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                상온
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['frame']}>
                                        <div className={`${styles['data-3']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                가공자재/원두/디카페인
                                            </div>
                                        </div>
                                        <div className={styles['frame-88']}>
                                            <div className={`${styles['a12345']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                A12345
                                            </div>
                                        </div>
                                        <div className={styles['data']}>
                                            <div className={styles['frame-90']}>
                                                <div className={styles['x39607d95d144c4751fedd9d44017d8b7jpg']}></div>
                                                <div className={styles['frame-89']}>
                                                    <div className={`${styles['text-2']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                        과테말라 코반 스페셜티
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['data-1']} ${styles['data-13']}`}>
                                            <div className={`${styles['number']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                30
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                10,000원
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['strong-8900']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                상온
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['frame']}>
                                        <div className={`${styles['data-3']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-1']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                가공자재/원두/디카페인
                                            </div>
                                        </div>
                                        <div className={styles['frame-88']}>
                                            <div className={`${styles['a12345']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                A12345
                                            </div>
                                        </div>
                                        <div className={styles['data']}>
                                            <div className={styles['frame-90']}>
                                                <div className={styles['x39607d95d144c4751fedd9d44017d8b7jpg']}></div>
                                                <div className={styles['frame-89']}>
                                                    <div className={`${styles['text-2']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                        과테말라 코반 스페셜티
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['data-1']} ${styles['data-13']}`}>
                                            <div className={`${styles['number']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                30
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['text-3']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                10,000원
                                            </div>
                                        </div>
                                        <div className={`${styles['data-2']} ${styles['data-13']}`}>
                                            <div className={`${styles['strong-8900']} ${styles['valign-text-middle']} ${styles['notosanskr-light-shark-16px']}`}>
                                                상온
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles['flex-row-1']} ${styles['flex-row-3']}`}>
                                <div className={`${styles['component-2']} ${styles['component']}`}>
                                    <div className={`${styles['text-7']} ${styles['valign-text-middle']}`}>1</div>
                                </div>
                                <div className={`${styles['component-3']} ${styles['component']}`}>
                                    <div className={`${styles['text-8']} ${styles['valign-text-middle']} ${styles['montserrat-light-pumice-16px']}`}>
                                        2
                                    </div>
                                </div>
                                <div className={`${styles['component-4']} ${styles['component']}`}>
                                    <div className={`${styles['text-4']} ${styles['valign-text-middle']} ${styles['montserrat-light-pumice-16px']}`}>
                                        3
                                    </div>
                                </div>
                                <div className={`${styles['component-5']} ${styles['component']}`}>
                                    <div className={`${styles['text-9']} ${styles['valign-text-middle']} ${styles['montserrat-light-pumice-16px']}`}>
                                        4
                                    </div>
                                </div>
                                <div className={styles['overlap-group2']}>
                                    <div className={`${styles['component-1']} ${styles['component']}`}>
                                        <div className={`${styles['text-4']} ${styles['valign-text-middle']} ${styles['montserrat-light-pumice-16px']}`}>
                                            5
                                        </div>
                                    </div>
                                    <div className={styles['border-1']}>
                                        <img
                                            className={styles['image']}
                                            src={require("../assets/img/image@3x.png")}
                                            alt="Image"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles['button']}>
                                <div className={styles['overlap-group']}>
                                    <div className={`${styles['text-42']} ${styles['valign-text-middle']}`}>메뉴 등록</div>
                                    <div className={styles['small-btn_brown']}>
                                        <div className={`${styles['text-43']} ${styles['valign-text-middle']}`}>메뉴등록</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className={styles['footer']}>
                            <div className={styles['footer-contents']}>
                                <div className={`${styles['flex-row-2']} ${styles['flex-row-3']}`}>
                                    <div className={styles['flex-col']}>
                                        <div className={styles['overlap-group-1']}>
                                            <p className={`${styles['x']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                                상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 : 서울특별시 강남구 테헤란로 231,
                                                EAST동 20층(역삼동, 센터필드)
                                                <br />
                                                사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 : 제2009호-서울강남-00847호
                                            </p>
                                            <div className={`${styles['text-51']} ${styles['valign-text-middle']}`}>사업자정보확인</div>
                                            <p className={`${styles['text-52']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
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
                                        <div className={`${styles['text-53']} ${styles['valign-text-middle']} ${styles['notosanskr-light-coconut-12px']}`}>
                                            보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                                        </div>
                                        <div className={`${styles['text-54']} ${styles['valign-text-middle']}`}>서비스 가입사실 확인</div>
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

export default ItemList