import { Carousel } from "@material-tailwind/react";
import * as m from '../styles/StyledMain.tsx';
import * as s from '../styles/StyledStore.tsx';
import * as h from '../styles/StyledHeader.tsx';
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config.js";

const MenuList = ({menu}) => {
    const [menuCategory, setMenuCategory] = useState([]);
    const [menuList, setMenuList] = useState([]);

    useEffect(()=>{
        setMenuCategory(menu);
        setMenuList([]);
        getMenuList(1);
    }, [])

    const getMenuList = (categoryNum)=>{
        axios.get(`${url}/selectMenuByCategory/${categoryNum}`)
        .then(res=>{
            console.log(res.data);
            setMenuList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
        })
    }

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
                {
                    menuCategory.map(menu=>(
                        <s.MenuBarLinkDiv key={menu.menuCategoryNum} borderLeft={menu.menuCategoryNum===1?"none":""}><s.MenuBarLink onClick={()=>getMenuList(menu.menuCategoryNum)}>{menu.menuCategoryName}</s.MenuBarLink></s.MenuBarLinkDiv>
                    ))
                }
            </s.MenuBarDiv>

            <s.MenuImgDiv>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
                {menuList.map(menu=>(
                    <s.OneImgAndPDiv key={menu.menuCode}>
                        <s.ImgHoverText>
                            {menu.caffine ? <div style={{paddingBottom:'10px'}}>⚬ 카페인 : {menu.caffine}<br/></div> : <></>}
                            {menu.calories ? <div style={{paddingBottom:'10px'}}>⚬ 열량(kcal) : {menu.calories}<br/></div> : <></>}
                            {menu.carbohydrate ? <div style={{paddingBottom:'10px'}}>⚬ 탄수화물(g) : {menu.carbohydrate}<br/></div> : <></>}
                            {menu.sugar ? <div style={{paddingBottom:'10px'}}>⚬ 당류(g) : {menu.sugar}<br/></div> : <></>}
                            {menu.protein ? <div style={{paddingBottom:'10px'}}>⚬ 단백질(g) : {menu.protein}<br/></div> : <></>}
                            {menu.natrium ? <div style={{paddingBottom:'10px'}}>⚬ 나트륨(mg) : {menu.natrium}<br/></div> : <></>}
                            {menu.fat ? <div>⚬ 지방(g) : {menu.fat}<br/></div> : <></>}
                        </s.ImgHoverText>
                    <s.ImgDiv>
                        <s.ImgStyle 
                            className="object-center"
                            src={`${url}/image/${menu.menuFileNum}`}
                            alt="이미지 로딩 실패"
                        />
                    <s.TitleText>{menu.menuName}</s.TitleText>
                    </s.ImgDiv>
                    </s.OneImgAndPDiv>
                ))}
            </div>
            </s.MenuImgDiv>
        </>
    )
}
export default MenuList;