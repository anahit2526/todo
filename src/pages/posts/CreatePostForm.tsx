import React from 'react';
import { createPosts, setBody, setTitle } from '@/store/slices/post-state/postSlice';
import type { AppDispatch, RootState } from '@/store/store';

import { useDispatch, useSelector } from 'react-redux';

import './CreatePostForm.css'

export default function CreatePostForm() {

  const dispatch = useDispatch<AppDispatch>();

  const title = useSelector((state: RootState) => state.post.title);
  const body = useSelector((state: RootState) => state.post.body);
  const posts = useSelector((state: RootState) => state.post.posts);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title || !body) {
      return;
    }
    dispatch(
      createPosts({
        title,
        body
      })
    );
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
              dispatch(setTitle(e.target.value))
            } />
        </label>
        <label>
          Body:
          <input
            type="text"
            value={body}
            onChange={(e) =>
              dispatch(setBody(e.target.value))
            } />
        </label>
        <button type="submit">Create</button>
      </form>
      {posts.map((post, i) => (
        <div className="created-post" key={i}>
          <p>
            <span>Title:</span> {post.title}
          </p>
          <p>
            <span>Body:</span> {post.body}
          </p>
        </div>
      ))}
    </div>
  )
}