import type { AppDispatch, RootState } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '@/store/slices/post-state/postSlice';

import './PostsList.css';

export default function PostsList() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        navigate(`/posts/edit/${id}`);
    }

    const posts = useSelector((state: RootState) => state.post.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])


    return (
        <div>
            <button onClick={() => navigate('create')}>Create post</button>
            {posts.slice(0, 20).map((post) => (
                <div className="created-post" key={post.id}>
                    <p>
                        <span>Title:</span> {post.title}
                    </p>
                    <p>
                        <span>Body:</span> {post.body}
                    </p>
                    <p>
                        <span>Id:</span> {post.id}
                    </p>
                    <button className="edit-btn" onClick={() => {
                        handleEdit(post.id)
                    }}>Edit</button>
                </div>
            ))}
        </div>
    )
}