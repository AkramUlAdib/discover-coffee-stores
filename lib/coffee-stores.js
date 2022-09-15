const getUrlForCoffeeStores = (latlng, query, version, limit) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latlng}&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&query=${query}&v=${version}&limit=${limit}`
}

export const fetchCoffeeStores = async () => {
    const options = {method: 'GET', headers: {Accept: 'application/json', Authorization:`${process.env.FOURSQUARE_API_KEY}`, UserAgent:'ReadMe-API-Explorer' }};

    const response = await fetch(
        getUrlForCoffeeStores(
        "43.65267326999575,-79.39545615725015",
        "coffee%20stores",
        "20220916",
        7 ),
        options)


  // https://console.cloud.google.com/search?ll=43.65267326999575,-79.39545615725015&query=coffee stores&client_id=214755918546-lcmulg5jrv2rubv1qhm0u2era7g56hdk.apps.googleusercontent.com&client_secret=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
  // https://api.foursquare.com/v2/venues/search?ll=43.65267326999575,-79.39545615725015&query=coffee stores&client_id=BRAY5ALNMO1U0M21XRZMP4O0V3MIUKBQVAKM1JMXBGCBRSTA&client_secret=OQTODYCOEAE3DIM0SEDQISBPYURXC3XS4XMIF04LCUOOYSIF&v=20220911

    const data = await response.json();
    console.log(data)

    return data.results;
}