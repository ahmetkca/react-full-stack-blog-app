import React from 'react';

import articlesContent from './articles-data.js';

import ArticlesList from '../components/ArticlesList';

const ArticlesListPage = () => (
  <>
    <h1>Articles</h1>
    <ArticlesList articles={articlesContent} />
  </>
);

export default ArticlesListPage;
