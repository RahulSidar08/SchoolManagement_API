
# School Management API
The School Management API is a backend service built using Node.js, Express.js, and MySQL to manage school-related data efficiently. It provides endpoints for adding, retrieving, and managing schools along with location-based sorting. The API is deployed on Render and uses Clever Cloud for database hosting.


## Features

- School Management: Add and retrieve school details.
-  Location-Based Sorting: Fetch schools sorted by proximity.
- Follows best practices for API design.


## Tech Stack

**Backend:** Node, Express 

**Database:** MySQL (Hosted on Clever Cloud)

**Deployment:** Render (Backend)

**Tools:** Postman (For API Testing) , Visual Studio Code



## Run Locally

Clone the project

```bash
git clone https://github.com/your-username/school-management-api.git
```

Go to the project directory

```bash
cd school-management-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## API Reference
TEST API USING POSTMAN 
#### Add School

```http
  POST https://schoolmanagement-api-vrap.onrender.com/addSchool
```
#### Get schools List

```http
  GET https://schoolmanagement-api-vrap.onrender.com/listSchools
```



## Deployment

The API is deployed on Render and can be accessed at:

```bash
https://schoolmanagement-api-vrap.onrender.com/
```


## Author

- [Rahul Sidar](https://github.com/RahulSidar08)

## Contributing

Feel free to fork, submit pull requests, and contribute! 🚀

