import { useState } from 'react';
import { Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';

const HoverCategorySidebar = ({categories}) => {
  
  //App.js->ShopLayout 에서 받아오는 데이터 활용 (categories=majorCategory:{},middleCategory:{},subCategory:{})
  const [openCategories, setOpenCategories] = useState({
    major: '',
    middle: '',
    sub: ''
  });
  const navigate = useNavigate();


  // 대분류에 속하는 중분류 가져오기(중분류가 가진 majorNum과 대분류num비교 )
  const getMiddleCategories = (majorNum) => {
    return categories.middle.filter(
      category => category.itemCategoryMajorNum === majorNum
    );
  };

  // 중분류에 속하는 소분류 가져오기
  const getSubCategories = (middleNum) => {
    return categories.sub.filter(
      category => category.itemCategoryMiddleNum === middleNum
    );
  };


  // 마우스 호버로 목록 열기
  const handleMouseEnter = (level, category) => {
    setOpenCategories(prev => ({
      ...prev,
      [level]: category.itemCategoryNum
    }));
  };
  // 초기화 목록 닫기 
  const handleMouseLeave = () => {
    setOpenCategories({
      major: '',
      middle: '',
      sub: ''
    });
  };

  // 클릭 시 해당 카테고리 목록으로 이동 
  const handleCategoryClick = (level, category) => {
    
      if (level === 'major') {
        // 대분류 선택시 이동
        navigate(`/categoryItemList?majorNum=${category.itemCategoryNum}`);
        
      } else if (level === 'middle') {
        // 중분류 선택시 이동
        navigate(`/categoryItemList?middleNum=${category.itemCategoryNum}`);
        
      } else if (level === 'sub') {
         // 소분류 선택시 이동
        navigate(`/categoryItemList?subNum=${category.itemCategoryNum}`);
      }

    };


  return (
    <div className="bg-white shadow-xl">
    <div className="h-full flex flex-col">
      <div className="flex items-center p-4 border-b">
        <Typography variant="h5" color="blue-gray">카테고리</Typography>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <List>
          {categories.major.map((majorCategory) => (
            <div
              key={majorCategory.itemCategoryNum}
              onMouseEnter={() => handleMouseEnter('major', majorCategory)}
              onMouseLeave={handleMouseLeave}
            >
              <Accordion open={openCategories.major === majorCategory.itemCategoryNum}>
                <ListItem 
                  className="p-0"
                  onClick={() => handleCategoryClick('major', majorCategory)}
                >
                  <AccordionHeader className="border-b-0 p-3">
                    <ListItemPrefix>
                      {openCategories.major === majorCategory.itemCategoryNum ? 
                        <ChevronDownIcon className="h-4 w-4" /> : 
                        <ChevronRightIcon className="h-4 w-4" />
                      }
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      {majorCategory.itemCategoryName}
                    </Typography>
                  </AccordionHeader>
                </ListItem>

                <AccordionBody className="py-1">
                  {getMiddleCategories(majorCategory.itemCategoryNum).map((middleCategory) => (
                    <div
                      key={middleCategory.itemCategoryNum}
                      onMouseEnter={() => handleMouseEnter('middle', middleCategory)}
                    >
                      <Accordion open={openCategories.middle === middleCategory.itemCategoryNum}>
                        <ListItem 
                          className="p-0 pl-4"
                          onClick={() => handleCategoryClick('middle', middleCategory)}
                        >
                          <AccordionHeader className="border-b-0 p-3">
                            <ListItemPrefix>
                              {openCategories.middle === middleCategory.itemCategoryNum ? 
                                <ChevronDownIcon className="h-3 w-3" /> : 
                                <ChevronRightIcon className="h-3 w-3" />
                              }
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="font-normal text-sm">
                              {middleCategory.itemCategoryName}
                            </Typography>
                          </AccordionHeader>
                        </ListItem>

                        <AccordionBody className="py-1">
                          {getSubCategories(middleCategory.itemCategoryNum).map((subCategory) => (
                            <ListItem
                              key={subCategory.itemCategoryNum}
                              className="pl-8"
                              onClick={() => handleCategoryClick('sub', subCategory)}
                            >
                              <Typography color="blue-gray" className="font-normal text-sm">
                                {subCategory.itemCategoryName}
                              </Typography>
                            </ListItem>
                          ))}
                        </AccordionBody>
                      </Accordion>
                    </div>
                  ))}
                </AccordionBody>
              </Accordion>
            </div>
          ))}
        </List>
      </div>
    </div>
  </div>
);
};

export default HoverCategorySidebar;