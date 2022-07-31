import React from 'react';

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import ArticlesList from '../components/ArticlesList';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';

import NotFoundPage from './NotFoundPage';


import articlesContent from './articles-data.js';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = () => {
  const { articleName } = useParams();

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const blogApiUrl = `/api/articles/${articleName}`;
    (async () => {
      const result = await fetch(blogApiUrl,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const body = await result.json();
      setArticleInfo(body);
    })()
  }, [articleName]);

  if (!articleInfo) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h1>{articleInfo.name}</h1>
      <UpvotesSection articleName={articleName} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
      <CommentsList comments={articleInfo.comments} />
      <AddCommentForm articleName={articleName} setArticleInfo={setArticleInfo} />
      <h3>Similar Articles</h3>
      <ArticlesList articles={articlesContent.filter(article => article.name !== articleName)} />
    </div>
  );
}

export default ArticlePage;
