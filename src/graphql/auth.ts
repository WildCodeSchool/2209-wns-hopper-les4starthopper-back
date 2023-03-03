import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import { User } from "../Entities/User";
import datasource from "../utils";

export interface IContext {
  token: string | null;
  user: User;
}
export const authChecker: AuthChecker<IContext, number> = async (
  { root, args, context, info },
  roles // 1 = ADMIN 2 = USER LAMBDA
) => {
  roles = roles.length === 0 ? [1, 2] : roles;
  const token = context.token;
  if (!token) {
    return false;
  }
  try {
    const decodedToken: { userId: number; userRole: number } = verify(
      token,
      process.env.JWT_SECRET_KEY || "supersecret"
    ) as any;

    const userId = decodedToken.userId;
    const userRole = decodedToken.userRole;

    const user = await datasource
      .getRepository(User)
      .findOneByOrFail({ id: userId });
    if (!user) {
      return false;
    }

    if (roles.includes(user.role)) {
      context.user = user;

      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
