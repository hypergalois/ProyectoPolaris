import app from "./app.js";
import initTracer from "./tracing.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});

initTracer(); 