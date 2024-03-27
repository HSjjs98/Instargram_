// import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const PostButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  align-items: center;
  div {
    width: 250px;
    display: flex;
    justify-content: space-between;
  }
`;

const PostItemBlock = styled.div`
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 8rem;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    display: inline-block;
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
    padding: 0.5rem;
    line-height: 1.5rem;
    word-wrap: break-word;
    width: 40%;
    height: 7rem;
    box-shadow: 0 0 2px 0.5px gray;
  }
`;

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
        hasMarginTop
      />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error, user, SearchBar }) => {
  // 에러 발생 시
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }
  const myPage = user? `/${user.username}`:null;
  return (
    <PostListBlock>
      <PostButtonWrapper>
        <div>
          <Button to="/">전체 게시물</Button>
          {user && <Button to={myPage}>나의 게시물</Button>}
        </div>
        {user && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </PostButtonWrapper>
      {SearchBar}
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;
