import { Carousel } from "@material-tailwind/react";
import * as m from '../styles/StyledMain.tsx';
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config.js";

const IntroMain = ()=>{
    const [signatureMenu, setSignatureMenu] = useState({});
    const [menuList, setMenuList] = useState([]);

    useEffect(()=>{
        setMenuList([]);
        getMenuList();
    }, [])

    useEffect(()=>{
        // 시그니처 메뉴를 가져온다.
        setSignatureMenu(menuList.find(menu=>menu.menuStatus==="signature"));
    }, [menuList])

    const getMenuList = ()=>{
        axios.get(`${url}/selectMenu`)
        .then(res=>{
            console.log(res.data);
            setMenuList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const bannerImages = [
        {
          id: 1,
          imageUrl: "/image/cafe1.jpg"
        },
        {
          id: 2,
          imageUrl: "/image/cafe2.jpg"
        },
        {
          id: 3,
          imageUrl: "/image/cafe3.jpg"
        }
    
      ];

    return(
        <>
            <m.CarouselDiv>
                <Carousel
                autoplay={true}
                autoplayDelay={4000}
                loop={true}
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
                {/* 배너 이미지 */}
        {bannerImages.map((banner) => (
          <img key={banner.id}
            src={banner.imageUrl}
            alt="testing"
            className="w-full h-full object-cover"
          />
        ))}
        </Carousel>
        </m.CarouselDiv>
            {
                signatureMenu!==undefined &&
                <m.SignatureDiv>
                    <m.SignatureMenuImage style={{marginTop:'57px', width:'270px', height:'330px', borderRadius:'50px'}} src={`${url}/image/${signatureMenu.menuFileName}`} alt=''/>
                    <m.Circle></m.Circle>
                    <m.SignatureMenuDiv>
                        <m.SignatureMenuP fontSize="40px" marginTop="100px">Signature</m.SignatureMenuP>
                        <m.SignatureMenuP fontSize="25px" marginTop="20px">{signatureMenu.menuName}</m.SignatureMenuP>
                    </m.SignatureMenuDiv>
                </m.SignatureDiv>
            }

            {/* <m.BestDiv>
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
                    <Carousel className="rounded-xl"
                    >
                    {menuList.map(menu => (
                        <div key={menu.menuCode}>
                            <img
                                className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                                src={`${url}/image/${menu.menuFileNum}`}
                                alt="이미지 로딩 실패"
                                />
                        </div>
                    ))}
                    </Carousel>
                </div>
            </m.BestDiv> */}
        </>
    )
}
export default IntroMain;