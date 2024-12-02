//import {Carousel} from "flowbite-react";
import { useState } from 'react';
import { Carousel } from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import * as s from '../styledcomponent/shopmain.tsx'


const ProductItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = (e) => {
    
    e.stopPropagation();
    console.log(`Added ${quantity} of ${item.name} to cart`);
  };

  return (
    <s.ItemListLi>
        <s.ItemListImg>
          <img src={item.imageUrl} alt={item.name} />
          <s.HoverControls className="hover-controls">
            <s.QuantityControl>
              <s.QuantityButton onClick={handleDecrement}>-</s.QuantityButton>
              <s.QuantityDisplay>{quantity}</s.QuantityDisplay>
              <s.QuantityButton onClick={handleIncrement}>+</s.QuantityButton>
            </s.QuantityControl>

            <s.CartButton onClick={handleAddToCart}>
              <ShoppingCartIcon className="h-6 w-6" />
            </s.CartButton>
          </s.HoverControls>
        </s.ItemListImg>
        <s.ItemListA to={`/shopItemDetail/${item.itemCode}`}>
        <s.ItemListTextBox>
          <s.ItemTitle>{item.name}</s.ItemTitle>
          <s.ItemPrice>{item.price}</s.ItemPrice>
          {item.itemStorage && (
            <s.ItemStorageLabelP>
              <s.ItemStorageType storageWay={item.itemStorage}>
                {item.itemStorage}
              </s.ItemStorageType>
            </s.ItemStorageLabelP>
          )}
        </s.ItemListTextBox>
      </s.ItemListA>
    </s.ItemListLi>
  );
};

function ShopMain() {

  const renderProductSection = (title) => (
 
        <s.ShopMainContent>
          <s.ShopMainTitle>
            {title}
            <s.ShopMaintTitlePlus>+</s.ShopMaintTitlePlus>
          </s.ShopMainTitle>
          <s.ShopMainItemList>
            <s.ItemListUl>
              {items.map((item) => (
                <ProductItem key={item.itemCode} item={item} />
              ))}
            </s.ItemListUl>
          </s.ShopMainItemList>
        </s.ShopMainContent>
  );

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
  const items = [
    {
      itemCode: 1,
      name: '에티오피아 코케허니 G1스페셜티',
      imageUrl: "/image/item1.jpg",
      price: '	11,500원',
      bgColor: "#45b0da",
      storageType: "냉동"

    },
    {
      itemCode: 2,
      name: '달보드레 블랜드',
      imageUrl: "/image/item2.jpg",
      price: '8,500원'

    },
    {
      itemCode: 3,
      name: '에티오피아 예가체프 G2',
      imageUrl: "/image/item3.jpg",
      price: '22,000원',
      bgColor: "#45b0da",
      storageType: "냉동"

    },
    {
      itemCode: 4,
      name: '코스타리카 드립백',
      imageUrl: "/image/item4.jpg",
      price: '8,500원'

    },
    {
      itemCode: 5,
      name: '에티오피아 첼베사 워시드 스페셜티',
      imageUrl: "/image/item5.jpg",
      price: '13,000원'

    },
    {
      itemCode: 6,
      name: '과테말라 코반 스페셜',
      imageUrl: "/image/item1.jpg",
      price: '8,900원'

    },
  ]


  return (
    <s.ShopMainWrapper>
          <div className="h-[480px] mt-16">
      <Carousel
        className="rounded-xl"
        autoplay={true}
        autoplayDelay={4000}  // 3초마다 슬라이드 (시간은 밀리초 단위)
        loop={true}  // 마지막 슬라이드에서 처음으로 돌아가기
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
      </div>
      <s.ShopMainContainer>

      {/* 상품 목록 시작*/}

      {renderProductSection("커피자재")}
      {renderProductSection("분말가공")}
      {renderProductSection("유가공품")}
      {/* 상품 목록 끝 */}
    </s.ShopMainContainer>
    </s.ShopMainWrapper>  
  )
}
export default ShopMain;