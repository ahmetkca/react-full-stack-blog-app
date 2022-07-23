import React from 'react';
import { useParams } from 'react-router-dom';

import articlesContent from './articles-data.js';

const ArticlePage = () => {
  const { articleName } = useParams();
  const article = articlesContent.find(article => article.name === articleName);

  if (!article) {
    return <div>Article not found</div>;
  }
  return (
    <div>
      <h1>{article.name}</h1>
      {article.content.map((paragraph , key) => (
        <p key={key}>{paragraph}</p>
      ))}

    </div>
  );
}

export default ArticlePage;
