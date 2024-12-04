import { useLocation } from 'react-router';
import * as s from '../styles/StyledStore.tsx';
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config.js';

import { CustomOverlayMap, Map, MapMarker, Polyline, useMap } from "react-kakao-maps-sdk";
import { useAtom } from 'jotai/react';
import { memberAtom } from '../../atoms.js';

const StockOrderStoreItem = () => {
    // 이전 페이지에서 navigate로 넘겨준 itemCode 받아오기
    const location = useLocation();
    const itemCode = location.state.itemCode;
    const itemName = location.state.itemName;
    const [storeList, setStoreList] = useState([]);
    const [isStore, setIsStore] = useState(false);

    // Jotai의 member 가져오기
    const [member, setMember] = useAtom(memberAtom);

    // 지도의 중심좌표
    const [center, setCenter] = useState({
        lat: 33.450701,
        lng: 126.570667,
    });

    // store와 지도 마커를 찍을 위치(위도, 경도)
    const [latlngPositions, setLatlngPositions] = useState([]);

    // 주소-좌표 변환 객체를 생성
    const geocoder = new window.kakao.maps.services.Geocoder();

    useEffect(()=>{
        setLatlngPositions([]);
        setStoreList([]);
        getStoreList();
        // 1. 현재 위치 얻어오기
        navigator.geolocation.getCurrentPosition((pos) => {
            setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        });
    }, [])

    useEffect(()=>{
        if(isStore) {
            getLatLng();
        }
    }, [isStore])

    useEffect(()=>{
        console.log(latlngPositions);
    }, [latlngPositions])

    const getStoreList = ()=>{
        axios.get(`${url}/selectStoreByItemCode/${itemCode}`)
        .then(res=>{
            console.log(res.data);
            setStoreList([...res.data]);
            setIsStore(!isStore);
        })
        .catch(err=>{
            console.log(err);
            alert("잠시후 다시 시도해주세요.");
        })
    }

    // 2. store address로 해당 위도, 경도로 바꾸기
    const getLatLng = ()=>{
        const newArray = [];
        // 주소로 좌표를 검색 후 위도, 경도 저장
        storeList.forEach(function(store) {
            console.log(store);
            geocoder.addressSearch(store.storeAddress, function(result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                    var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    console.log(coords);
                    
                    // 3. 위도 경도로 현재 위치에서 범위 안에 있는 store address만 가져오기
                    // 현재 위치와 store의 위치 사이의 거리를 구한다.
                    let dist = getDistanceFromLatLonInKm(center.lat, center.lng, coords.Ma, coords.La);
                    var coord = { lat: coords.Ma, lng: coords.La };
                    if(dist <= 2) { // 2km 이하에 있으면 추가
                        newArray.push({"store":store, "coords":coord});
                    }
                    console.log(store.storeCode + " : " + dist);
                }
            });
        });
        setIsStore(!isStore);
        setLatlngPositions(newArray);
    }

    // 두 좌표 사이의 거리를 km로 계산
    function getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {//lat1:위도1, lng1:경도1, lat2:위도2, lat2:경도2
        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lng2-lng1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d; 
    }

    const EventMarkerContainer = ({ position }) => {
        const map = useMap();
        const [isVisible, setIsVisible] = useState(false);
    
        return (
            <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                position={position.coords} // 마커를 표시할 위치
            >   
                                {isVisible && (
                                    <div style={{position:'absolute', bottom:'40px', width:'250px', padding: "5px", border:"1px solid rgba(234, 234, 234, 1)", backgroundColor:"rgba(255, 255, 255, 1)"}} onClick={()=>setIsVisible(false)}>
                                        <img
                                            alt="close" 
                                            width="14"
                                            height="13"
                                            src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                                            style={{
                                                position:"absolute",
                                                right:"5px",
                                                top:"5px",
                                                cursor:"pointer",
                                            }}
                                            />
                                        {position.store.storeName}<br/>
                                        {position.store.storeAddress}<br/>
                                        {position.store.storePhone}&nbsp;&nbsp;&nbsp;{position.store.storeOpenTimeStr}~{position.store.storeCloseTimeStr}
                                    </div>
                                )}
                                <div style={{position:'relative', width:'64px', height:'40px'}} onClick={()=>setIsVisible(true)}>
                                    <img src="/marker.png" alt='' style={{width:'64px', height:'40px'}}/>
                                    <span className="center" style={{position:'absolute', top:'5px', left:'34px', fontSize:'14px', fontWeight:'bold'}}>{position.store.stockCount}개</span>
                                </div>
                            </CustomOverlayMap>
        )
      }

    return (
        <>
            <s.ContentListDiv>
                <s.MainTitleText>타매장재고조회</s.MainTitleText>
                <s.SearchButtonDiv>
                    <s.SearchDiv>
                        <Input type='text' value={itemName} disabled/>
                    </s.SearchDiv>
                    <Map
                        center={center}
                        style={{ width: '1000px', height: '600px'}}
                        level={3}>

                        <MapMarker // 현재 내 위치 마커 표시
                            position={center} // 마커를 표시할 위치
                            clickable={true} // 마커 클릭 시 지도 클릭 이벤트 발생 안 하도록 설정
                            title='내 매장 위치' // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
                        />

                    {// 4. 해당하는 store 마커로 보여주기
                        latlngPositions.map((position, index)=>(
                            <EventMarkerContainer
                                key={`${position.store.storeCode}${index}`}
                                position={position}
                            />
                    ))}
                    </Map>
                </s.SearchButtonDiv>
            </s.ContentListDiv>
        </>
    )
}
export default StockOrderStoreItem;