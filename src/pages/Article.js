import React from 'react';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
  const { articleName } = useParams();
  return (
    <div>
      <h1>Article page component! (WIP)</h1>
      <p>This is the <b>{articleName} </b> article</p>
    </div>
  );
}

export default ArticlePage;
