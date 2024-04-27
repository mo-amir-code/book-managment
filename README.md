
# Book Management API

This API provides functionalities for managing book entries, including CRUD operations, filtering by author or publication year, and user authentication.




## Required Environment Varibales on Local Machine

- DB_URI
- SALT_ROUND
- JWT_KEY


## Author End Points

#### Book Management API Origin

```http
  https://book-managment-steel.vercel.app/
```

#### Create Author Account

```http
  POST /api/v1/author/signup
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Login Author Account

```http
  POST /api/v1/author/signin
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Update Author Account

```http
  PATCH /api/v1/author
```

| Body Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `oldName/authorId`      | `string` | **Required** |
| `name`      | `string` | **Optional** |
| `email`      | `string` | **Optional** |

#### Delete Author Account

```http
  DELETE /api/v1/author
```

| Query Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorId/name`      | `string` | **Required** |

#### GET Authors Account

```http
  GET /api/v1/author
```

## Book End Points

#### Add Book

```http
  POST /api/v1/book
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** |
| `authorName` | `string` | **Required** |
| `publicationYear` | `string` | **Required** |

#### Get All Books By Author Id or Author Name or Publication Year

```http
  GET /api/v1/book
```

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorId/authorName/publicationYear` | `string` | **Required** |

#### Get Book By Id

```http
  GET /api/v1/book/:bookId
```

| Params Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bookId` | `string` | **Required** |

#### Delete Book By Book Id or Book Name

```http
  DELETE /api/v1/book
```

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bookId/bookName` | `string` | **Required** |

#### Update Book

```http
  PATCH /api/v1/book
```

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bookId` | `string` | **Required** |
| `title` | `string` | **Optional** |
| `publicationYear` | `string` | **Optional** |