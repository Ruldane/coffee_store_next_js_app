import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { isEmpty } from "../../utils/";

import CoffeeStoresData from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import { Button } from "@mui/material";
import { fetchCoffeeStore } from "../../lib/coffee-stores";

import { StoreContext } from "../../store/store-context";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStore();

  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.fsq_id === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStore();
  const paths = coffeeStores.map((coffeestore) => {
    return {
      params: {
        id: coffeestore.fsq_id,
      },
    };
  });
  return {
    paths,
    fallback: true, // can also be true or 'blocking'.
    // Will render a 404 if the page does not exist
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const { id } = router.query;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const { fsq_id, name, imgUrl, location } = coffeeStore;

      const response = await fetch(
        "http://localhost:3000/api/createCoffeeStore",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: fsq_id,
            name,
            voting: 0,
            imgUrl,
            neighbourhood: location.neighbourhood || "",
            address: location.formatted_address || "",
          }),
        }
      );
      const dbCoffeeStore = response.json();
    } catch (err) {
      console.error({ message: "error to create a coffee: ", err });
    }
  };

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id; //dynamic id
        });
        setCoffeeStore(coffeeStoreFromContext);
        handleCreateCoffeeStore(coffeeStoreFromContext);
      }
    } else {
      // SSG
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps.coffeeStore, coffeeStores]);

  const handleUpvoteButton = () => {
    console.log("hiiii");
  };

  // will check if the param is in getStaticPaths and send a loader
  if (router.isFallback) {
    return <div>Loading</div>;
  }

  const { location, name, imgUrl } = coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back to Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>Coffee: {name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={styles.col2}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt="address"
            />
            <p className={styles.text}> {location?.formatted_address}</p>
          </div>
          {location?.neighbourhood ? (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt="address"
              />
              <p className={styles.text}>{location?.neighbourhood}</p>
            </div>
          ) : undefined}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="address"
            />
            <p className={styles.text}>1</p>
          </div>

          <Button
            color="primary"
            sx={{
              cursor: "pointer",
              outline: "0",
              border: "0px",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
              width: "50%",
            }}
            onClick={handleUpvoteButton}
            variant="contained"
          >
            Up vote!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
