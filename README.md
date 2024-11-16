# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- **Please** _use nodejs v.22.8.0_ for checking this work.

### Downloading

```
git clone {repository URL}
```

### Preparation

```
rename env.example into .env
```

## Installing NPM modules

```
npm ci (please - don't update versions of dependencies in order to avoid crash app)
__if it will need use npm ci --legacy-peer-deeps__

```

## Running application

```
npm start (by default port for app used __4000__)
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing <http://localhost:4000/doc/>.
For more information about OpenAPI/Swagger please visit <https://swagger.io/>.

## Testing

After **application running** (npm start) _open new terminal_ and enter:

To run all tests without authorization

```
npm run test
```

only this command for testing this task

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: <https://code.visualstudio.com/docs/editor/debugging>

### Using the app

this app contain next entities, for all id's generating used uuid version4 preinstalled package.

- `User` (with attributes):

  ```typescript
  interface User {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;
  }
  ```

- `Artist` (with attributes):

  ```typescript
  interface Artist {
    id: string;
    name: string;
    grammy: boolean;
  }
  ```

- `Track` (with attributes):

  ```typescript
  interface Track {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
  }
  ```

- `Album` (with attributes):

  ```typescript
  interface Album {
    id: string;
    name: string;
    year: number;
    artistId: string | null;
  }
  ```

- `Favorites` (with attributes):

  ```typescript
  interface Favorites {
    artists: string[];
    albums: string[];
    tracks: string[];
  }
  ```

**Endpoints:**

- `Users` (`/user` route)

  - `GET localhost:4000/user/user` - get all users
  - `GET localhost:4000/user/:id` - get single user by id (id required UUID format)
  - `POST localhost:4000/user` - create user (required body)

  ```typescript
  interface CreateUserDto {
    login: string; //required
    password: string; //required
  }
  ```

  - `PUT localhost:4000/user/:id` - update user password

    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string;
      newPassword: string;
    }
    ```

  - `DELETE localhost:4000/user/:id` - delete user

- `Tracks` (`/track` route)

  - `GET localhost:4000/track` - get all tracks
  - `GET localhost:4000/track/:id` - get single track by id
  - `POST localhost:4000/track` - create new track with body in foramt

  ```typescript
  interface CreateTrack {
    name: string; //required
    artistId: string | null; //optional
    albumId: string | null; //optional
    duration: number; //required
  }
  ```

  - `PUT localhost:4000/track/:id` - update track info (body same as in POST method)
  - `DELETE localhost:4000/track/:id` - delete track

- `Artists` (`/artist` route)

  - `GET localhost:4000/artist` - get all artists
  - `GET localhost:4000/artist/:id` - get single artist by id
  - `POST localhost:4000/artist` - create new artist
  - `PUT localhost:4000/artist/:id` - update artist info
  - `DELETE localhost:4000/artist/:id` - delete album

- `Albums` (`/album` route)

  - `GET localhost:4000/album` - get all albums
  - `GET localhost:4000/album/:id` - get single album by id
  - `POST localhost:4000/album` - create new album
  - `PUT localhost:4000/album/:id` - update album info
  - `DELETE localhost:4000/album/:id` - delete album

- `Favorites`

  - `GET localhost:4000/favs` - get all favorites in format

  ```typescript
     interface FavoritesResponse {
       artists: Artist[];
       albums: Album[];
       tracks: Track[];
     }
     ``1

  - `POST localhost:4000/favs/track/:id` - add track to the favorites
  - `DELETE localhost:4000/favs/track/:id` - delete track from favorites
  - `POST localhost:4000/favs/album/:id` - add album to the favorites
  - `DELETE localhost:4000/favs/album/:id` - delete album from favorites
  - `POST localhost:4000/favs/artist/:id` - add artist to the favorites
  - `DELETE localhost:4000/favs/artist/:id` - delete artist from favorites
  ```
