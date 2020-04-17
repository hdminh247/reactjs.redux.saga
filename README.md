## Steps to build
##### Step 1: Clone this repository and navigate into project folder
##### Step 2: Installing dependencies, run this command
```
npm install
```
or
```
yarn install
```
##### Step 3:
-  If you want to run this website on localhost, run this command:

```
npm start
```

The website is hosted at `http://localhost:3000`

## Step to deploy 

- If you host this website in somewhere on server, follow the following steps:
1. Update `app/config.dev.json` for `config.prod.json`, depend on which environment you want to deploy.
 ```$xslt
  "mode": "",
  "serverUrl": "",
  "facebookAppId": "",
  "googleAPIKey": "",
  "STRIPE_MODE": "",
  "STRIPE_SANDBOX_PUBLISHABLE_KEY": "",
  "STRIPE_LIVE_PUBLISHABLE_KEY": "",
  "PAYPAL_MODE": "",
  "PAYPAL_SANDBOX_CLIENT_ID": "",
  "PAYPAL_SANDBOX_CLIENT_SECRET": "",
  "PAYPAL_LIVE_CLIENT_ID": "",
  "PAYPAL_LIVE_CLIENT_SECRET": "",
  "fireBase": {
    "apiKey": "",
    "authDomain": "",
    "databaseURL": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": "",
    "measurementId": ""
    }
```
***NOTES: `STRIPE_MODE` and `PAYPAY_MODE` only accept 2 values: `sandbox` or `live`. Depend on which mode chosen, app will choose corresponding configurations
2. Command line to build
- For development
```
npm run build:deploy:dev
```
- For production
```
npm run build:deploy:production
```
The build files are served at `<root>/build` folder
