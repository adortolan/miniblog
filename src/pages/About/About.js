import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
        <h2>Sobre o Mni <span>Blog</span></h2>
        <p>Este projeto consiste em um blog React Front-end e firebase backend</p>
        <Link to="/posts/create" className="btn">Criar posts</Link>
    </div>
  )
}

export default About