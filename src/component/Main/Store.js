import { Carousel } from "@material-tailwind/react";
import * as m from '../styles/StyledMain.tsx';
import * as s from '../styles/StyledStore.tsx';
import React, { useEffect, useState } from "react";
import {Input} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import axios from "axios";
import { url } from "../../config.js";

import { Map } from "react-kakao-maps-sdk";

const Store = () => {
    const [storeList, setStoreList] = useState([]);
    const [storeName, setStoreName] = useState("");

    useEffect(()=>{
        setStoreList([]);
        getStoreList();
    }, [])

    const getStoreList = (address)=>{
        axios.get(`${url}/selectStoreByStoreAddress/${address}`)
        .then(res=>{
            console.log(res.data);
            setStoreList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const searchKeyword = (storeName)=>{
        axios.get(`${url}/selectStoreByName/${storeName}`)
        .then(res=>{
            console.log(res.data);
            setStoreList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
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
            
            <s.ContentDiv>
                <s.SearchDiv className="p-2">
                    <Input icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={()=>searchKeyword(storeName)}/>} label="매장명 검색" onChange={(e)=>setStoreName(e.target.value)}/>
                </s.SearchDiv>
                <Map
                    center={{ lat: 33.450701, lng: 126.570667 }}
                    style={{ width: '1000px', height: '600px' }}
                    level={3}
                />
            </s.ContentDiv>
        </>
    )
}
export default Store;