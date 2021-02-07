### REACT-NATIVE APPLICATION POWERED USING MONGODB REALM
This is a react native application being powered using serverless functions and data access using MONGODB REALM

> **Note:** This is a React Native application using the React Native Cli **not** Expo. No Expo support for Realm yet!

## RUN STEPS
Create a `credentials.js` file for storing sensitive credentials in the `src` directory with the two following exported variables:
- ```js 
   export const REALM_GRAPHQL_ENDPOINT = <GRAPHQL DATA ACCESS ENDPOINT ON REALM CONSOLE>
  ```  
- ```js
   export const REALM_ID = <REALLM APP ID SHOWN IN REALM APP SETTINGS SECTION>
  ```  

