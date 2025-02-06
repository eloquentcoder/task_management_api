import app from "./app";

const PORT = process.env.PORT;

const JWT_SECRET = process.env.JWT_SECRET;


if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});