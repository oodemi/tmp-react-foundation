import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Home.css';

type Threads = {
  id: number;
  title: string;
}

export default function Home() {
  const [threads, setThreads] = useState<Threads[]>([]);

  useEffect(() => {
    fetch("https://railway.bulletinboard.techtrain.dev/threads?offset=60")
      .then(res => res.json())
      .then(data => setThreads(data))
      .catch(error => {
        console.log("スレッドのデータを取得できません", error)
      })
  }, []);

  return (
    <>
      <Header>
        <Link to="/threads/new" className='threadCreateLink' >スレッドをたてる</Link>
      </Header >
      <section className='threadsContainer'>
        <h1 className='pageTitle'>New Threads</h1>
        <ul className='threadsList'>
          {threads.map(thread => (
            <li className='threadsListItem' key={thread.id}>{thread.title}</li>
          ))}
        </ul>
      </section>
    </>
  )
}