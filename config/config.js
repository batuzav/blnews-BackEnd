///////////////////
//Configuracion del puerto de escucha
///////////////////
// process.env.PORT = process.env.PORT || 443; //REGRESAR PUERTO A 443 //Descomentar cuando este en producci+on

process.env.PORT = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.DB =
  "mongodb+srv://user:ff258456@cluster0-qdmsk.mongodb.net/bodylogictest?retryWrites=true&w=majority";
process.env.tokencrypt = "myBLNEWSserverit";
