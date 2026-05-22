import type { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './PostsList.css'

export default function PostsList() {


    const handleEdit = (id: number) => {
        navigate(`/posts/edit/${id}`);
    }

    const posts = useSelector((state: RootState) => state.post.posts);

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('create')}>Create post</button>
            {posts.map((post) => (
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