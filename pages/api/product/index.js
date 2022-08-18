import multer from "multer";
import nextConnect from "next-connect";
import { prisma } from "../../../db";
import data from "../../../utils/data";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const config = {
  api: {
    bodyParser: false,
  },
};
const upload = multer({ storage: storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
// const authGuard = (req, res, next) => {
//   //jwt check
//   const payload = await jwt.verift(token, secret)
// const user = prisma.user.findOne({where:{id: payload.id} })
// if(!user){
//     res.send('error')
// }
//     req.user = user;
//   next();
// };
apiRoute.use(upload.array("images"));
apiRoute
  .get(async (req, res) => {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  })
  //   .use(authGuard)
  .post(async (req, res) => {
    try {
      const product = await prisma.product.create({
        data: {
          name: req.body.name,
          price: req.body.price,
          countInStock: req.body.countInStock,
          images: req.files.map((file) => file.filename),
          description: req.body.description,
        },
      });
      res.status(200).send("Done");
    } catch (e) {
      console.log(e);
    }
  });

export default apiRoute;
