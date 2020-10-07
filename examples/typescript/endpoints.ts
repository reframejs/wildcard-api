import { server as _server } from "@wildcard-api/server";
import { Context } from "./start-server";

type EndpointsWithContext = {
  [name: string]: (this: Context, ...args: any[]) => any;
};
type EndpointsWithoutContext = {
  [name: string]: (this: void, ...args: any[]) => any;
};

interface Person {
  firstName: string;
  lastName: string;
  id: number;
}

const persons: Array<Person> = [
  { firstName: "John", lastName: "Smith", id: 0 },
  { firstName: "Alice", lastName: "Graham", id: 1 },
  { firstName: "Harry", lastName: "Thompson", id: 2 },
];

async function getPerson(id: number): Promise<Person> {
  return persons.find((person) => person.id === id);
}

const server1: EndpointsWithContext = {
  getPerson,
};

const server2 = {
  getPerson,
};

export type Server = typeof server2;

Object.assign(_server, server1);
