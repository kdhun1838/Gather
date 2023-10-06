import React from "react";
import styled from "styled-components";
import Responsive from "../../styled/Responsive";

const CommunityBox = styled(Responsive)`
  /* width: 100%;
max-width: 1300px;
padding: 0px 15px;
margin: 100px auto 60px; */
  overflow: hidden;
  margin-bottom: 2rem;
`;

const PostsBox = styled.div`
  width: 1325px;
  display: flex;
  grid-gap: 27px;
  gap: 27px;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0 20px;
`;

const PostBox = styled.div`
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

  &:hover {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
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
  load: {
    [key: string]: boolean;
  };
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

const Community: React.FC<CommunityPropType> = ({
  posts,
  load,
  onClickPost,
  onClickAddFavoritePost,
}) => {
  const loading = load["community/GET_POSTS"];

  const changeLanguege = (category: string) => {
    if (category === "후기") {
      return "review";
    } else if (category === "질문") {
      return "question";
    } else if (category === "잡담") {
      return "chat";
    }
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  // 글이 없거나 검색정보가 없을 때
  if (posts.length === 0) {
    return (
      <CommunityBox>
        <PostsBox>글이 없습니다.</PostsBox>
      </CommunityBox>
    );
  }

  return (
    <CommunityBox>
      <PostsBox>
        {posts?.map((post: any) => {
          return (
            <PostBox
              key={post.communityNum}
              onClick={() => onClickPost(post.communityNum)}
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
              <div> 조회수{post.view}</div>
              <FavoriteBox
                onClick={() => onClickAddFavoritePost(post.communityNum)}
              >
                ⭐
              </FavoriteBox>
            </PostBox>
          );
        })}
      </PostsBox>
    </CommunityBox>
  );
};

export default Community;
