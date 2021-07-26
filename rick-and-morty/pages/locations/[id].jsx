import Head from "next/head";

import client from "../../apollo-client";
import {
    GET_LOCATIONS_ID_QUERY,
    GET_LOCATION_BY_ID_QUERY,
} from "../../graphQL/queries";

export default function Location({ location }) {
    const { id, dimension, name, residents, type, url } = location;

    return (
        <div className="container">
            <Head>
                <title>Location</title> <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1 className="title"> Welcome to Rick and Morty 's world!</h1>
                <p className="description">
                    Locations available in Rick and Morty 's world
                </p>

                <h3> {name} </h3>
                <p>
                    <strong> Type: </strong> {type}
                </p>
                <p>
                    <strong> Dimension: </strong> {dimension}
                </p>
                <p>
                    <strong> Residents: </strong> {residents?.length}
                </p>
            </main>
        </div>
    );
}

export async function getStaticPaths() {
    // Get the paths we want to pre-render based on locations
    let locations = [];
    const {
        data: {
            locations: {
                info: { pages },
                results: locationsFirstPage = [],
            },
        } = {},
    } = await client.query({
        query: GET_LOCATIONS_ID_QUERY,
        variables: { page: 1 },
    });

    for (let page = 2; page <= pages; page++) {
        const {
            data: { locations: { results: locationsNextPage = [] } } = {},
        } = await client.query({
            query: GET_LOCATIONS_ID_QUERY,
            variables: { page },
        });
        locations = locations.concat(locationsNextPage);
    }

    const paths = locations.map((location) => ({
        params: { id: location.id },
    }));

    // We'll pre-render only these paths at build time.
    // {fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    const {
        data: { location },
    } = await client.query({
        query: GET_LOCATION_BY_ID_QUERY,
        variables: { id: params.id },
    });
    // Pass post data to the page via props
    return { props: { location } };
}
