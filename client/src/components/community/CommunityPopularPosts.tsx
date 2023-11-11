import styled from "styled-components";
import Responsive from "../../styled/Responsive";
import { ButtonBlock } from "../home/HomePopularList";
import Button from "../../styled/Button";
import { useNavigate } from "react-router-dom";

const PopularBox = styled(Responsive)`
  /* width: 100%;
  max-width: 1300px;
  padding: 0px 15px;
  margin: 100px auto 60px; */
  overflow: hidden;
  margin-bottom: 2rem;
`;

export const TitleBox = styled.div`
  display: flex;
  margin: 2rem 0 2rem 0;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  color: rgb(0, 0, 0);
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.78px;
  /* margin: 0px 0px 24px; */
`;

const PageButtonBox = styled.div`
  display: flex;
  gap: 6px;
`;

const PageButton = styled.div`
  display: block;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const PopularPostsBlock = styled.div`
  position: relative;
  display: block;
`;

const PopularPostsBox = styled.div`
  width: 3180px;
  opacity: 1;
  transform: translate3d(0px, 0px, 0px);
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  margin-left: 0px;
`;

export const Post = styled.div`
  outline: none;
  width: 318px;
  margin: 0px 12px;
  align-self: stretch;
  height: unset;
  display: flex !important;
  color: black;
  padding: 20px 25px;
  border-radius: 20px;
  border: 2px solid rgb(209, 209, 209);
  background: rgb(255, 255, 255);
`;

type PopularPostPorpsType = {
  popularPosts: string[];
};

const CommunityPopularPosts: React.FC<PopularPostPorpsType> = ({
  popularPosts,
}) => {
  const navigate = useNavigate();
  const goWrite = () => {
    navigate("/community/write");
  };
  return (
    <>
      <PopularBox>
        <TitleBox>
          <Title>🔥 이번주 인기글</Title>
          <ButtonBlock>
            <Button onClick={() => goWrite()}>글쓰기</Button>
          </ButtonBlock>
        </TitleBox>
        <PageButtonBox>
          <PageButton />
          <PageButton />
        </PageButtonBox>
        <PopularPostsBlock>
          <PopularPostsBox>
            {popularPosts &&
              popularPosts?.map((post: any, index) => (
                <Post key={index}>
                  <div>{post.title}</div>
                  <div>{post.view}</div>
                </Post>
              ))}
          </PopularPostsBox>
        </PopularPostsBlock>
      </PopularBox>
    </>
  );
};

export default CommunityPopularPosts;
