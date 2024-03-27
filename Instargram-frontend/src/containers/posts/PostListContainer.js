import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { useParams, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import { fetchUsers } from '../../modules/user';

const PostListContainer = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { posts, error, loading, user, searchUser } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
      searchUser: user.searchUser,
    }),
  );

  useEffect(() => {
    const tag = searchParams.get('tag');
    // page가 없으면 1을 기본값으로 사용
    const page = parseInt(searchParams.get('page'), 10) || 1;
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, searchParams, username]);

  const [keyword, setKeyword] = useState('');
  const [keyItems, setKeyItems] = useState([]);
  const onChangeData = (e) => setKeyword(e.currentTarget.value);

  useEffect(() => {
    dispatch(fetchUsers());
    const filteredUsers = () => {
      const res = searchUser.filter((user) => user.includes(keyword) === true);
      setKeyItems(res);
    };
    const debounce = setTimeout(() => {
      if (keyword) filteredUsers();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [dispatch, searchUser, keyword]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      user={user}
      SearchBar={
        <SearchBar
          value={keyword}
          onChange={onChangeData}
          keyItems={keyItems}
        />
      }
    />
  );
};

export default PostListContainer;
