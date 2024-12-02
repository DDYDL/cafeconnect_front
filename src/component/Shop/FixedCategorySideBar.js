import { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';


const FixedCategorySidebar = ({ categories }) => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState({
    major: searchParams.get('majorNum'),
    middle: searchParams.get('middleNum'),
    sub: searchParams.get('subNum')
  });

    // URL 파라미터가 변경될 때마다 선택된 카테고리 업데이트
    useEffect(() => {
      setSelectedCategories({
        major: searchParams.get('majorNum'),
        middle: searchParams.get('middleNum'),
        sub: searchParams.get('subNum')
      });
    }, [searchParams]);
  
    // 대분류에 속하는 중분류 가져오기
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

  // 클릭 시 카테고리 목록 열기/닫기 및 페이지 이동
  const handleCategoryClick = (level, category) => {
    if (level === 'major') {
      navigate(`/categoryItemList?majorNum=${category.itemCategoryNum}`);
    } else if (level === 'middle') {
      navigate(`/categoryItemList?middleNum=${category.itemCategoryNum}`);
    } else if (level === 'sub') {
      navigate(`/categoryItemList?subNum=${category.itemCategoryNum}`);
    }
  };

  return (
    <div className="bg-white border-r">
      <div className="py-4 px-3">
        <h3 className="text-lg font-bold mb-4">전체</h3>
        
        <List>
          {categories.major.map((majorCategory) => (
            <div key={majorCategory.itemCategoryNum} className="mb-2">
              {/* 대분류 */}
              <ListItem 
                className={`rounded-lg transition-colors ${
                  selectedCategories.major === String(majorCategory.itemCategoryNum)
                  ? "bg-blue-50 text-blue-500"
                  : "hover:bg-gray-100"
                }`}
                onClick={() => handleCategoryClick('major', majorCategory)}
              >
                <Typography className="font-semibold">
                  {majorCategory.itemCategoryName}
                </Typography>
              </ListItem>

              {/* 중분류 */}
              <List className="pl-4">
                {getMiddleCategories(majorCategory.itemCategoryNum).map((middleCategory) => (
                  <div key={middleCategory.itemCategoryNum}>
                    <ListItem 
                         className={`py-1 rounded-lg transition-colors ${
                          selectedCategories.middle === String(middleCategory.itemCategoryNum)
                          ? "bg-blue-50 text-blue-500"
                          : "hover:bg-gray-100"
                        }`}
                      onClick={() => handleCategoryClick('middle', middleCategory)}
                    >
                      <Typography className="text-sm">
                        {middleCategory.itemCategoryName}
                      </Typography>
                    </ListItem>

                    {/* 소분류 */}
                    <List className="pl-4">
                      {getSubCategories(middleCategory.itemCategoryNum).map((subCategory) => (
                        <ListItem
                          key={subCategory.itemCategoryNum}
                        className={`py-1 rounded-lg transition-colors ${
                            selectedCategories.sub === String(subCategory.itemCategoryNum)
                            ? "bg-blue-50 text-blue-500"
                            : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleCategoryClick('sub', subCategory)}
                        >
                          <Typography className="text-sm text-gray-600">
                            {subCategory.itemCategoryName}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                ))}
              </List>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default FixedCategorySidebar;