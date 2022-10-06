import { createApi } from "unsplash-js";

// unpslash API
// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

// fourSquare API
const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?ll=${latLong}&radius=10000&limit=30&query=${query}&limit=${limit}`;
};

const getListOfCoffeStoresPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee store",
    perPage: 30,
    //color: "black_and_white",
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStore = async (latLong = "48.57,7.75") => {
  const photos = await getListOfCoffeStoresPhotos();
  let response = await fetch(getUrlForCoffeeStores(latLong, "coffee", 6), {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: process.env.NEXT_PUBLIC_API_KEY_FOURSQUARE,
    },
  });

  let result = await response.json();

  return result.results.map((coffee, i) => {
    return {
      ...coffee,
      imgUrl: photos[i],
    };
  });
};
