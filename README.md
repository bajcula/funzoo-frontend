# FunZoo

- Front-end files repo for the Funzoo app.

FUNZOO is a social media photo sharing app where you can share your funniest pet photos and explore other people's pet photos. You can also save the photos you like for an easier access later on. It is a full CRUD app built with a React frontend and a separate Django API server.

## Deployed Funzoo App:

#### [Funzoo App](https://funzoo.herokuapp.com)

##### Feel free to register and use the app

### Tech Stack:

- React.JS (React-Bootstrap, MaterialUI)
- Python - Django (backend)
- PostgreSQL (backend testing)
- Heroku
- GitHub

### Aproach:

- Created a pet pictures sharing app with 2 connected user and post models.
- Implemented many to many relationship through likes and unlikes of the posts.
- Incorporated Django authorization, customized serializers and views in both models.
- Utilized class based components and states in React.

### MVP:

- Extend one of the previous projects with Django backend or build a new one.
- Full CRUD app built with a React frontend and a separate Django API server.
- Django Backend: Serve a JSON API with all CRUD operations available across your models.
- React frontend: Serve a React frontend that consumes (a.k.a relies on fetch requests to) your Django API. You should be able to perform all CRUD operations through the React app and have them execute in and persist in the Django database.
- Both parts of the app must be deployed online and accessible to the public via Heroku.
- A README.md file with explanations of the technologies used, the approach taken.

### Strech Goals:

- Include two or more models.
- Include either a one-to-many or a many-to-many relationship.
- Have routing using react-router-dom
- Have two models that are related
- Include portfolio-quality styling.
- Use a CSS framework like Skeleton or Bootstrap

### Additional Notes:

Future strech goals would include adding pagination to the posts page.
