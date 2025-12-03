import { app } from "./app.ts";
import { config } from "./config/infrastructure/config.ts";

const port = config.app.port;

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
