# UPDATE CREATE-REACT-APP

## in project
 - npm install --save react-scripts@latest
 
 then you have:
 ```json
  "dependencies": {
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.1",
    "react-scripts": "^4.0.1"
  },
```
 
## in global
 - if you use command 'npx create-react-app my-app' you doing nothing
 - if you use command 'npm create-react-app my-app' you need update global packages:
  
```
npm -g update create-react-app
```
 
 or 
 
```
npm uninstall -g create-react-app
npm install -g create-react-app
```

# UPDATE REACT and REACT-DOM

 - in package.json insert new version react and react-dom

change:
```json
  "dependencies": {
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.1",
    "react-scripts": "^4.0.1"
  },
```

to:
```json
  "dependencies": {
    "prop-types": "^15.7.2",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-router-dom": "^5.0.1",
    "react-scripts": "^4.0.1"
  },
```

 - if you choose react 17.0.1 you need delete in all files import React from 'react',
but leave imports of elements : { createContext, Components, useState, useEffect } from 'react' and other if it exists

# Upgrade ESLint