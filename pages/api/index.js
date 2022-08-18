import nextConnect from "next-connect";

const handler = nextConnect().get((req, res) => {
  res.send("Hello World");
});

export default handler;
