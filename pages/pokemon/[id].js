import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

export async function getServerSideProps({ params }) {
  console.log(params);
  const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Details({ pokemon }) {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img className={styles.picture} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name.english} />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          {/* it's an array so we join it using ", " for per item in array */}
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// everything is getting written on the server side and going over the client, so in terms of network traffic it's great bcz
// now all of the network connection to like our backend services like our database and we don't waste the customer bandwidth
// by having to go back to requesting api

// we can conjunction / use together between csr ssr ssg

// use case for server side rendering:
// in something like e commerce app, we use it for :
// - search ( getting query)
