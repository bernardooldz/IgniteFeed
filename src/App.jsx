import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import styles from './App.module.css';
import './global.css';

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post auth='Diogo Fernandes' content='Teste de texto' />
          <Post auth='Bernardo Diniz' content='Texto de teste' />
        </main>
      </div>
    </>
  )
}

export default App
