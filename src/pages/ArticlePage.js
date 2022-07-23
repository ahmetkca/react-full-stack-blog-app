import React from 'react';
import { useParams } from 'react-router-dom';
import ArticlesList from '../components/ArticlesList.jsx';

import NotFoundPage from './NotFoundPage.jsx';

import articlesContent from './articles-data.js';

const ArticlePage = () => {
  const { articleName } = useParams();
  const article = articlesContent.find(article => article.name === articleName);

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <div>
      <h1>{article.name}</h1>
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <h3>Similar Articles</h3>
      <ArticlesList articles={articlesContent.filter(article => article.name !== articleName)} />
    </div>
  );
}

export default ArticlePage;
