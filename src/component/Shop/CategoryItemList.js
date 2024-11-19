import { useState } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { CommonWrapper, CommonContainer } from "../styledcomponent/common.tsx";
import FixedCategorySidebar from './FixedCategorySideBar.js';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product, index) => (
        <Card key={index} className="max-w-sm overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <Typography variant="h6" color="blue-gray">
              {product.name}
            </Typography>
            <Typography color="blue-gray" className="mt-2">
              {product.price.toLocaleString()}원
            </Typography>
          </div>
        </Card>
      ))}
    </div>
  );
};

const CategoryItemList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const products = [
    {
      name: "한가위 리미티드 스페셜 세트",
      price: 25900,
      image: "/api/placeholder/400/320",
      category: "콜롬비아"
    },
    {
      name: "탄자니아 AA",
      price: 8000,
      image: "/api/placeholder/400/320",
      category: "아프리카"
    },
    {
      name: "에티오피아 예가체프",
      price: 12000,
      image: "/api/placeholder/400/320",
      category: "에티오피아"
    },
    {
      name: "과테말라 안티구아",
      price: 11000,
      image: "/api/placeholder/400/320",
      category: "과테말라"
    }
  ];

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <CommonWrapper>
      <CommonContainer size='100%'>
        <div className="flex min-h-screen mt-16">
          {/* 왼쪽 고정 사이드바 */}
          <div className="w-72 bg-white shadow-xl min-h-screen">
            <FixedCategorySidebar onCategorySelect={setSelectedCategory} />
          </div>
          
          {/* 오른쪽 메인 컨텐츠 */}
          <div className="flex-1 pl-8">
            <div className="px-4 mb-4">
              <Typography variant="h4" color="blue-gray">
                {selectedCategory || '전체 상품'}
              </Typography>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </CommonContainer>
    </CommonWrapper>
  );
};

export default CategoryItemList;