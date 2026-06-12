# Diary App Documentation

This project uses Next.js for rendering frontend and route handlers for backend APIs. It uses a Postgres database on Neon. It notably uses BlockNote for rich text editing and a block-level document structure. More setup info:

- Uses Drizzle ORM with an HTTP driver instance. The setup config can be found in `src/utils/db.ts`
- Has state management setup in `components/context`
- Uses BetterAuth with drizzle driver to secure frontend components and backend APIs.
  e.g. http://localhost:3000 (no trailing slash)

## Environment Variables

- NEXT_PUBLIC_API_URL: Used to set frontend domain (e.g. http://localhost:3000, notice no trailing slash).
- DATABASE_URL: Connection to the Neon database.

## API Reference

```
Note: Most API routes implement authentication. API routes that fetch or update diary content (entries, entry blocks) retrieve user id from Better Auth session. It then checks whether the user owns the entry before making any changes.
```

The project uses Next.js Client components, Server components, and sometimes server actions to send fetch requests to Next.js route handlers (API routes). The route handlers are defined within `src/app/api`.

### Available APIs

#### Get all entries

Retrieves all of your diary entries with the first three blocks of each. Each entry represends a diary page, and each block is a line on the page.

This route reads the auth session, accesses user id from them and fetches all entries associated with the user, ordered from latest.

It then decrypts the content rows, creates a new array and returns JSON.

Route: `/api/entries`

Method: `GET`

```
Note: If sending from a Next.js server component, ensure sending headers through the fetch method. Here is a demonstration:

import { headers } from 'next/headers';

export default async function ServerUI() {
    await fetch("/api/entries, {
        headers: await headers(),
    })
}
```

#### Get blocks for an entry

Retrieve all the lines for a page.

Takes the entry ID through URL param string. For example: `/api/blocks?entryId=934`.

`entryId` represends an individual entry (or page).

It then decrypts the content rows, creates a new array and returns JSON.

Route: `/api/blocks?entryId=[number]`

Method: `GET`

#### Update an entry

Updates an entry after you're done writing it.

The frontend component has a debounce function that saves the entry 3 seconds after you stop typing. It sends all the BlockNote blocks (arrays of objects) into the API route.

- The route then maps over and inserts a position key to each entry block which helps sort them. In the same map, we encrypt the content key and replace its value with an object that has the following type:

```
{
    encryptedContent: string;
    iv: string;
}
```

Which means, the actual content from each block is encrypted in the database.

Route: `/api/blocks/update`

Method: `PUT`

```
Note: Due to complexities related to environment variables and authentication I have not included steps to run the project locally as of now.
```
