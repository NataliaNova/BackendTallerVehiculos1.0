const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// Requerimos la BD
require("./database");

// Configuración del puerto
app.set("Port", process.env.PORT || 3200);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origen: "*" }));

// Rutas

app.use("/vehiculo", require("./routes/vehiculos-routes"));
app.use("/servicios", require("./routes/servicios-routes"));
app.use("/proveedor", require("./routes/proveedor-routes"));
app.use("/producto", require("./routes/producto-routes"));
app.use("/cliente", require("./routes/cliente-routes"));
app.use("/administrador", require("./routes/administrador-routes"));
app.use("/ventaProducto", require("./routes/ventaProducto-route"));

app.use("/usuario", require("./routes/usuario-routes"));
app.use("/agendamiento", require("./routes/agendamiento-routes"));

// Oir el puerto
app.listen(app.get("Port"), () => {
  console.log("Escuchando al servidor:", app.get("Port"));
});
