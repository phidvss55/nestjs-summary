difference between npm and npx

npm (node package manager)

- Install package locally or global
  - npm install -g pm2

npx (node package executor)

- executor / run all packages without install
  - npx http-server .
- run command one time (not left any install track)

---

**example: when installing react app**

- if using with npm:

  1. npm install -g create-react-app
  2. create-react-app myapp

- if using with npx
  1. npx create-react-app myapp

using npx help us to save the time/resources
