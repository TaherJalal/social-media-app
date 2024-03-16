import express, {type Express} from 'express'
import authRoutes from "./routes/AuthRoutes.ts";
import relationshipRoutes from "./routes/RelationshipRoutes.ts";

const app : Express = express()

app.use(express.json())
app.use(authRoutes)
app.use(relationshipRoutes)

app.listen(3000, () => console.log("server working on port 3000"))