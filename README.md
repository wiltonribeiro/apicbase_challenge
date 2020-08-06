### Apicbase Challenge

#### Frontend Vue (Single Page Application)

##### How to install
After clone the repository go to front_end directory and run the `npm i install` command to download all required dependencies.

After that, run `npm run serve` that will host your application in localhost at port 8080.

Observation: In this project, the environment variable `VUE_APP_API_URL` was addressed to the link to the backend URL.
In this case, if you run `npm run serve` the Vue will check the `.env` file that contains the URL `localhost:9090/api`.
And if you run `npm run build` the Vue will check the `.env.production` file that contains the URL `apicbasechallenge.herokuapp.com/api`.

##### Structure
The project's structure was suggested in the following way:
```
src
│
│   App.vue
│
└───assets -> Contains all the images used in the app.
│   
└───components -> All reused items were moved to the components to be reused in multiple views or components.
│   
└───mocks -> Contains all mocked data. It was created to simulate the UI components before the creation of the backend.
│   
└───models -> Contains all classes known as entities, allowing convert JSON objects from API responses to a specif object with specific functions or notations. 
│   
└───plugins -> Contains the vuetify configuration.
│   
└───repositories
│   │
│   │  Repository.js -> Responsible to set the API calls, base URL, and authorization's logic (authorization's logic is not present in this app).
│   │  RepositoryFactory.js -> Responsible to create each Repository instance associated with the appropriated Model.
│   │  ...
│   
└───router
│   │
│   │  index.js -> Responsible to address the paths of the application to the appropriated View. In this project, the Vue Router was used and applied to the Vue instance.
│
└───store
│   │
│   │  index.js -> Responsible to add each module logics to the application's Vue instance
│   │  modules -> Contains each module of the application responsible to deal with state management. In this Vuex was used as a state management pattern.
│   
└───views -> Contains all Vue components understood as a single page of the application

```
Observation: Each SCSS style applied to a component or page was written in the respective Vue file as the Vue common pattern. Another alternative was to move the styles to the assets folder and import inside of the components, however, seeing that there's no style variables, mixins, or functions being shared among the files, the first alternative was taken.

Observation2: In order to show at least most of the power of vue js, in this project was used: props (declared in all possible different ways among the components), $emit, slots, dynamic components with component tag, deep watch, transitions and so on.

### Backend Django (REST API)
The chosen database for this project was Postgres, which is also hosted in Heroku. 

##### How to install

First, note the required libs to run the project in `requirements.txt`. After you install it, make sure you have a local database available and apply the credentials to this file `settings.py`, exactly here:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'apicbase', # The database's name
        'USER': 'postgres', # User that owns the databse
        'PASSWORD': '', # Your password
        'HOST': '127.0.0.1', # address to Localhost
        'PORT': '5432', #Usually the default port of a Postgres server
    }
}
```

Now migrate the changes made in `./migrations` to your machine using the following command:

```
 python3 manage.py migrate  
```

Then run the server by the following command:
```
 python3 manage.py runserver 9090 
```

Done! You can finally see the API running has never. Now if you make your first request though the URL base, you should receive the message:
> "This is a Django rest API made with love to the apicbase challenge"

##### Structure

The backend structure was following the common one used in the Django API. Mainly there's: 
- models.py that represents, in some abstract way, the tables of the database.
- urls.py that tell us the URL routers available to route to the application.
- views.py that is responsible to deal with the request and response of the API.
- serializers.py that allow us to convert complex data and model instances to native Python datatypes.
 
Obs: As I said before the API is hosted in Heroku, it's using the free plan thought. So your first request may take a little bit longer to respond, regarding that the Heroku instance needs to take his time "wake up" and stand up with the online service.
