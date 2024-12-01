import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { useAtomValue } from "jotai/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tokenAtom } from "../../atoms";
import { axiosInToken } from "../../config.js";
import { CustomHorizontal } from "../styledcomponent/Horizin.style.js";
import * as s from "../styles/StyledStore.tsx";
import { ContentListDiv } from "../styles/StyledStore.tsx";

// 공지사항 리스트(가맹점)
const NoticeList = () => {
  const [notice, setNotice] = useState([]);
  const token = useAtomValue(tokenAtom);
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item
  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수 정의
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색 버튼 클릭 여부
  const [searchNotice, setSearchNotice] = useState("");

  // 공지사항 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = () => {
      axiosInToken(token)
        .get("noticeList")
        .then(res => {
          console.log(res.data);
          setNotice([...res.data]);
        })
        .catch(err => {
          console.log(err);
        });
    };
    if (token != null && token !== "") fetchData();
    fetchData();
  }, [token]);

  const handleItemClick = noticeNum => {
    setSelectedItem(selectedItem === noticeNum ? null : noticeNum); // Toggle answer form visibility
    navigate(`/noticeDetail/${noticeNum}`);
  };

  // 검색 버튼 클릭 핸들러
  const onSearchClick = () => {
    setIsSearchActive(true);
  };

  const onChangeNotice = e => {
    setSearchNotice(e.target.value);
  };

  const filterNotice = notice.filter(n =>
    n.noticeTitle.toLowerCase().includes(searchNotice.toLowerCase())
  );

  return (
    <ContentListDiv>
      <HeadingContainer>
        <Heading>공지사항</Heading>
        <Navigation>
          <span>홈 / 커뮤니티</span>
          <span> / </span>
          <BoldText>공지사항</BoldText>
        </Navigation>
      </HeadingContainer>

      <HeadingContainer1>
        <s.ButtonDiv width="200px" float="right">
          <s.SearchDiv width="200px">
            <Input
              name="search"
              label="제목 검색"
              value={searchNotice}
              onChange={onChangeNotice}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  onSearchClick(); // Enter 키를 누르면 onSearchClick 실행
                }
              }}
            />
            <MagnifyingGlassIcon
              onClick={onSearchClick} // 검색 버튼으로 사용
              className="h-5 w-5"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#333",
              }}
            />
          </s.SearchDiv>
        </s.ButtonDiv>
      </HeadingContainer1>
      <CustomHorizontal width="basic" bg="black" />
      <TableHeader>
        <div>번호</div>
        <div>제목</div>
        <div>작성일</div>
      </TableHeader>
      <CustomHorizontal width="basic" bg="black" />

      {/* 조건부 렌더링 */}
      <div>
        {(isSearchActive ? filterNotice : notice).length > 0 ? (
          (isSearchActive ? filterNotice : notice).map(n => (
            <TableInfoList onClick={() => handleItemClick(n.noticeNum)} key={n.noticeNum}>
              <div>{n.noticeNum}</div>
              <div style={{ paddingLeft: "20px" }}>{n.noticeTitle}</div>
              <div style={{ paddingRight: "20px" }}>
                {new Date(n.noticeDate).toLocaleDateString()}
              </div>
            </TableInfoList>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
              paddingRight: "40px",
              fontSize: "15px",
              color: "grey",
            }}
          >
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      <CustomHorizontal width="basic" bg="grey" />
    </ContentListDiv>
  );
};

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const HeadingContainer1 = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  // margin-bottom: 15px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;

const Navigation = styled.div`
  font-size: 10px;
  position: absolute;
  right: 0;
`;

const PeriodButton = styled.button`
  display: flex;
  // flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;

  width: 120px;
  height: 40px;
  padding: 8px 16px;
  background-color: ${props => (props.isSelected ? "lightblue" : "white")};
  font-size: 16px;
  border: ${props => (props.isSelected ? "2px solid grey" : "1px solid #ddd")};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.isSelected ? "lightblue" : "#f0f0f0")};
  }
`;

const SearchContainer = styled.div`
  // width: 800px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
  // margin-left: 200px;
`;

const SearchTitle = styled.div`
  width: 50px;
  font-weight: bold;
  font-size: 16px;
`;

const SearchInput = styled.input`
  padding: 6px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 8px;
  display: flex;
  align-items: center;

  font-size: 16px;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  font-weight: bold;

  & > div:first-child {
    margin-left: 30px;
  }

  & > div:last-child {
    margin-right: 80px;
  }
`;

const TableInfoList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;

  // margin-top: 5px;
  margin-bottom: 5px;

  cursor: pointer;

  & > div {
    onClick =>() = > {
      color: red;
    }
  }

  & > div:first-child {
    margin-left: 37px;
  }

  & > div:last-child {
    margin-right: 37px;
  }
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;

  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const NoticeContent = styled.textarea`
  min-height: 150px;

  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export default NoticeList;
