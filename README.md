### Apicbase Challenge

#### Frontend Vue(One Page Application)
The frontend aplication is hostend in Firebase by link (https://apicbase-challenge.web.app/).

##### How to install
After clone the repository go to front_end directory and run the `npm i install` command to download all required dependencies.

After that, run `npm run serve` that will host your application in localhost at port 8080.

Observation: In this project the enviroment varable `VUE_APP_API_URL` was addressed the link to the backend url.
In this case, if you run `npm run serve` the vue will check the `.env` file that contains the url `localhost:9090/api`.
And if you run `npm run build` the vue will check the `.env.production` file that contains the url `apicbasechallenge.herokuapp.com/api`.

##### Structure
The project's struture was suggested in the following way:
```
src
│
│   App.vue
│
└───assets -> Contains all the images used in the app.
│   
└───components -> All reused items was moved to the components to be reused in multiple views or components.
│   
└───mocks -> Contains all mocked data. It were created to simulate the UI components before the creation of backend.
│   
└───models -> Contains all classes known as entities, allowing convert JSON objects from API reponses to an specif object with specifc functions or notations. 
│   
└───plugins -> Contains the vuetify configuration.
│   
└───repositories
│   │
│   │  Repository.js -> Responsible to set the api calls, base URL and authorization's logic (authorization's logic is not present in this app).
│   │  RepositoryFactory.js -> Responsible to create each Repositry instance associated with the appropriated Model.
│   │  ...
│   
└───router
│   │
│   │  index.js -> Resposible to address the paths of the application to the appropriated View. In this project Vue Router was used and applied to the Vue instance.
│
└───store
│   │
│   │  index.js -> Resposible to add each module logics to the application's Vue instance
│   │  modules -> Contains each module of the application the it's responsible to deal with state manegment. In this Vuex was used as state management pattern.
│   
└───views -> Contains all Vue components understood as a single page of the application

```

### Backend Django(REST API)
The bascked aplication is hostend in Heroku by link (https://apicbasechallenge.herokuapp.com/) 

##### How to install

##### Structure
 
