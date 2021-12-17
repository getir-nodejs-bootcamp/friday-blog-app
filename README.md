# Friday Blog App

Friday is a backend project for blog application which uses NodeJS, Express and MongoDB.
All extended CRUD capabilities are implemented, mailing and SMS events as well as
text search queries and aggregation queries.

## Capabilities

-   A user is able to register, get a JWT Token, create account, modify user information,
    specify preferences for contact, indicate interested in topics, and delete the account.
    The user can reset the password by receiving email.
-   A user is able to post a blog, modify the blog content, and add hashtags to blog.
-   A user is able to receive recommended blogs for his/her interests.
-   A user is able to post a comment, modify the content of a comment, send like to blog
    and can take back like sent on the blog. If a user liked a blog before, the application warns
    the user and does now allow the user to move on. Likewise; if a user did not liked a blog before,
    the user is not able to revert like.
-   A user is able to create reading lists with a name that holds other users' blogs.
-   When a blog is deleted, the application deletes comments posted on this blog as well.
    In addition, the deleted blog is removed from the playlists of each user if exists.
-   When a user account is deleted, the application clears and removes all necessary information
    that deleted user is related to.
    Consequently; comments, blogs and reading lists are removed related to this user.

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install project.

```bash
yarn install
```

## Run

Use the package manager [yarn](https://yarnpkg.com/) to run project.

```bash
yarn dev or yarn start
```

## MongoDB Schemas and Entity Relationship Diagram

<img width="1190" alt="BlogApp-ER-Mongo" src="https://user-images.githubusercontent.com/56218812/146559644-f2b25802-5e3a-437a-bf63-65810934e674.png">

## Documentation for API Endpoints

-   The rest of the file gives detailed information about endpoints for each service.

## Users Service

| Method                       | Description                                                     | Required Body Fields     | Authentication |
| ---------------------------- | --------------------------------------------------------------- | ------------------------ | -------------- |
| GET /users                   | Returns all users documents                                     |                          | **required**   |
| GET /whoami                  | Returns current session info of user                            |                          | **required**   |
| POST /users                  | Returns new created user document                               | `name, email, password ` | **required**   |
| POST /users/login            | Returns logged in user info and authentication token            | `email, password `       | not required   |
| POST /users/reset-password   | Returns information and sends email to user mail                | `email`                  | not required   |
| PATCH /users                 | Returns updated user information                                |                          | not required   |
| PATCH /users/change-password | Returns information and sends SMS to user phone number          | `password`               | **required**   |
| DELETE /users/:userid        | Deletes user account and user related data in other collections |                          | **required**   |

## Blogs Service

| Method                             | Description                                                                                              | Required Body Fields    | Authentication |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------- | -------------- |
| GET /blogs                         | Returns all blogs documents                                                                              |                         | not required   |
| GET /blogs/popular-blogs           | Returns most liked and published top ten blogs                                                           |                         | not required   |
| GET /blogs/popular-blogs/:category | Returns most liked and published top five blogs by filter category                                       |                         | not required   |
| GET /blogs/search-by-keywords      | Returns blogs that contains given words in the body                                                      |                         | not required   |
| GET /blogs/recommend-me            | Returns recommended blogs to user by looking users' preferred hashtags and querying these tags for blogs |                         | **required**   |
| GET /blogs/:id                     | Returns updated user information                                                                         |                         | **required**   |
| POST /blogs                        | Returns new created blog document                                                                        | `text, title, category` | **required**   |
| PATCH /blogs/:id                   | Returns updated blog document                                                                            |                         | **required**   |
| PATCH /blogs/:id/like-flag         | Returns liked like count of blog                                                                         | `{liked: boolean}`      | **required**   |
| DELETE /blogs/:id                  | Deletes the blog by given id and deletes if comments exists for this blog                                |                         | **required**   |

## Comments Service

| Method               | Description                              | Required Body Fields | Authentication |
| -------------------- | ---------------------------------------- | -------------------- | -------------- |
| GET /comments        | Returns all comments documents           |                      | not required   |
| GET /comments/:id    | Returns single comment by given id       |                      | **required**   |
| POST /comments       | Returns new created comment document     | `text`               | **required**   |
| PATCH /comments/:id  | Returns updated comment                  | `text, blog_id`      | **required**   |
| DELETE /comments/:id | Returns success info and removes comment |                      | **required**   |

## Readinglists Service

| Method                         | Description                                                             | Required Body Fields | Authentication |
| ------------------------------ | ----------------------------------------------------------------------- | -------------------- | -------------- |
| GET /readinglists              | Returns all readinglists documents                                      |                      | **required**   |
| GET /readinglists/:id          | Returns single readinglist by given id                                  |                      | **required**   |
| POST /readinglists             | Returns new created readinglist                                         | `name`               | **required**   |
| PATCH /readinglists            | Returns updated readinglist                                             |                      | **required**   |
| PATCH /:id/add-blog/:blogId    | Adds given blog to given reading list and returns updated document      |                      | **required**   |
| PATCH /:id/remove-blog/:blogId | Removes given blog from given reading list and returns updated document |                      | **required**   |
| DELETE /readinglists/:id       | Removes reading list                                                    |                      | **required**   |

### Twilio SMS Extension

-   An event is fired when a user changes his/her password.
    Following this, if user specified to receive SMS on users
    document preferences then SMS is sent by Twilio services.
    Make sure that, you have added related information to .env file

<img width="400" alt="twilio-sms" src="https://user-images.githubusercontent.com/56218812/146561235-2d8de10d-9c3f-400e-b4f8-c0f5b70c6b17.png">


### Nodemailer Extension

-   An event is fired when a user resets his/her password.

<img width="600" alt="nodemailer" src="https://user-images.githubusercontent.com/56218812/146561188-52553995-0f7f-4103-9eb8-fa83cf0e56e6.png">
