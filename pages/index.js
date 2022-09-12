import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/Banner';
import Card from '../components/Card';
import coffeeStoresData from '../data/coffee-stores.json'

export async function getStaticProps(context) {
  // console.log('hi getStaticProps')
  const response = await fetch('https://console.cloud.google.com/search?ll=43.65267326999575,-79.39545615725015&query=coffee stores&client_id=214755918546-lcmulg5jrv2rubv1qhm0u2era7g56hdk.apps.googleusercontent.com&client_secret=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')
  
  // https://api.foursquare.com/v2/venues/search?ll=43.65267326999575,-79.39545615725015&query=coffee stores&client_id=BRAY5ALNMO1U0M21XRZMP4O0V3MIUKBQVAKM1JMXBGCBRSTA&client_secret=OQTODYCOEAE3DIM0SEDQISBPYURXC3XS4XMIF04LCUOOYSIF&v=20220911

  const data = await response.json();
  console.log(data)

    return {
      props: {
        coffeeStores: data
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
          <h2 className={styles.heading2}>Toronto Stores :)</h2>
          <div className={styles.cardLayout}>
            {props.coffeeStores.map((coffeeStore) => {
              return (
                <Card
                  key={coffeeStore.id} 
                  className={styles.card}
                  name={coffeeStore.name} 
                  imgUrl={coffeeStore.imgUrl}
                  href={`/coffee-store/${coffeeStore.id}`} />
              )
            })}
          </div>
        </>
        )}
      </main>

    </div>
  )
}
