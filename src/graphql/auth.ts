import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import { User } from "../Entities/User";
import datasource from "../utils";

export interface IContext {
  token: string | null;
  user: User;
}
export const authChecker: AuthChecker<IContext> = async (
  { root, args, context, info },
  roles
) => {
  const token = context.token;
  console.log("🚀 ~ file: auth.ts:15 ~ token:", token)
  if (!token) {
    return false;
  }
  try {
    const decodedToken: { userId: number } = verify(
      token,
      process.env.JWT_SECRET_KEY || "supersecret"
    ) as any;
    const userId = decodedToken.userId;

    const user = await datasource
      .getRepository(User)
      .findOne({ where: { id: userId } });
    if (!user) {
      return false;
    }
    context.user = user;
    return true;
  } catch {
    return false;
  }
};
