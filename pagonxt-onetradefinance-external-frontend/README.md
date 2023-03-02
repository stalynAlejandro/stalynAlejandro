# Configuring your NPMRC file

Access [the Wiki](https://wiki.flowable.com/display/ITKB/Request+access+to+Artifactory+for+a+Flowable+Customer+or+Partner) to find the documentation about credentials and authentication.

Execute in your console the following line, replacing your user and plain password with the ones provided by the company:

`curl -u <EMAIL>:<PASS> https://artifacts.flowable.com/artifactory/api/npm/auth`

You will get a response with the fields `_auth`, `always-auth` and `email`. Copy the `auth` value and decode it with base64.

Now you will see the decoded string with your email and your encrypted password. Copy the password value and encode it in base64, and copy that result value. This will be what you have to replace in the `[PWD]` fields in the `.npmrc` file.

Create an `.npmrc` file in the root of your user folder and copy this content in it, replacing the [EMAIL] with your email and the `[PWD]` with the base64 value from the previous step:

```
registry=http://artifacts.flowable.com/artifactory/api/npm/npm-all/
email=[EMAIL]
always-auth=true
//artifacts.flowable.com/artifactory/api/npm/npm-all/:username=[EMAIL]
//artifacts.flowable.com/artifactory/api/npm/npm-all/:_password=[PWD]
msvs_version=2022
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
