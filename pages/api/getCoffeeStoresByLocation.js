import { fetchCoffeeStore } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  // configure latLong
  try {
    const { latLong } = req.query;
    const fetchedCoffeeStores = await fetchCoffeeStore(latLong);
    res.json(fetchedCoffeeStores);
  } catch (err) {
    console.error("There is an error", err);
    res.status(400);
    res.json({ message: "Someting wen wrong: ", err });
  }

  //Return
};

export default getCoffeeStoresByLocation;
