import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Repos = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://panto.onrender.com/repos', { withCredentials: true })
      .then((response) => setRepos(response.data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Your GitHub Repositories</h1>
      {repos.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Repos;
