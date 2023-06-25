This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Create Next App
```bash
$ npx create-next-app@latest

✔ What is your project named? … example-app
✔ Would you like to use TypeScript with this project? … No / Yes
✔ Would you like to use ESLint with this project? … No / Yes
✔ Would you like to use Tailwind CSS with this project? … No / Yes
✔ Would you like to use `src/` directory with this project? … No / Yes
✔ Use App Router (recommended)? … No / Yes
✔ Would you like to customize the default import alias? … No / Yes
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Add prisma to the project
Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.

You can check out [PrismaORM](https://www.prisma.io/)
```bash
$ npm i -D prisma 

$ npx prisma init 
```
 
That create `.env` and `prisma/schema.prisma`

### Crate a new project database
1. Create DB project on MongoDB Atlas
2. Connect to your MongoDB deployment, adding the ew Url-string, eg: `mongodb+srv://feldjesus:<password>@cluster0.cqbxyxq.mongodb.net/test`
3. Create your schema on prisma/schema.prisma
```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  name String?
  userName String? @unique
  bio String?
  email String? @unique
  emailVerified DateTime?
  image String?
  coverImage String?
  profileImage String?
  hashexPassword String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  followingId String[] @db.ObjectId
  hasNotification Boolean?

  posts Post[]
  comments Comment[]
  notifications Notification[]

}

model Post {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  body String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  useId String @db.ObjectId
  likedIds String[] @db.ObjectId
  
  user User @relation(  fields: [useId], references: [id], onDelete: Cascade)
  comments Comment[] 
}

model Comment {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  body String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  useId String @db.ObjectId
  postId String @db.ObjectId

  user User @relation(fields: [useId], references: [id], onDelete: Cascade)
  post Post @relation(fields: [postId], references: [id], onDelete: Cascade)
}

model Notification {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  body String
  useId String @db.ObjectId
  createdAt DateTime @default(now())
  user User @relation(fields: [useId], references: [id], onDelete: Cascade)
}

```
4. Deploy to atlas typing the following command `npx prisma db push`

5. You will an message like this "✔ Generated Prisma Client (4.15.0 | library)"


## Create Auth
1. Install prisma client `npm i -D @prisma/client`
2. Create libs/prismadb.ts
```typescript
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

//Avoid create many prisma clients
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
```

3. Install package for hashing password
```bash 
$ npm i bcrypt
$ npm i -D @types/bcrypt
```

3. Install package for auth (next-auth)
```bash 
$ npm i next-auth
$ npm i @next-auth/prisma-adapter
```
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
