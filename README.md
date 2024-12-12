# Blog API Documentation

## Introduction

This API provides endpoints for managing a blog, including user authentication, post creation, editing, and commenting.

## Models

### User
* **id:** Unique identifier
* **username:** User's username
* **email:** User's email address
* **password:** User's password (hashed)
* **isAuthor:** Boolean flag indicating if the user is an author (default: false)

### Post
* **id:** Unique identifier
* **title:** Post title
* **content:** Post content
* **created_at:** Timestamp of creation
* **updated_at:** Timestamp of last update
* **status:** Post status (e.g., draft, published)
* **comments:** Relationship to comments

### Comment
* **id:** Unique identifier
* **content:** Comment content
* **authorName:** Name of the comment author
* **authorId:** ID of the comment author (foreign key to User)
* **created_at:** Timestamp of creation
* **post_id:** ID of the post the comment belongs to (foreign key to Post)

## Endpoints

### Authentication
* **POST /sign-up**
  * **Request Body:**
    * `username`
    * `email`
    * `password`
  * **Response:**
    * `token` (if successful)
    * `error` (if unsuccessful)
* **POST /login**
  * **Request Body:**
    * `username`
    * `password`
  * **Response:**
    * `token` (if successful)
    * `error` (if unsuccessful)

### Posts
* **GET /posts**
  * **Query Parameters:**
    * `author_id`: Filter posts by author ID
    * `page`: Pagination page number
  * **Response:**
    * `posts` (array of posts)
* **POST /posts**
  * **Request Body:**
    * `title`
    * `content`
  * **Response:**
    * `post` (created post)
* **GET /posts/:id**
  * **Response:**
    * `post` (specific post)
* **PUT /posts/:id**
  * **Request Body:**
    * `title`
    * `content`
  * **Response:**
    * `post` (updated post)
* **DELETE /posts/:id**
  * **Response:**
    * `success` or `error` message

### Comments
* **GET /comments/:post_id**
  * **Response:**
    * `comments` (array of comments for the specified post)
* **POST /comments/:post_id**
  * **Request Body:**
    * `content`
  * **Response:**
    * `comment` (created comment)
* **DELETE /comments/:comment_id**
  * **Response:**
    * `success` or `error` message

## Authentication
All endpoints require authentication except for `/sign-up` and `/login`. Authentication is done via an API token that should be included in the `Authorization` header of requests.

## Error Handling
Error responses will include an HTTP status code and an error message.
