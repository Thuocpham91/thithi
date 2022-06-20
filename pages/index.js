import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HeaderHome from '../components/home/HeaderHome'
import Footer from '../components/footer'
import MainHome from '../components/home/MainHome'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Khatoco</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="Khatoco" />
        <meta property="og:description" content="Conng ty Khatoco" />
        <meta property="og:site_name" content="Khatoco" />
      </Head>
      <div className='main-body body-f2f2f2'>
        <HeaderHome />
        <MainHome />
        <Footer />
      </div>

      
    </div>
  )
}
