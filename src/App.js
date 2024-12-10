import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Route, Routes } from "react-router-dom";

import Header from "./component/Header/Header";
import Complain from "./component/Main/Complain.js";
import ComplainWrite from "./component/Main/ComplainWrite.js";
import IntroMain from "./component/Main/IntroMain";
import LoginStore from "./component/Main/LoginStore.js";
import MenuList from "./component/Main/MenuList.js";
import Store from "./component/Main/Store.js";

import StoreHeader from "./component/Header/StoreHeader";
import MyAlarmList from "./component/Mypage/MyAlarmList.js";
import MyStoreInfo from "./component/Mypage/MyStoreInfo.js";
import MyStoreManage from "./component/Mypage/MyStoreManage.js";
import ShopItemDetail from "./component/Shop/ShopItemDetail.js";
import ShopMain from "./component/Shop/ShopMain.js";
import StockManage from "./component/Stock/StockManage.js";
import StockOrderItemAdd from "./component/Stock/StockOrderItemAdd.js";
import StockOrderStore from "./component/Stock/StockOtherStore.js";
import StockOrderStoreItem from "./component/Stock/StockOtherStoreItem.js";

import CartList from "./component/Shop/CartList.js";
import WishItem from "./component/Shop/WishItem.js";

import MainStoreHeader from "./component/Header/MainStoreHeader";
import InsertMainStore from "./component/MainStore/InsertMainStore.js";
import ItemCategory from "./component/MainStore/ItemCategory.js";
import MainStore_ItemDetail from "./component/MainStore/ItemDetail.js";
import ItemInsert from "./component/MainStore/ItemInsert.js";
import MainStore_ItemList from "./component/MainStore/ItemList.js";
import ItemUpdate from "./component/MainStore/ItemUpdate.js";
import MainStore_MenuDetail from "./component/MainStore/MenuDetail.js";
import MenuCategory from "./component/MainStore/MenuCategory.js";
import MenuInsert from "./component/MainStore/MenuInsert.js";
import MainStore_MenuList from "./component/MainStore/MenuList.js";
import MenuUpdate from "./component/MainStore/MenuUpdate.js";
import OrderDetailForMainStore from "./component/MainStore/OrderDetailForMainStore.js";
import OrderListForMainStore from "./component/MainStore/OrderListForMainStore.js";
import RepairDetail from "./component/MainStore/RepairDetail.js";
import RepairList from "./component/MainStore/RepairList.js";
import CategoryItemList from "./component/Shop/CategoryItemList.js";
import OrderDetailForStore from "./component/Shop/OrderDetailForStore.js";
import Order from "./component/Shop/OrderForm.js";
import OrderListForStore from "./component/Shop/OrderListForStore.js";
import RepairRequestForm from "./component/Shop/RepairRequestForm.js";
import RepairRequestList from "./component/Shop/RepairRequestList.js";
import DeleteReqStoreMain from "./component/StoreManagement/DeleteReqStoreMain.js";
import RestoreStoreMain from "./component/StoreManagement/RestoreStoreMain.js";
import StoreListMain from "./component/StoreManagement/StoreListMain.js";

import AddStoreMain from "./component/StoreManagement/AddStoreMain.js";
import ModifyStoreMain from "./component/StoreManagement/ModifyStoreMain.js";
import StoreDetailMain from "./component/StoreManagement/StoreDetailMain.js";

import StoreItemRevenue from "./component/MainStore/StoreItemRevenue.js";
import ExpenseListByItems from "./component/Shop/ExpenseListByItems.js";
import ShopLayout from "./component/Shop/ShopLayout.js";

import AskList from "./component/CommunityStore/AskList.js";
import AskWrite from "./component/CommunityStore/AskWrite.js";
import ComplainDetail from "./component/CommunityStore/ComplainDetail.js";
import ComplainList from "./component/CommunityStore/ComplainList.js";
import JoinStore from "./component/CommunityStore/JoinStore.js";
import NoticeDetail from "./component/CommunityStore/NoticeDetail.js";
import NoticeList from "./component/CommunityStore/NoticeList.js";
import NoticeModal from "./component/CommunityStore/NoticeModal.js";

import AskDetailMain from "./component/CommunityMainStore/AskDetailMain.js";
import AskListMain from "./component/CommunityMainStore/AskListMain.js";
import ComplainDetailMain from "./component/CommunityMainStore/ComplainDetailMain.js";
import ComplainListMain from "./component/CommunityMainStore/ComplainListMain.js";
import NoticeDetailMain from "./component/CommunityMainStore/NoticeDetailMain.js";
import NoticeListMain from "./component/CommunityMainStore/NoticeListMain.js";
import NoticeWriteMain from "./component/CommunityMainStore/NoticeWriteMain.js";

