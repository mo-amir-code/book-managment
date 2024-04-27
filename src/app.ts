import express from "express"
import routers from "./routers"
import { connectToDB } from "./utils/connectToDB";
import { errorHandler } from "./middlewares/errors";
import morgan from "morgan"

const PORT = 8080

const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use("/api/v1", routers)
app.use(errorHandler)


app.listen(PORT, async () => {
    await connectToDB(); 
    console.log(`Server started at port ${PORT}`)
})