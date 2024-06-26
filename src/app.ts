import express from "express"
import routers from "./routers"
import { connectToDB } from "./utils/connectToDB";
import { errorHandler } from "./middlewares/errors";

const PORT = 8080

const app = express();

app.use(express.json())
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running smoothly"
    }) 
})
app.use("/api/v1", routers)
app.use(errorHandler)

connectToDB(); 

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
});