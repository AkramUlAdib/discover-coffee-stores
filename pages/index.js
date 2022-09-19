import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/Banner';
import Card from '../components/Card';
import { fetchCoffeeStores } from '../lib/coffee-stores.js'
import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState } from 'react';


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
  // console.log('props', props);  

  const { handleTrackLocation, latLng, locationErrorMsg, isFindingLocation } = useTrackLocation();
  // console.log({ latLng, locationErrorMsg })

  const [coffeeStores, setCoffeeStores] = useState('')
  const [coffeeStoresError, setCoffeeStoresError] = useState(null)

  const myFunction = async () => {
    // run asynchronous tasks here
    if(latLng) {
      try {
        const fetchedCoffeeStores = await fetchCoffeeStores(latLng, 12);
        // console.log({ fetchedCoffeeStores })
        setCoffeeStores(fetchedCoffeeStores);
        // set coffee stores
      } catch(error) {
        // set error
        // console.log({ error })
        setCoffeeStoresError(error.message);
      }
    }
  };

  useEffect(() => { 
    myFunction();
  }, [latLng]);



  const handleOnBannerBtnClick = () => {
    // console.log('banner button')
    handleTrackLocation();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Banner 
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
        handleOnClick={handleOnBannerBtnClick}
        />
        { locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        { coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image 
          src="/static/hero-image.png"
          width={400}
          height={300}/>
        </div>

        {coffeeStores.length > 0 && (
        <div className={styles.sectionWrapper}>
          <h2 className={styles.heading2}>Stores near me... :)</h2>
          <div className={styles.cardLayout}>
            {coffeeStores.map((coffeeStore) => {
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
        </div>
        )}

        {props.coffeeStores.length > 0 && (
        <div className={styles.sectionWrapper}>
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
        </div>
        )}
      </main>

    </div>
  )
}
