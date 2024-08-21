// ! overwrite jwt types to add custom fields
import "jsonwebtoken";
declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: string;
  }
}
