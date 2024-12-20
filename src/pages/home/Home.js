import styles from './Home.module.css'
import Header from "../../components/header/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <h1 className={styles.text}>Página Home</h1>
    </div>
  );
}
