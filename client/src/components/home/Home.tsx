import React from "react";
import styled from "styled-components";
import Responsive from "../../styled/Responsive";
import { Pagination } from "antd";
import { LoadingState } from "../../modules/loading";

const CommunityBox = styled(Responsive)`
  overflow: hidden;
  margin-bottom: 2rem;
  box-sizing: inherit;
`;

const PostsBox = styled.div`
  width: 1325px;
  display: flex;
  grid-gap: 27px;
  gap: 27px;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0 20px;
  justify-content: space-around; /* 중앙 정렬 */
`;

export const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 25px 0;
  width: 300px;
  height: 340px;
  background: #fff;
  border: 2px solid #d1d1d1;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in;
  margin-top: 1rem;

  &:hover {
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
  }
`;

const CategoryTagBox = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 3px;
  gap: 3px;

  div {
    border-radius: 20px;
    padding: 4px 12px;
    color: white;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.04em;

    &.review {
      background-color: #3999ff;
    }

    &.question {
      background-color: #ff5c5c;
    }

    &.chat {
      background-color: #00be00;
    }
    &.etc {
      background-color: black;
    }
  }
`;

const DateBox = styled.div`
  display: flex;
  font-size: 14px;
  grid-gap: 8px;
  gap: 8px;
  color: #999;
  font-weight: bold;
  margin-top: 20px;
`;

const TitleBox = styled.h1`
  font-size: 17px;
  min-height: 50px;
  line-height: 28px;
  font-weight: 500;
  letter-spacing: -0.05em;
  margin: 7px 0 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
  overflow: hidden;
`;

const FavoriteBox = styled.div`
  display: block;
  width: 28px;
  height: 28px;
  position: absolute;
  top: 40px;
  right: 20px;
  font-size: 20px;
`;

type CommunityPropType = {
  posts: string[];
  load: boolean;
  onClickPost: (postid: number) => void;
  onClickAddFavoritePost: (postId: number) => void;
};

export const changeDate = (date: number) => {
  const newDate = new Date(date);
  const showDate = `${newDate.getFullYear()}.${
    newDate.getMonth() + 1
  }.${newDate.getDate()}`;
  return showDate;
};

const Home: React.FC<CommunityPropType> = ({
  posts,
  load,
  onClickPost,
  onClickAddFavoritePost,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1); // 현재 페이지 상태 추가

  const changeLanguege = (category: string) => {
    if (category === "운동") {
      return "review";
    } else if (category === "스터디") {
      return "question";
    } else if (category === "게임") {
      return "chat";
    } else {
      return "etc";
    }
  };

  const handlePageChange = (page: number) => {
    // 페이지 변경 이벤트 처리
    setCurrentPage(page);
  };

  if (posts?.length === 0) {
    return (
      <CommunityBox>
        <PostsBox>글이 없습니다.</PostsBox>
      </CommunityBox>
    );
  }

  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts && posts.slice(startIndex, endIndex);

  return (
    <>
      {load ? (
        <div>로딩</div>
      ) : (
        <CommunityBox>
          <PostsBox>
            {currentPosts &&
              currentPosts.map((post: any) => {
                return (
                  <PostBox
                    key={post.registerNum}
                    onClick={() => onClickPost(post.registerNum)}
                  >
                    <CategoryTagBox>
                      <div className={changeLanguege(post.category)}>
                        {post.category}
                      </div>
                    </CategoryTagBox>
                    <DateBox>
                      <p>작성일 |</p>
                      <p>{changeDate(post.createdAt)}</p>
                    </DateBox>
                    <TitleBox>{post.title}</TitleBox>
                    <div>👀 조회수{post.view}</div>
                    <DateBox>
                      <p>마감일 |</p>
                      <p>{changeDate(post.period)}</p>
                    </DateBox>
                    <FavoriteBox
                      onClick={() => onClickAddFavoritePost(post.registerNum)}
                    >
                      ⭐
                    </FavoriteBox>
                  </PostBox>
                );
              })}
          </PostsBox>
          <Center>
            <Pagination
              defaultCurrent={1}
              total={posts && posts.length}
              pageSize={itemsPerPage}
              current={currentPage}
              onChange={handlePageChange}
            />
          </Center>
        </CommunityBox>
      )}
    </>
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export default Home;
