import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";

import Complain from "./component/Main/Complain.js";
import ComplainWrite from "./component/Main/ComplainWrite.js";
import IntroMain from "./component/Main/IntroMain";
import LoginMainStore from "./component/Main/LoginMainStore.js";
import LoginStore from "./component/Main/LoginStore.js";
import MenuList from "./component/Main/MenuList.js";
import Store from "./component/Main/Store.js";

import MyAlarmList from "./component/Mypage/MyAlarmList.js";
import MyStoreInfo from "./component/Mypage/MyStoreInfo.js";
import MyStoreManage from "./component/Mypage/MyStoreManage.js";
import ShopItemDetail from "./component/Shop/ShopItemDetail.js";
import ShopMain from "./component/Shop/ShopMain.js";
import StockManage from "./component/Stock/StockManage.js";
import StockOrderItemAdd from "./component/Stock/StockOrderItemAdd.js";
import StockOrderStore from "./component/Stock/StockOtherStore.js";
import StockOrderStoreItem from "./component/Stock/StockOtherStoreItem.js";

import MainStoreHeader from "./component/Header/MainStoreHeader";
import CartList from "./component/Shop/CartList.js";
import WishItem from "./component/Shop/WishItem.js";

import Category from "./component/MainStore/Category.js";
import InsertMainStore from "./component/MainStore/InsertMainStore.js";
import MainStore_ItemDetail from "./component/MainStore/ItemDetail.js";
import ItemInsert from "./component/MainStore/ItemInsert.js";
import MainStore_ItemList from "./component/MainStore/ItemList.js";
import ItemUpdate from "./component/MainStore/ItemUpdate.js";
import MainStore_MenuDetail from "./component/MainStore/MenuDetail.js";
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
import NoticeList from "./component/CommunityStore/NoticeList.js";

import NoticeDetailMain from "./component/CommunityMainStore/NoticeDetailMain.js";
import NoticeListMain from "./component/CommunityMainStore/NoticeListMain.js";
import NoticeWriteMain from "./component/CommunityMainStore/NoticeWriteMain.js";
import JoinStore from "./component/CommunityStore/JoinStore.js";
import NoticeDetail from "./component/CommunityStore/NoticeDetail.js";
import NoticeModal from "./component/CommunityStore/NoticeModal.js";
import SalesAnalysis from "./component/CommunityStore/SalesAnalysis.js";
import SalesWrite from "./component/CommunityStore/SalesWrite.js";

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
      {/* {path===true? <Header/>:null} */}
      {/* <StoreHeader/> */}
      <MainStoreHeader />
      {/* <Footer/> */}

      <Routes>
        {/* 메인 페이지 링크 */}
        <Route exect path="/" element={<IntroMain />} />
        <Route exect path="/loginStore" element={<LoginStore />} />

        <Route exect path="/store" element={<Store />} />
        <Route exect path="/menu" element={<MenuList />} />
        <Route exect path="/complain" element={<Complain />} />

        <Route path="/complainWrite" element={<ComplainWrite />} />
        <Route path="/loginMainStore" element={<LoginMainStore />} />

        <Route exect path="/logout" element={<IntroMain />} />
        <Route exact path="/joinStore" element={<JoinStore />} />

        {/* 가맹점 페이지 링크 */}

        {/* <Route exect path="/changeStore" element={<Store/>} /> */}

        {/* 중첩 라우팅 설정 */}
        <Route path="/shopMain" element={<ShopLayout />}>
          <Route index element={<ShopMain />} />
        </Route>

        <Route exect path="/categoryItemList" element={<CategoryItemList />} />
        <Route exect path="/orderList" element={<OrderListForStore />} />
        <Route exect path="/orderDetail" element={<OrderDetailForStore />} />

        <Route exect path="/repairRequestList" element={<RepairRequestList />} />
        <Route exect path="/repairRequest" element={<RepairRequestForm />} />
        <Route exect path="/wishList" element={<WishItem />} />
        <Route exect path="/cartList" element={<CartList />} />
        <Route exect path="/order" element={<Order />} />
        <Route path="/shopItemDetail/:itemCode" element={<ShopItemDetail />}></Route>
        <Route exect path="/expenseList" element={<ExpenseListByItems />} />

        <Route exect path="/stockOrderItemAdd" element={<StockOrderItemAdd />} />
        <Route exect path="/stockManage" element={<StockManage />} />
        <Route exect path="/stockOtherStore" element={<StockOrderStore />} />
        <Route exect path="/stockOtherStoreItem" element={<StockOrderStoreItem />} />

        <Route exect path="/myAlarmList" element={<MyAlarmList />} />
        <Route exect path="/myStoreInfo" element={<MyStoreInfo />} />
        <Route exect path="/myStoreManage" element={<MyStoreManage />} />

        <Route exact path="/noticeList" element={<NoticeList />} />
        <Route exact path="/noticeDetail" element={<NoticeDetail />} />
        <Route exact path="/askWrite" element={<AskWrite />} />
        <Route exact path="/askList" element={<AskList />} />
        <Route exact path="/complainList" element={<ComplainList />} />
        <Route exact path="/complainDetail" element={<ComplainDetail />} />

        <Route exact path="/salesAnalysis" element={<SalesAnalysis />} />
        <Route exact path="/salesWrite" element={<SalesWrite />} />

        {/* 본사 페이지 링크 */}
        <Route exect path="/storeListMain" element={<StoreListMain />} />
        <Route exect path="/deleteReqStoreMain" element={<DeleteReqStoreMain />} />
        <Route exect path="/restoreStoreMain" element={<RestoreStoreMain />} />
        <Route exect path="/storeItemRevenue" element={<StoreItemRevenue />} />

        <Route exect path="/mainStoreOrderList" element={<OrderListForMainStore />} />
        <Route exect path="/mainStoreOrderDetail" element={<OrderDetailForMainStore />} />

        <Route path="/category" element={<Category />} />
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
        <Route exect path="/modifyStoreMain" element={<ModifyStoreMain />} />
        <Route exect path="/storeDetailMain" element={<StoreDetailMain />} />

        <Route exact path="/noticeWriteMain" element={<NoticeWriteMain />} />
        <Route exact path="/noticeListMain" element={<NoticeListMain />} />
        <Route exact path="/noticeDetailMain" element={<NoticeDetailMain />} />

        <Route exact path="/noticeModal" element={<NoticeModal />} />

        {/* <Route exact path="/askListMain" element={<AskListMain />} /> */}

        {/* 
        <Route exact path="/askDetailMain" element={<AskDetailMain />} />
        <Route exact path="/complainListMain" element={<ComplainListMain />} />
        <Route exact path="/complainDetailMain" element={<ComplainDetailMain />} /> */}
      </Routes>
    </div>
  );
}
export default App;
