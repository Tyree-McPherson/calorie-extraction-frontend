# Calorie Extraction

This application is a fitness and nutrition app that helps users maximize their
calorie extraction during their workouts. It also provides a wide variety of
nutrition information and tools to help users plan their meals and track their
progress.

This application is built using the following technologies:

* [Angular 16](https://angular.io/docs)
* [TypeScript](https://www.typescriptlang.org/docs/)
* [SCSS](https://sass-lang.com/documentation)
* [Angular Material](https://material.angular.io/components/categories)
* [Jest](https://jestjs.io/docs/getting-started)
* [Cypress](https://docs.cypress.io/guides/overview/why-cypress)
* [TypeDoc](https://typedoc.org/guides/doccomments/)

The app is organized into several main components. The first is the
"My Routine" page, which allows users to view and edit their workout routine.
The second is the "Workouts" page, which allows users to view and search
through a list of exercises. The third is the "My Meal Plan" and
"Healthy Meals" pages, which provides information on healthy eating and meal
planning. The fourth is the "Profile" page, which allows users to view and edit
their account information.

Click [here](https://github.com/Tyree-McPherson/calorie-extraction-backend)
to view the repository for the backend of Calorie Extraction.

## Development server

**Note:** Before running the development server, you must edit the
`src/environments/environment.example.ts` file with your real Firebase
credentials. The real file is not tracked by Git, and real credentials
should never be committed to the repository.

The development server is used to run the application locally while developing.
To start the development server, run the following command in the terminal:
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The
application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in
the `dist/` directory.

## Running end-to-end tests

Run `npm run test` to run the end-to-end tests with Cypress.

## Running unit tests

Run `npm run jest` to run the unit tests with Jest.

## Generating TypeDoc documentation

Run `npm run typedoc` to generate documentation.

## Serving the documentation in a browser

Run `npm run serve-docs` to view the documentation in a browser. Then,
open a browser and go to `localhost:8081`.

## Deploy to Google Cloud Storage Bucket

1. Download the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install).
2. CD into this project directory and run `gcloud init` to initialize Google
Cloud and setup the configuration of user credentials and this project.
3. Run `npm run build` to build the project.
4. Run `gsutil -m cp -r dist/frontend-2/* gs://<project-name>` to upload
the build files to the Storage Bucket.
5. Run `gsutil web set -m index.html -e index.html gs://<project-name>` to set the
bucket as a website.