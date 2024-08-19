import "dotenv/config";
import { testUserParsed } from "@/data/parsed";
import env from "./env";

console.log(testUserParsed.name);
console.log(env.test);
