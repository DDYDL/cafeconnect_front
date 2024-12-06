import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import HoverCategorySidebar from './HoverCategorySidebar.js';

//ShopLayout-부모 (마우스 호버되는 카테고리 사이드바 관리)  
const ShopLayout = ({categories}) => {

  const [isHovered, setIsHovered] = useState(false); 
  return (
    <>

    <div className="min-h-screen">

      <div 
        className="fixed left-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className="bg-blue-gray-50 p-2 rounded-r-lg">
          <ChevronRightIcon className="h-6 w-4" />
        </div>
      </div>
        {/* ShopMain에서 호버된 카테고리 z-30 최상위 위치 시킴  */}
        {isHovered && (
        <div
          className="fixed left-0 top-[150px] h-[calc(100vh-80px)] z-30 bg-white overflow-auto"
          onMouseLeave={() => setIsHovered(false)}
        >
          <HoverCategorySidebar categories={categories} />
        </div>
      )}

    
      {/* Outlet -자식(ShopMain)의 위치 지정 (자식이 되는 ShopMain 컴포넌트가 사이드바와 함께 일관된 레이아웃안에서 렌더링됨)  */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default ShopLayout;