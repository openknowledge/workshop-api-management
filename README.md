## Workshop API Management

This repository contains samples for the workshop API Testing.

# Running the samples of the workshop

The samples run with Docker Compose.
So please ensure you have docker installed in a recent version.

Start the examples by typing

```
docker compose up --build
```

from within the folder you cloned the repository.

# Demo

This demo showcases the Backstage developer portal framework.

Go to the directory `./backstage`.

Copy `app-config.local-example.yaml` to `app-config.local.yaml`.

Create a GitHub Personal Access Token here https://github.com/settings/tokens/new using the full repo scope.

Edit `app-config.local.yaml` and replace `${GITHUB_TOKEN}` with your generated token.

Run `yarn install` to install all Backstage depenencies (you may have to install [yarn](https://yarnpkg.com/) first).

To start Backstage run `yarn dev`.

The Backstage frontend should be opened in your browser. You may also open http://localhost:3000 manually.

Go to http://localhost:3000/create and click on the "Register Existing Component" button.

As "Repository URL" enter `https://github.com/openknowledge/workshop-api-management/blob/backstage/catalog-info.yaml`

Click the "Analyze" button. A series of entities should be shown.

After clicking on the "Import" button the entities should be added.

Go to "Home" and take a look at the imported entities.

Try to jump from entity to entity to get a feel how Backstage works.

Feel free to fork the Git repository and make a few changes.

Push your changes to your own repository and try to