import axios, { AxiosError } from "axios";
import { useAtom, useSetAtom } from "jotai/react";
import { alarmsAtom, fcmTokenAtom, initMember, memberAtom, memberLocalAtom, tokenAtom } from "./atoms.js";
import SalesAnalysis from "./component/CommunityStore/SalesAnalysis.js";
import SalesWrite from "./component/CommunityStore/SalesWrite.js";
import { url } from "./config.js";
import { firebaseReqPermission, registerServiceWorker } from "./firebaseconfig.js";
import SocialLogin from "./component/Main/SocialLogin.js";
import FindPassword from "./component/Main/FindPassword.js";
import NewPassword from "./component/Main/NewPassword.js";

function App() {
  const [path, setPath] = useState(false);
  const location = useLocation();
  const {pathname} = useLocation();
  const [member, setMember] = useAtom(memberAtom);

  const navigate = useNavigate();
  // Jotai에 있는 로그인 token 가져오기
  const setToken = useSetAtom(tokenAtom);

  // 알람 state 변수
  const [alarm, setAlarm] = useState({});
  // firebase token 가져오기
  const setFcmToken = useSetAtom(fcmTokenAtom);
  // 알람 리스트 가져오기
  const [alarms, setAlarms] = useAtom(alarmsAtom);

  useEffect(async () => {
    // app 실행하자마자 service Worker부터 받아오기
    registerServiceWorker();
    await navigator.serviceWorker.ready;

    // service worker부터 받아오고 token 받아와야 하므로 await 사용
    // firebase token과 알람 설정
    firebaseReqPermission(setFcmToken, setAlarm);

    // 로그인 페이지는 헤더 안 보이게 하기
    console.log(location.pathname)
    if (location.pathname === "loginStore") setPath(false);
    else if (location.pathname !== "loginStore") setPath(true);

    getItemCategory();
    getMenuCategory();
  }, []);

  // 로그아웃
  const logout = ()=>{
    setMember({...initMember});
    setToken('');
    setAlarms([]);

    navigate("/loginStore");
  }

  // refresh token 만료시 에러잡고 로그아웃
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        // Handle unauthorized access
        console.log(error);
        alert("로그인 시간 만료");
        logout();
      } else {
        // Handle other errors
        console.log(error);
      }
      return Promise.reject(error);
    }
  );

  useEffect(()=>{
    // route 경로가 바뀔때마다 변경
    if (pathname === "/findPassword") {
      setPath(false);
    }
    else if (pathname.includes("newPassword")) {
      setPath(false);
      console.log("ww");
    }
    else if (pathname !== "/findPassword") setPath(true);
  }, [pathname])

  // alarm state 변수가 바뀔 때마다 alarm이 빈 객체가 아니면 Jotai의 alarms 알람 리스트에 새로운 알람 하나 추가
  useEffect(() => {
    JSON.stringify(alarm) !== "{}" && setAlarms([...alarms, alarm]);
  }, [alarm]);

  const [majorCategory, setMajorCategory] = useState([]);
  const [middleCategory, setMiddleCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  // item category 가져오기
  const getItemCategory = () => {
    // {"major":{}, "middle":{}, "sub":{}}
    axios
      .get(`${url}/selectCategory`)
      .then(res => {
        console.log(res.data);
        setMajorCategory(res.data.major);
        setMiddleCategory(res.data.middle);
        setSubCategory(res.data.sub);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [menuCategory, setMenuCategory] = useState([]);
  // menu category 가져오기
  const getMenuCategory = () => {
    axios
      .get(`${url}/selectMenuCategory`)
      .then(res => {
        console.log(res.data);
        setMenuCategory(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      {member.roles === "" && (path === true ? <Header /> : null)}
      {member.roles === "ROLE_STORE" && <StoreHeader alarms={alarms} />}
      {member.roles === "ROLE_MAINSTORE" && <MainStoreHeader />}

      <Routes>
        {/* 메인 페이지 링크 */}
        <Route exect path="/" element={<IntroMain />} />
        <Route exect path="/loginStore" element={<LoginStore />} />

        <Route exect path="/store" element={<Store />} />
        <Route exect path="/menu" element={<MenuList menu={menuCategory} />} />
        <Route exect path="/complain" element={<Complain />} />

        <Route path="/complainWrite" element={<ComplainWrite />} />

        <Route exect path="/logout" element={<IntroMain />} />
        <Route exect path="/joinStore" element={<JoinStore />} />

        <Route exect path="/socialLogin" element={<SocialLogin/>} />
        <Route exect path="/findPassword" element={<FindPassword/>} />
        <Route exect path="/newPassword/:username" element={<NewPassword/>} />

        {/* 가맹점 페이지 링크 */}

        {/* <Route exect path="/changeStore" element={<Store/>} /> */}

        {/* 중첩 라우팅 설정 */}
        <Route
          path="/shopMain"
          element={
            <ShopLayout
              categories={{ major: majorCategory, middle: middleCategory, sub: subCategory }}
            />
          }
        >
          <Route index element={<ShopMain />} />
        </Route>

        <Route
          exect
          path="/categoryItemList"
          element={
            <CategoryItemList
              categories={{ major: majorCategory, middle: middleCategory, sub: subCategory }}
            />
          }
        />
        <Route exect path="/orderList" element={<OrderListForStore />} />
        <Route exect path="/orderDetail/:orderCode" element={<OrderDetailForStore />} />

        <Route exect path="/repairRequestList" element={<RepairRequestList />} />
        <Route exect path="/repairRequest" element={<RepairRequestForm />} />
        <Route exect path="/wishList" element={<WishItem />} />
        <Route exect path="/cartList" element={<CartList />} />
        <Route exect path="/order" element={<Order />} />
        <Route path="/shopItemDetail/:itemCode" element={<ShopItemDetail />} />
        <Route exect path="/expenseList" element={<ExpenseListByItems />} />

        <Route exect path="/stockOrderItemAdd" element={<StockOrderItemAdd />} />
        <Route
          exect
          path="/stockManage"
          element={<StockManage major={majorCategory} middle={middleCategory} sub={subCategory} />}
        />
        <Route exect path="/stockOtherStore" element={<StockOrderStore />} />
        <Route exect path="/stockOtherStoreItem" element={<StockOrderStoreItem />} />

        <Route exect path="/myAlarmList" element={<MyAlarmList />} />
        <Route exect path="/myStoreInfo" element={<MyStoreInfo />} />
        <Route exect path="/myStoreManage" element={<MyStoreManage />} />

        <Route exact path="/noticeList" element={<NoticeList />} />
        <Route exact path="/noticeDetail/:noticeNum" element={<NoticeDetail />} />
        <Route exact path="/askWrite" element={<AskWrite />} />
        <Route exact path="/askList" element={<AskList />} />
        <Route exact path="/complainList" element={<ComplainList />} />
        <Route exact path="/complainDetailStore/:complainNum" element={<ComplainDetail />} />

        <Route exact path="/salesAnalysis" element={<SalesAnalysis />} />
        <Route exact path="/salesWrite" element={<SalesWrite />} />

        {/* 본사 페이지 링크 */}
        <Route exect path="/storeListMain" element={<StoreListMain />} />
        <Route exect path="/deleteReqStoreMain" element={<DeleteReqStoreMain />} />
        <Route exect path="/restoreStoreMain" element={<RestoreStoreMain />} />
        <Route exect path="/storeItemRevenue" element={<StoreItemRevenue />} />

        <Route exect path="/mainStoreOrderList" element={<OrderListForMainStore />} />
        <Route exect path="/mainStoreOrderDetail/:orderCode" element={<OrderDetailForMainStore />} />

        <Route path="/category" element={<ItemCategory />} />
        <Route path="/menuCategory" element={<MenuCategory />} />
        <Route path="/insertMainStore" element={<InsertMainStore />} />
        <Route path="/mainItemDetail/:itemCode" element={<MainStore_ItemDetail />} />
        <Route path="/mainMenuDetail/:menuCode" element={<MainStore_MenuDetail />} />
        <Route path="/repairDetail/:repairNum" element={<RepairDetail />} />
        <Route path="/repairList" element={<RepairList />} />

        <Route path="/mainItemList" element={<MainStore_ItemList />} />

        <Route path="/mainMenuList" element={<MainStore_MenuList />} />
        <Route path="/itemInsert" element={<ItemInsert />} />
        <Route path="/itemUpdate/:itemCode" element={<ItemUpdate />} />
        <Route path="/menuInsert" element={<MenuInsert />} />
        <Route path="/menuUpdate/:menuCode" element={<MenuUpdate />} />

        <Route exect path="/addStoreMain" element={<AddStoreMain />} />
        <Route exect path="/modifyStoreMain/:storeCode" element={<ModifyStoreMain />} />
        <Route exect path="/storeDetailMain/:storeCode" element={<StoreDetailMain />} />

        <Route exact path="/noticeListMain" element={<NoticeListMain />} />
        <Route exact path="/noticeWriteMain" element={<NoticeWriteMain />} />
        <Route exact path="/NoticeDetailMain/:noticeNum" element={<NoticeDetailMain />} />
        <Route exact path="/noticeWrite" element={<NoticeWriteMain />} />
        <Route exact path="/noticeModal" element={<NoticeModal />} />
        <Route exact path="/askListMain" element={<AskListMain />} />
        <Route exact path="/askDetailMain/:askNum" element={<AskDetailMain />} />
        <Route exact path="/complainListMain" element={<ComplainListMain />} />
        <Route exact path="/complainDetailMain/:complainNum" element={<ComplainDetailMain />} />
      </Routes>
    </div>
  );
}
export default App;
