# **PhyRem Frontend** - Physician client

This is the PhyRem Physician client, a ReactJS web application written in Typescript for type checking, and uses Redux to maintain an app state.

App components are split between their own directories with their appropriate reducers and actions.

## **Before Start**
What are you trying to do?

**Deploy the application:** This service should be deployed along with the corresponding backend, it is containerized with docker and setup will deploy it automatically. Visit [PhyRem - Backend](https://github.com/PhyRemProject/Phyrem-Backend) and read the deployment section.

**Develop/Debug the application:** As with any React application execute the following commands:
`npm install` followed by `npm start`, other React commands may apply.

## **Environment Variables**
The application requires a few variables to be set, **by default the app is set for development/debug**.

To change these values to **deployment** or to other values, change the file `src/constants.tsx`

