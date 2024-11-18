import { useState } from 'react';
import { Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const FixedCategorySidebar = ({ onCategorySelect }) => {
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
    // ... 나머지 카테고리
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
        onCategorySelect?.(category);
      }
      return newState;
    });
  };

  return (
    <div className="h-full bg-white">
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 border-b">
          <Typography variant="h5" color="blue-gray">
            카테고리
          </Typography>
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
                        {Object.entries(detailCategories).map(([detailCategory]) => (
                          <ListItem
                            key={detailCategory}
                            className="pl-8"
                            onClick={() => handleCategoryClick('detail', detailCategory)}
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

export default FixedCategorySidebar;