import React from 'react'
import * as m from '../styles/StyledMain.tsx';
import frame_300 from '../assets/img/frame-300.svg'
import plus from '../assets/img/plus-circle-outline.svg'
import minus from '../assets/img/minus-circle-outline.svg'
import circle_small from '../assets/img/circle-small.svg'
import '../styles/Category.css'

function Category() {
  return (
    <>
      <m.CarouselDiv>

        <input type="hidden" id="anPageName" name="page" value="category" />
        <div class="container-center-horizontal">
          <div class="category screen">

            <div class="text-8 valign-text-middle">상품 카테고리 등록</div>
            <div class="frame-container">
              <div class="frame-293">
                <div class="text-3 valign-text-middle notosanskr-medium-black-12px">
                  대분류
                </div>
              </div>
              <div class="frame-294">
                <div class="text-3 valign-text-middle notosanskr-medium-black-12px">
                  중분류
                </div>
              </div>
              <div class="frame-295">
                <div class="text-3 valign-text-middle notosanskr-medium-black-12px">
                  소분류
                </div>
              </div>
            </div>
            <div class="overlap-group2">
              <div class="frame-292">
                <div class="view">
                  <div class="flex-col">
                    <div class="overlap-group-container">
                      <div class="smallbtn">
                        <div class="small-btn_white small">
                          <div class="text valign-text-middle notosanskr-medium-log-cabin-12px">
                            수정
                          </div>
                        </div>
                        <div class="small-btn_white small">
                          <div class="text valign-text-middle notosanskr-medium-log-cabin-12px">
                            수정
                          </div>
                        </div>
                      </div>
                      <div class="smallbtn">
                        <div class="small-btn_brown small">
                          <div class="text valign-text-middle notosanskr-medium-white-12px">
                            저장
                          </div>
                        </div>
                        <div class="small-btn_brown small">
                          <div class="text valign-text-middle notosanskr-medium-white-12px">
                            저장
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="frame-301">
                      <div class="frame-299">
                        <div class="text-1 valign-text-middle notosanskr-light-black-16px">
                          커피자재
                        </div>
                      </div>
                      <img class="frame-300" src={frame_300} alt="Frame 300" />
                    </div>
                    <div class="frame-30">
                      <div class="frame-299">
                        <div class="text-1 valign-text-middle notosanskr-light-black-16px">
                          분말가공
                        </div>
                      </div>
                      <img class="frame-300" src={frame_300} alt="Frame 300" />
                    </div>
                    <div class="frame-30">
                      <div class="frame-299">
                        <div class="text-1 valign-text-middle notosanskr-light-black-16px">
                          시럽
                        </div>
                      </div>
                      <img class="frame-300" src={frame_300} alt="Frame 300" />
                    </div>
                    <div class="frame-30">
                      <div class="frame-299">
                        <div class="text-1 valign-text-middle notosanskr-light-black-16px">
                          차류
                        </div>
                      </div>
                      <img class="frame-300" src={frame_300} alt="Frame 300" />
                    </div>
                    <div class="frame-30">
                      <div class="frame-299">
                        <div class="text-1 valign-text-middle notosanskr-light-black-16px">
                          액체류
                        </div>
                      </div>
                      <img class="frame-300" src={frame_300} alt="Frame 300" />
                    </div>
                    <div class="frame-30">
                      <div class="frame-299">
                        <div class="text-1 valign-text-middle notosanskr-light-black-16px">
                          유가공품
                        </div>
                      </div>
                      <img class="frame-300" src={frame_300} alt="Frame 300" />
                    </div>
                    <div class="frame-30">
                      <div class="frame-299">
                        <div class="text-1 valign-text-middle notosanskr-light-black-16px">
                          유지류
                        </div>
                      </div>
                      <img class="frame-300" src={frame_300} alt="Frame 300" />
                    </div>
                    <div class="input">
                      <div class="text-2 valign-text-middle notosanskr-light-gray-nurse-16px">
                        카테고리명 입력
                      </div>
                    </div>
                  </div>
                </div>
                <div class="view-1">
                  <div class="view-2">
                    <div class="smallbtn_-container">
                      <div class="small-btn_white-1">
                        <div class="text valign-text-middle notosanskr-medium-log-cabin-12px">
                          수정
                        </div>
                      </div>
                      <div class="small-btn_brown-1">
                        <div class="text valign-text-middle notosanskr-medium-white-12px">
                          저장
                        </div>
                      </div>
                    </div>
                    <div class="frame-301-1 frame-301-3">
                      <div class="frame-299">
                        <div class="text-1 valign-text-middle notosanskr-light-black-16px">
                          카페인
                        </div>
                      </div>
                      <img class="frame-300" src={frame_300} alt="Frame 300" />
                    </div>
                    <div class="frame-30-1">
                      <div class="frame-299-1">
                        <div class="text-4 valign-text-middle notosanskr-light-black-16px">
                          디카페인
                        </div>
                      </div>
                      <img class="frame-300" src={frame_300} alt="Frame 300" />
                    </div>
                    <div class="frame-30-1">
                      <div class="frame-299">
                        <div class="text-1 valign-text-middle notosanskr-light-black-16px">
                          기타
                        </div>
                      </div>
                      <img class="frame-300" src={frame_300} alt="Frame 300" />
                    </div>
                    <div class="input">
                      <div class="text-2 valign-text-middle notosanskr-light-gray-nurse-16px">
                        카테고리명 입력
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="view-3">
                <div class="smallbtn_-container">
                  <div class="small-btn_white-1">
                    <div class="text valign-text-middle notosanskr-medium-log-cabin-12px">
                      수정
                    </div>
                  </div>
                  <div class="small-btn_brown-1">
                    <div class="text valign-text-middle notosanskr-medium-white-12px">
                      저장
                    </div>
                  </div>
                </div>
                <div class="frame-301-2 frame-301-3">
                  <div class="frame-299">
                    <div class="text-34 valign-text-middle notosanskr-light-black-16px">
                      원두
                    </div>
                  </div>
                  <img class="frame-300" src={frame_300} alt="Frame 300" />
                </div>
                <div class="frame-30-1">
                  <div class="frame-299-1">
                    <div class="text-4 valign-text-middle notosanskr-light-black-16px">
                      콜드부르
                    </div>
                  </div>
                  <img class="frame-300" src={frame_300} alt="Frame 300" />
                </div>
                <div class="frame-30-1">
                  <div class="frame-299">
                    <div class="text-1 valign-text-middle notosanskr-light-black-16px">
                      기타
                    </div>
                  </div>
                  <img class="frame-300" src={frame_300} alt="Frame 300" />
                </div>
                <div class="input">
                  <div class="text-2 valign-text-middle notosanskr-light-gray-nurse-16px">
                    카테고리명 입력
                  </div>
                </div>
              </div>
              <img
                class="plus-circle-outline"
                src={plus}
                alt="plus-circle-outline"
              />
              <img
                class="minus-circle-outline"
                src={minus}
                alt="minus-circle-outline"
              />
              <img
                class="plus-circle-outline-1 plus-circle-outline-3"
                src={plus}
                alt="plus-circle-outline"
              />
              <img
                class="minus-circle-outline-1 minus-circle-outline-3"
                src={minus}
                alt="minus-circle-outline"
              />
              <img
                class="plus-circle-outline-2 plus-circle-outline-3"
                src={plus}
                alt="plus-circle-outline"
              />
              <img
                class="minus-circle-outline-2 minus-circle-outline-3"
                src={minus}
                alt="minus-circle-outline"
              />
            </div>
            <div class="flex-row">
              <img class="circle-small" src={circle_small} alt="circle-small" />
              <div class="text-45 valign-text-middle">선택한 대분류 카테고리</div>
            </div>
            <div class="frame-309">
              <div class="frame-310 notosanskr-light-black-16px">
                <div class="text-40 valign-text-middle">
                  커피자재&gt;원두&gt;카페인
                </div>
                <div class="text-41 valign-text-middle">
                  커피자재&gt;원두&gt;디카페인
                </div>
                <div class="text-42 valign-text-middle">
                  커피자재&gt;원두&gt;기타
                </div>
                <div class="text-43 valign-text-middle">커피자재&gt;콜드부르</div>
                <div class="text-44 valign-text-middle">커피자재&gt;기타</div>
              </div>
            </div>
            <footer class="footer">
              <div class="footer-contents">
                <div class="flex-row-1">
                  <div class="flex-col-1 flex-col-3">
                    <div class="overlap-group-1">
                      <p class="x valign-text-middle notosanskr-light-coconut-12px">
                        상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                        서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동,
                        센터필드)
                        <br />
                        사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 :
                        제2009호-서울강남-00847호
                      </p>
                      <div class="text-9 valign-text-middle">사업자정보확인</div>
                      <p class="text-10 valign-text-middle notosanskr-light-coconut-12px">
                        │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜
                        더블유컨셉코리아
                      </p>
                    </div>
                    <p class="copyright valign-text-middle notosanskr-light-coconut-12px">
                      COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                    </p>
                  </div>
                  <div class="vertical-divider-1"></div>
                </div>
                <div class="flex-col-2 flex-col-3">
                  <p class="heading-3 valign-text-middle">
                    <span>
                      <span class="span0">
                        소비자피해보상보험
                        <br />
                      </span>
                      <span class="span1-1">
                        고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서
                        가입한
                        <br />
                        소비자피해보상보험 서비스를 이용하실 수 있습니다.
                      </span>
                    </span>
                  </p>
                  <div class="text-container">
                    <div class="text-11 valign-text-middle notosanskr-light-coconut-12px">
                      보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                    </div>
                    <div class="text-12 valign-text-middle">
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

export default Category