import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const {documents: posts, loading} = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">Criar o primeiro post</Link>
          </div>
        ) : (
          <>
            <div className={styles.post_header}>
              <span>Títulos</span>
              <span>Ações</span>
            </div>

            {posts && posts.map((post) => <div className={styles.post_row} key={post.id}>
              <p>{post.title}</p>
              <div className={styles.actions}>
                <Link to={`/post/${post.id}`} className="btn btn-outline">Ver</Link>
                <Link to={`/editpost/${post.id}`} className="btn btn-outline">Editar</Link>
                <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Excluir</button>
              </div>
            </div>)}
          </>
        )}

    </div>
  )
}

export default Dashboard