# Vue Login

Login and Register forms built with Vue.js, Bootstrap, Express and MongoDB

## Scripts

- `yarn install`: project setup
- `yarn server`: runs Express backend and connects to MongoDB
- `yarn client`: compiles and hot-reloads client-side for development
- `yarn dev`: runs `yarn server` and `yarn client` concurrenlty
- `yarn build`: compiles and minifies for production
- `yarn lint`: lints and fixes files

### Note: using your own keys

If you'd like to use your own keys create a file `config/keys_dev.js` with the following content

```
module.exports = {
  mongoURI: <your_mongo_uri>,
  secretOrKey: <your_jwt_secret>
};
```

### Note: JWT

The backend sends a signed JWT upon successful login. Although it is not used for user authentication I still included it as further iterations of this project might make use of it
