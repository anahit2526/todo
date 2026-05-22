import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { createPost, updatePost } from '@/store/slices/post-state/postSlice';
import type { AppDispatch, RootState } from '@/store/store';

import './CreatePostForm.css';

export default function CreatePostForm() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { postId } = useParams();

  const posts = useSelector(
    (state: RootState) => state.post.posts
  );

  const currentPost = posts.find(
    (post) => post.id === Number(postId)
  );

  const [title, setTitle] = useState(currentPost?.title || '');
  const [body, setBody] = useState(currentPost?.body || '');


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
          ...postData,
        })
      );
    } else {
      dispatch(createPost(postData));
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
            } />
        </label>
        <label>
          Body:
          <input
            type="text"
            value={body}
            onChange={(e) =>
              setBody(e.target.value)
            } />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}