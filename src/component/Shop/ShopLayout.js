import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import HoverCategorySidebar from './HoverCategorySidebar.js';

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
        {/* ShopMain에서 호버된 카테고리 */}
        {isHovered && (
        <div
          className="fixed left-0 top-[150px] h-[calc(100vh-80px)] z-30 bg-white overflow-auto"
          onMouseLeave={() => setIsHovered(false)}
        >
          <HoverCategorySidebar categories={categories} />
        </div>
      )}

    
      {/* 중첩라우팅 설정 - shopMain에 자식 라우트의 컴포넌트 렌더링 위치 지정  */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default ShopLayout;