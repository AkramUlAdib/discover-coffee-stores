import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/Banner';
import Card from '../components/Card';
import { fetchCoffeeStores } from '../lib/coffee-stores.js'

// import coffeeStoresData from '../data/coffee-stores.json'

export async function getStaticProps(context) {

  const coffeeStores = await fetchCoffeeStores();

    return {
      props: {
        coffeeStores,
      }
    }
}

export default function Home(props) {
  console.log('props', props);

  const handleOnBannerBtnClick = () => {
    console.log('banner button')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Banner 
        buttonText='View stores nearby'
        handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image 
          src="/static/hero-image.png"
          width={400}
          height={300}/>
        </div>

        {props.coffeeStores.length > 0 && (
        <>
          <h2 className={styles.heading2}>Toronto Coffee Stores :)</h2>
          <div className={styles.cardLayout}>
            {props.coffeeStores.map((coffeeStore) => {
              return (
                <Card
                  key={coffeeStore.fsq_id} 
                  className={styles.card}
                  name={coffeeStore.name} 
                  imgUrl={coffeeStore.imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}
                  href={`/coffee-store/${coffeeStore.fsq_id}`} />
              )
            })}
          </div>
        </>
        )}
      </main>

    </div>
  )
}
