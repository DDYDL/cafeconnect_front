import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import HoverCategorySidebar from './HoverCategorySidebar.js';

const ShopLayout = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <>

    <div className="min-h-screen">

      <div 
        className="fixed left-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className="bg-blue-gray-50 p-2 rounded-r-lg">
          <ChevronRightIcon className="h-6 w-6" />
        </div>
      </div>
        {/* ShopMain에서 호버된 카테고리 */}
        {isHovered && (
        <div
          className="fixed left-0 top-20 h-[calc(100vh-80px)] z-30 bg-white rounded-r-lg shadow-xl p-4"
          onMouseLeave={() => setIsHovered(false)}
        >
          <HoverCategorySidebar />
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