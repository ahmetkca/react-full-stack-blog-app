import React from "react";
import { Link } from "react-router-dom";

const ArticleLink = ({ article }) => {
    return (
        <>
            <Link to={`/articles/${article.name}`}>
                <h3>{article.title}</h3>
                <p>{article.content[0].substring(0, 150)}.......</p>
            </Link>
        </>
    )
}


const ArticlesList = ({ articles }) => {
    return (
        <ul>
      {articles.map((article, key) => (
        <li key={key + article.name}>
          <ArticleLink article={article} />
        </li>
      ))}
    </ul>
    );
}

export default ArticlesList;
