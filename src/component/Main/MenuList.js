import { Carousel } from "@material-tailwind/react";
import * as m from '../styles/StyledMain.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/StyledHeader.tsx';

const MenuList = () => {
    const data = [
        {
            imageLink:
                "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
            imageLink:
                "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
            imageLink:
                "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
        },
        {
            imageLink:
                "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        },
        {
            imageLink:
                "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
        },
        {
            imageLink:
                "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
        },
        {
            imageLink:
                "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg",
        },
        {
            imageLink:
                "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
        },
        {
            imageLink:
                "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
        },
    ];
    return (
        <>
            <m.CarouselDiv>
                <Carousel transition={{ duration: 1 }}
                    className="xl"
                    navigation={({ setActiveIndex, activeIndex, length }) => (
                        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                            {new Array(length).fill("").map((_, i) => (
                                <span
                                    key={i}
                                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                        }`}
                                    onClick={() => setActiveIndex(i)}
                                />
                            ))}
                        </div>
                    )}
                >
                    <img
                        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                        alt="image 2"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                        alt="image 3"
                        className="h-full w-full object-cover"
                    />
                </Carousel>
            </m.CarouselDiv>

            <s.MenuBarDiv>
                <s.MenuBarLinkDiv borderLeft="none"><s.MenuBarLink to="/shopMain">커피</s.MenuBarLink></s.MenuBarLinkDiv>
                <s.MenuBarLinkDiv><s.MenuBarLink to="/stockAdd">더치커피</s.MenuBarLink></s.MenuBarLinkDiv>
                <s.MenuBarLinkDiv><s.MenuBarLink to="/orderList">주스</s.MenuBarLink></s.MenuBarLinkDiv>
                <s.MenuBarLinkDiv><s.MenuBarLink to="/salesManagement">스무디</s.MenuBarLink></s.MenuBarLinkDiv>
                <s.MenuBarLinkDiv><s.MenuBarLink to="/noticeList">티</s.MenuBarLink></s.MenuBarLinkDiv>
                <s.MenuBarLinkDiv><s.MenuBarLink to="/myAlarmList">에이드</s.MenuBarLink></s.MenuBarLinkDiv>
                <s.MenuBarLinkDiv><s.MenuBarLink to="/myAlarmList">프라페</s.MenuBarLink></s.MenuBarLinkDiv>
                <s.MenuBarLinkDiv><s.MenuBarLink to="/myAlarmList">디저트</s.MenuBarLink></s.MenuBarLinkDiv>
                <s.MenuBarLinkDiv><s.MenuBarLink to="/myAlarmList">MD상품</s.MenuBarLink></s.MenuBarLinkDiv>
            </s.MenuBarDiv>

            <s.MenuImgDiv>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
                {data.map(({ imageLink }, index) => (
                    <s.OneImgAndPDiv key={index}>
                        <s.ImgHoverText>⚬ 카페인 : 208mg<br/>
                            ⚬ 열량(kcal) : 258.3<br/>
                            ⚬ 탄수화물(g) : 32.5<br/>
                            ⚬ 당류(g) : 29.5<br/>
                            ⚬ 단백질(g) : 7.5<br/>
                            ⚬ 나트륨(mg) : 142.5<br/>
                            ⚬ 지방(g) : 10
                        </s.ImgHoverText>
                    <s.ImgDiv>
                        <s.ImgStyle 
                            className="object-center"
                            src={imageLink}
                            alt="gallery-photo"
                            />
                    <s.TitleText>메뉴명</s.TitleText>
                    </s.ImgDiv>
                    </s.OneImgAndPDiv>
                ))}
            </div>
            </s.MenuImgDiv>
        </>
    )
}
export default MenuList;