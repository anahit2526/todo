import React, { useState } from 'react';
import { createPosts, setBody, setTitle } from '@/store/slices/post-state/postSlice';
import type { AppDispatch, RootState } from '@/store/store';

import { useDispatch, useSelector } from 'react-redux';

import './CreatePostForm.css'
export default function CreatePostForm() {

  const dispatch = useDispatch<AppDispatch>();

  const title = useSelector((state: RootState) => state.post.post.title);
  const body = useSelector((state: RootState) => state.post.post.body);
  const [createdPost, setCreatedPost] = useState<{
    title: string;
    body: string;
  } | null>({
    title: '',
    body: ''
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    dispatch(
      createPosts({
        post: {
          title,
          body
        }
      })
    );
    setCreatedPost({
      title,
      body
    })
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
        {createdPost && (
          <div className="created-post">
            <p>
              <span>Title:</span> {createdPost.title}
            </p>

            <p>
              <span>Body:</span> {createdPost.body}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}



