import React from 'react';

import { useState } from 'react';

const AddCommentForm = ({ articleName, setArticleInfo }) => {

  const [username, setUsername] = useState('');
  const [commentContent, setCommentContent] = useState('');

  const addComment = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: {
          username,
          text: commentContent
        }
      })
    });
    const body = await result.json();
    console.log(body);
    setArticleInfo(body);
    setUsername('');
    setCommentContent('');
  }

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name:
        <input type="text" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Comment:
        <textarea rows="4" cols="50" placeholder='Enter your comment' value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
      </label>
      <button type="button" onClick={() => addComment()} >Add Comment</button>
    </div>
  )
}

export default AddCommentForm;
