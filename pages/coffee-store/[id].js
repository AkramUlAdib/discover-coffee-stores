import { useRouter } from "next/router";
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames'; 
// import coffeeStoresData from '../../data/coffee-stores.json';
import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStores } from '../../lib/coffee-stores';

export async function getStaticProps (staticProps){ 
    try {
        const params = staticProps.params
        const coffeeStores = await fetchCoffeeStores();
        
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
            return coffeeStore.fsq_id.toString() === params.id;
    })
    
    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
        }
    }
    } catch (err) {
        console.log(err)
    }
} 
export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: { id: coffeeStore.fsq_id.toString() }
        }
    })
    return {
        paths: paths,
        fallback:true,
    }
}

const CoffeeStore = (props) => {
    const router = useRouter()

    if (router.isFallback) {
        return (
            <div><h1>Loading...</h1></div>
        )
    }

    const { address, name, neighborhood, imgUrl } = props.coffeeStore;

    const handleUpvoteButton = () => {
        console.log('handle upvote')
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href='/'><a>back to home</a></Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image 
                    src={imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}
                    width={600}
                    height={360}
                    className={styles.storeImg}
                    alt={name}>    
                    </Image>
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" width="24" height="24" />
                        <p className={styles.text}>{address}</p>
                    </div>

                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" width="24" height="24" />
                        <p className={styles.text}>{neighborhood}</p>
                    </div>
                
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="24" height="24" />
                        <p className={styles.text}>1</p>
                    </div>

                    <button 
                    className={styles.upvoteButton}
                    onClick={handleUpvoteButton}
                    >
                        Up vote!
                    </button>
                </div>
            </div>
            
            
        </div>
    )
}

export default CoffeeStore;