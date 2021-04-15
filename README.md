# Smart House Sample

The main branch of this repository stores the completed sample used in the first course of the Accreditation Program.

Each branch corresponds to a lesson provided in the Accreditation Program so be sure to checkout the appropriate branch and fill out your environment variables before you start the lesson.

## Environment Variables

Prior to running the app, add a valid contextId and iModelId for your user in the .env file:

```
# ---- Test ids ----
IMJS_CONTEXT_ID = ""
IMJS_IMODEL_ID = ""
```

You'll also need to fill out:

```
# ---- Authorization Client Settings ----
IMJS_AUTH_CLIENT_CLIENT_ID=
```

This is left blank to encourage use of your own OIDC client.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
