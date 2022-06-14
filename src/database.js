const mongoose = require("mongoose");

// Conexión a BD Local
//URL = ('mongodb://localhost/avnMotors');
// URL = ('mongodb://localhost:27017/avnMotors');

// Conexión a BD Nube
// URL = ('mongodb+srv://Al3jox:Mg31415*@cluster0.5uq3h.mongodb.net/avnMotors?retryWrites=true&w=majority');

//BD Nube Nat
URL =
  "mongodb+srv://NatNov:Yafue03@cluster0.l3u4g.mongodb.net/avn?retryWrites=true&w=majority";

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Conexión exitosa a la BD: ", db.connection.name))
  .catch((error) => console.log(error));
