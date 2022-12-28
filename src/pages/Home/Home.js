import styles from './Home.module.css';

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

//Components
import PostDetail from '../../components/PostDetails';

const Home = () => {
  const [query, setQuery] = useState("");
  const {documents: posts, loading, error} = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <div className={styles.home}>
        <h1>Veja os nossos posts mais recentes!</h1>
        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input
            type="text"
            placeholder="Ou busque por tags..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className='btn btn-dark'>Pesquisar</button>
        </form>
        <div>
          { loading && <p>Carregando...</p>}
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>Não foram encontrados posts</p>
              <Link to="/posts/create" className='btn'>Criar primeiro post</Link>
            </div>
          )}
          {posts && posts.map((posts) => <PostDetail key={posts.id} post={posts} /> )}
        </div>
        {error && (
          <div className={styles.testefor}><p>{error}</p></div>
        )}

    </div>
  )
}

export default Home