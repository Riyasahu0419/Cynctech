const express=require("express")
const connectDb = require("./config/db")
const authRoutes = require("./routes/authRoute");
const cartRoutes = require("./routes/cartRoute");
const productRoutes = require("./routes/productRoute");
const app = express()
const cors=require("cors")
app.use(express.json());


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from Origin: ${req.headers.origin}`);
    next();
  });
app.use(cors({
    origin: (origin, callback) => {
      console.log('Request from origin:', origin); 
      const allowedOrigins = [
        "http://localhost:5173", 
        "https://cynctech.vercel.app", 
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Origin ${origin} not allowed by CORS`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization" , "session-id"],
    credentials: true, 
  }));
  



  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/cart", cartRoutes);
 

const PORT=process.env.PORT || 8080
app.listen(PORT,async()=>{
    try {
        await connectDb()
        console.log("serever running on port ",PORT)
    } catch (error) {
        console.log("server not connected", error)
    }
})