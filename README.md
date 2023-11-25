# Assignment Two

## Installation

To set up and run this project locally, follow these steps:

### Prerequisites

- Node.js and npm should be installed on your machine.

### Clone the repository

```
git clone https://github.com/rakibh3/mongoose-crud

cd mongoose-crud
```

### Install Dependencies

```
npm i
```

### Set up environment variables

Create a .env file in the root directory and add necessary environment variables like database connection strings, DATABASE_URL and PORT

```
DATABASE_URL = your_database_connection_string

PORT = 5000
```

### For Create New Order For Users Follow This :

##### Use this format:

```
{
    "productName": "Apple",
    "price": 20,
    "quantity": 2
}
```

##### Don't user this format:

```
{
    "orders": {
        "productName": "Apple",
        "price": 20,
        "quantity": 2
    }
}
```

### For Update Users Data Follow This :

##### Use this format:

```
{
    "userData": {
        "username": "rakib03",
        "fullName": {
            "firstName": "Md Rakibul",
            "lastName": "Hasan"
        },
        "age": 25,
        "email": "hasan@gmail.com",
        "isActive": true,
        "hobbies": [
            "reading",
            "Coding"
        ],
        "address": {
            "street": "#House: 4, Len: 1, Block: A",
            "city": "Mirpur, Dhaka",
            "country": "Bangladesh"
        }
    }
}
```
