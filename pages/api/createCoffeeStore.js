import { table, getMinifiedRecords } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  try {
    // find a record
    if (req.method === "POST") {
      const { id, name, neightbourhood, address, voting, imgUrl } = req.body;

      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();
        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(records);
        } else {
          if (name) {
            // create a record
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neightbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "Id or Name is missing " });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing " });
      }
    }
  } catch (e) {
    console.error("Error  created or finding a coffee! ", e);
    console.log("Error  created or finding a coffee! ", e);
    res.status(500);
    res.json({ message: "Error  created or finding a coffee!... ", e });
  }
};

export default createCoffeeStore;
