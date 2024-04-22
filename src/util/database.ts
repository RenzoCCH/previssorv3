import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://ren:atlante@cluster0.zdqc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connect = async (cb: (_: MongoClient) => void) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("connected successfully");
    cb(client);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};

export default connect;
