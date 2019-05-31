# Vue Login

Login and Register forms built with Vue.js, Vuex, Vue-Router and Bootstrap

## Scripts

- `yarn install`: project setup
- `yarn start`: compiles and hot-reloads for development
- `yarn server`: runs Express backend and connects to MongoDB
- `yarn dev`: runs `yarn start` and `yarn server` concurrenlty
- `yarn build`: compiles and minifies for production
- `yarn lint`: lints and fixes files

### Note for using your own keys

If you'd like to use your own keys cretea a file `config/keys_dev.js` with the following content

```
module.exports = {
  mongoURI: <your_mongo_uri>,
  secretOrKey: <your_jwt_secret>
};
```
