import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";

import Header from "./component/Header/Header";
import Complain from "./component/Main/Complain.js";
import ComplainWrite from "./component/Main/ComplainWrite.js";
import IntroMain from "./component/Main/IntroMain";
import LoginMainStore from "./component/Main/LoginMainStore.js";
import LoginStore from "./component/Main/LoginStore.js";
import MenuList from "./component/Main/MenuList.js";
import Store from "./component/Main/Store.js";

import ItemDetail from "./component/Shop/ItemDetail.js";
import ShopMain from "./component/Shop/ShopMain.js";

import NoticeWrite from "./component/Community(MainStore)/NoticeWrite.js";
import AskList from "./component/Community(store)/AskList.js";
import AskWrite from "./component/Community(store)/AskWrite";
import ComplainDetail from "./component/Community(store)/ComplainDetail.js";
import ComplainList from "./component/Community(store)/ComplainList";
import NoticeList from "./component/Community(store)/NoticeList.js";
import SalesWrite from "./component/SalesManagement(store)/SalesWrite.js";

import SalesAnalysis from "./component/SalesManagement(store)/SalesAnalysis.js";
import CartList from "./component/Shop/CartList.js";
import WishItem from "./component/Shop/WishItem.js";

function App() {
  const [path, setPath] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // 로그인 페이지는 헤더 안 보이게 하기
    if (location.pathname === "loginStore" && path) setPath(false);
    else if (location.pathname !== "loginStore" && !path) setPath(true);
  });

  return (
    <div>
      {path === true ? <Header /> : null}
      <br />
      {/* <StoreHeader/> */}
      {/* <MainStoreHeader/> */}
      {/* <Footer/> */}

      <Routes>
        {/* 메인 페이지 링크 */}
        <Route exect path="/" element={<IntroMain />} />
        <Route exect path="/loginStore" element={<LoginStore />} />
        {/* <Route exect path="/joinStore" element={<JoinStore/>}/> */}

        <Route exect path="/store" element={<Store />} />
        <Route exect path="/menu" element={<MenuList />} />
        <Route exect path="/complain" element={<Complain />} />

        <Route path="/complainWrite" element={<ComplainWrite />} />
        <Route path="/loginMainStore" element={<LoginMainStore />} />

        {/* <Route exect path="/logout" element={<Store/>} /> */}

        {/* 가맹점 페이지 링크 */}

        {/* <Route exect path="/changeStore" element={<Store/>} /> */}
        {/* <Route exect path="/logout" element={<IntroMain/>} /> */}

        <Route exect path="/shopMain" element={<ShopMain />} />
        {/* <Route exect path="/stockAdd" element={<Complain/>} /> */}
        {/* <Route exect path="/orderList" element={<LoginStore/>} /> */}
        {/* <Route exect path="/salesManagement" element={<JoinStore/>}/> */}
        {/* <Route exect path="/noticeList" element={<JoinStore/>}/> */}
        {/* <Route exect path="/myAlarmList" element={<JoinStore/>}/> */}

        {/* <Route exect path="/alarm" element={<JoinStore/>}/> */}
        {/* <Route exect path="/repairList" element={<JoinStore/>}/> */}
        <Route exect path="/wishList" element={<WishItem />} />
        <Route exect path="/cartList" element={<CartList />} />
        <Route path="/itemDetail/:itemCode" element={<ItemDetail />}></Route>

        {/* 본사 페이지 링크 */}
        {/* <Route exect path="/storeList" element={<IntroMain/>} /> */}
        {/* <Route exect path="/itemList" element={<MenuList/>} /> */}
        {/* <Route exect path="/menuList" element={<Complain/>} /> */}
        {/* <Route exect path="/itemRevenue" element={<LoginStore/>} /> */}
        {/* <Route exect path="/noticeList" element={<JoinStore/>}/> */}

        {/* <Route exect path="/joinAccount" element={<JoinStore/>}/> */}
        {/* <Route exect path="/shopMain" element={<JoinStore/>}/> */}

        {/*가맹점 페이지 링크 (상민)*/}
        <Route exact path="/noticeList" element={<NoticeList />} />
        <Route exact path="/askWrite" element={<AskWrite />} />
        <Route exact path="/askList" element={<AskList />} />
        <Route exact path="/complainList" element={<ComplainList />} />
        <Route exact path="/complainDetail" element={<ComplainDetail />} />

        <Route exact path="/salesWrite" element={<SalesWrite />} />
        <Route exact path="/SalesAnalysis" element={<SalesAnalysis />} />

        {/*본사 페이지 링크(상민)*/}
        <Route exact path="/noticeWrite" element={<NoticeWrite />} />
      </Routes>
    </div>
  );
}
export default App;
