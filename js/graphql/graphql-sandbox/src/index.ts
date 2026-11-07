import { createServer } from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

type Note = {
  id: string;
  body: string;
};

const notes: Note[] = [{ id: "1", body: "hello from graphql" }];

const yoga = createYoga<{
  req: IncomingMessage;
  res: ServerResponse;
}>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Note {
        id: ID!
        body: String!
      }

      type Query {
        notes: [Note!]!
      }

      type Mutation {
        addNote(body: String!): Note!
      }
    `,
    resolvers: {
      Query: {
        notes: () => notes,
      },
      Mutation: {
        addNote: (_parent: unknown, args: { body: string }) => {
          const note = { id: String(notes.length + 1), body: args.body };
          notes.push(note);
          return note;
        },
      },
    },
  }),
  graphqlEndpoint: "/graphql",
});

const port = 4000;
const server = createServer(yoga);

server.on("error", (error: NodeJS.ErrnoException) => {
  const message = error.code === "EADDRINUSE" ? "port 4000 is already in use" : error.message;
  console.error(message);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`graphql-api http://localhost:${port}/graphql`);
});
