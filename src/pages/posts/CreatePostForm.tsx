import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { createPost, getPostById, updatePost } from '@/store/slices/post-state/postSlice';
import type { AppDispatch, RootState } from '@/store/store';

import './CreatePostForm.css';

export default function CreatePostForm() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { postId } = useParams();

  const posts = useSelector(
    (state: RootState) => state.post.posts
  );
  const currentPost = useSelector(
    (state: RootState) =>
      state.post.posts.find(
        (post) => post.id === Number(postId)
      )
  );

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (!postId) return;

    const loadPost = async () => {

      const localPost = posts.find(
        (post) => post.id === Number(postId)
      );

      if (localPost?.isCustom) {
        setTitle(localPost.title);
        setBody(localPost.body);
        return;
      }

      try {
        const result = await dispatch(
          getPostById(postId)
        ).unwrap();

        setTitle(result.title);
        setBody(result.body);
      } catch (error) {
        console.log(error);
      }
    };

    loadPost();
  }, [postId, posts, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !body) {
      return;
    }

    const postData = {
      title,
      body,
    };

    if (postId) {
      dispatch(
        updatePost({
          id: Number(postId),
          isCustom: currentPost?.isCustom,
          ...postData,
        })
      );
    } else {
      await dispatch(createPost(postData));
    }
    navigate('/posts');
  };

  return (

    <div>
      <h1 className='app-title'>Create post</h1>
      <form className="post-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </label>
        <label>
          Body:
          <input
            type="text"
            value={body}
            onChange={(e) =>
              setBody(e.target.value)
            }
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}