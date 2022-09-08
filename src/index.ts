import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database";
import routerGeneros from "./routes/generoRoute";
import routerAlunos from "./routes/alunoRoute";
import routerLivros from "./routes/livroRoute";
import routerLocacoes from "./routes/locacaoRoute";
dotenv.config();

const port: number = Number(process.env.PORT) || 8000;
const host = "0.0.0.0.";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//Routes
app.use(routerGeneros);
app.use(routerAlunos);
app.use(routerLivros);
app.use(routerLocacoes);

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  (async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();
});

process.on("SIGINT", () => {
  server.close();
  console.log("Server closed");
});
