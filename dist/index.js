import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
const PORT = 4000;
connectDB();
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map