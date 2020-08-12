# 🖥 ...MyBL-News Back-End... 🖥👨‍🎤

Este es el back-end del sistema de MyBL-News.
Acá se conecta la [aplicación móvil](https://gitlab.com/bodylogicit/react-reactnative/mybl-news) y el [dashboard]().

## Contenido

El proyecto esta realizado en [Node.js](https://nodejs.org/es/) conbinando las tecnologías de [express.js](https://expressjs.com/es/), [GraphQL](https://graphql.org/) y [MongoDB](https://www.mongodb.com/es). **ESTE ES UN SERVIDOR NO VISUAL**

## Como Clonar

Para poder utilizar el proyecto en localhost en necesario clonarlo y tener algunos programas necesarios:

- [Nodejs](https://nodejs.org/es/download/) v12.18.0 o Superior.
- IDE de desarrollo de tu comodidad Ej. [VS Code](https://code.visualstudio.com/download)
- [PostMan](https://www.postman.com/downloads/) para puebas de APIS. -Opcional
- [Git](https://git-scm.com/downloads) para poder gestionar las versiones.

Comandos para clonar:

```bash
cd existing_folder
git clone https://gitlab.com/bodylogicit/nodejs/mybl-news-backend.git

```

## Intalación

Ya clonado el proyecto es necesario instalar todas las dependencias con el comando:

```bash
npm install
```

### Run en LocalHost:

- Cambiar las llaves a modo pruebas en el archivo [config.js](/config/config.js)

Cuando las llaves esten en modo pruebas ejecutar el comando:

```bash
npm test
```

Este a su vez ejecutara nodemon app.js, el cual ayudará a la funcionalidad de pruebas y dev.

### Run en Producción:

- Cambiar las llaves a modo producción en el archivo [config.js](/config/config.js)

Cuando las llaves esten en modo producción ejecutar el comando:

```bash
npm start
```

Este a su vez ejecutará el comando node app.js el cual estará preparado para la ejecución del servidor en producción

## Subir cambios

Para poder subir cambios al repositorio es necesario utilizar los siguientes comandos.

```bash
git add .
```

o si lo prefiere

```
bash
git add "./direction_file"
```

```
bash
git commit -m "tu mensaje"

git push origin master
```

o si usted se encuentra en otro branch

```
bash
git push origin "your_bnach"
```

### Colaboradores

Desarrollo realizado por [BATUZAV](https://batuzav.com)
