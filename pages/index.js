import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MainHome from '../components/home/MainHome'
import Notification from './admin/notification'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Khatoco</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Notification />
      </div>

      
    </div>
  )
}
