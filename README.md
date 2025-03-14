### Getting Started

To get started with the App:

1. Download Node.js onto your system.
2. Clone the repository.
3. Go into the two directories and install the dependencies. Start with the `client` using the commands below.

```
cd client
```

After going inside the directory, make install the dependencies with the following command.

```
npm install
```

Now run the front-end-client with the following command.

```
npm start
```

Next, open a new terminal and go into the `Server` director and do the same. First, to go into the directory, use the following commands

```
cd ..
cd server
```

Install the dependencies as before.

```
npm install
```

Now, setup your database. You will need PostgreSQL and need to set it on your local device. After you are done, create a `.env` file and put the database's URL inside it. More information about the URL can be found [here](https://www.prisma.io/docs/concepts/database-connectors/postgresql). Put the URL (and also the required port) in the following format.

```
# To run the back end server on port 3001 of your localhost.
PORT=3001

# Here you will paste the database URL
DATABASE_URL=
```

After that, migrate the database to the required version with

```
npx migrate dev
```

Before you start the application, do note that you will need to create the categories inside the `Category` table. The front end UI has no way to add these categories :)
You can even use Prisma Studio to do this. Start it with

```
npx prisma migrate dev
```

Once you are done, run the following command to start the back end server.

```
npm start
```

With both the `client` and `server` running on two terminals, go to [localhost:3000](http://localhost:3000). There create an account and sign.

## Video Demo

The demo can be found [here](https://drive.google.com/file/d/1dYn-zjO05VbPUEM16YRESVJ1hF_Od5KY/view?usp=sharing)

## Some bugs left to resolve

1. Creating product does not add description and categories.
2. Notifications are lagging behind.
3. Sign Up page shows blank notification on success.

## Architecture

The diagram illustrates a high level design of the application.

![alt text](./TeebayArchitecture.png)

### Database

This diagram illustrates how the PostgreSQL database schema is designed.
![alt text](./prisma-erd.svg)
