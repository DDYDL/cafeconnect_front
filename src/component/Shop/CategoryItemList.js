import { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  IconButton,
} from "@material-tailwind/react";
import { ChevronDownIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  CommonWrapper,
  CommonContainer,
  ContainerTitleArea,
} from "../styledcomponent/common.tsx";

const CategorySidebar = ({ isOpen, onClose, onCategorySelect }) => {
  const [openCategories, setOpenCategories] = useState({
    main: null,
    sub: null,
    detail: null
  });

  const categories = {
    카피자재: {
      원두: {
        아라비카: ['콜롬비아', '에티오피아', '과테말라'],
        디카페인: ['브라질', '콜롬비아'],
        기타: ['블렌드', '스페셜티']
      },
      생두: {
        골드브루: ['아라비카', '로부스타'],
        일반생두: ['아프리카', '중남미', '아시아']
      }
    },
    시럽: {
      시럽: {
        과일시럽: ['딸기', '복숭아', '자몽'],
        클래식시럽: ['바닐라', '캐러멜', '헤이즐넛']
      },
    },
    엑세류: {
      엑세류: {
        필터: ['종이필터', '천필터'],
        도구: ['핸드드립', '템퍼']
      }
    },
    건조식품: {
      건조식품: {
        과일: ['건조딸기', '건조망고'],
        견과류: ['아몬드', '캐슈넛']
      }
    }
  };

  const handleCategoryClick = (level, category) => {
    setOpenCategories(prev => {
      const newState = { ...prev };
      
      if (level === 'main') {
        newState.main = prev.main === category ? null : category;
        newState.sub = null;
        newState.detail = null;
      } else if (level === 'sub') {
        newState.sub = prev.sub === category ? null : category;
        newState.detail = null;
      } else if (level === 'detail') {
        newState.detail = prev.detail === category ? null : category;
      }
      
      return newState;
    });

    if (level === 'detail') {
      onCategorySelect(category);
    }
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-full flex flex-col shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <Typography variant="h5" color="blue-gray">
            카테고리
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={onClose}
          >
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <List>
            {Object.entries(categories).map(([mainCategory, subCategories]) => (
              <Accordion
                key={mainCategory}
                open={openCategories.main === mainCategory}
                className="border-b"
              >
                <ListItem className="p-0">
                  <AccordionHeader
                    onClick={() => handleCategoryClick('main', mainCategory)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      {openCategories.main === mainCategory ? 
                        <ChevronDownIcon className="h-4 w-4" /> : 
                        <ChevronRightIcon className="h-4 w-4" />
                      }
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      {mainCategory}
                    </Typography>
                  </AccordionHeader>
                </ListItem>

                <AccordionBody className="py-1">
                  {Object.entries(subCategories).map(([subCategory, detailCategories]) => (
                    <Accordion
                      key={subCategory}
                      open={openCategories.sub === subCategory}
                    >
                      <ListItem className="p-0 pl-4">
                        <AccordionHeader
                          onClick={() => handleCategoryClick('sub', subCategory)}
                          className="border-b-0 p-3"
                        >
                          <ListItemPrefix>
                            {openCategories.sub === subCategory ? 
                              <ChevronDownIcon className="h-3 w-3" /> : 
                              <ChevronRightIcon className="h-3 w-3" />
                            }
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-normal text-sm">
                            {subCategory}
                          </Typography>
                        </AccordionHeader>
                      </ListItem>

                      <AccordionBody className="py-1">
                        {Object.entries(detailCategories).map(([detailCategory, items]) => (
                          <ListItem
                            key={detailCategory}
                            className="pl-8"
                            onClick={() => handleCategoryClick('detail', detailCategory)}
                            selected={openCategories.detail === detailCategory}
                          >
                            <Typography color="blue-gray" className="font-normal text-sm">
                              {detailCategory}
                            </Typography>
                          </ListItem>
                        ))}
                      </AccordionBody>
                    </Accordion>
                  ))}
                </AccordionBody>
              </Accordion>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      <CommonContainer>
        <div className="min-h-screen">
          {/* Hamburger Button */}
          <div className="fixed top-4 left-4 z-50">
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </IconButton>
          </div>

          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <CategorySidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onCategorySelect={(category) => {
              setSelectedCategory(category);
              setIsSidebarOpen(false);
            }}
          />

          {/* Main Content */}
          <main className="flex-1 pt-16">
            <div className="px-4 mb-4">
              <Typography variant="h4" color="blue-gray">
                {selectedCategory || '전체 상품'}
              </Typography>
            </div>
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </CommonContainer>
    </CommonWrapper>
  );
};

export default CategoryItemList;