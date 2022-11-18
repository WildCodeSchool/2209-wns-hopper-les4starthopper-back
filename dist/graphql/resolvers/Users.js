"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../models/User");
const utils_1 = __importDefault(require("../../utils"));
const argon2_1 = require("argon2");
let UserResolver = class UserResolver {
    async createUser(password, email) {
        const hashedPassword = await (0, argon2_1.hash)(password);
        return await utils_1.default
            .getRepository(User_1.User)
            .save({ email, password: hashedPassword });
    }
    async deleteUser() {
        return await utils_1.default
            .getRepository(User_1.User)
            .createQueryBuilder()
            .delete()
            .from(User_1.User)
            .execute();
    }
    async deleteOneUser(id) {
        return await utils_1.default
            .getRepository(User_1.User)
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
    }
    async updateUser(id, name, city) {
        const UserToUpdate = await utils_1.default
            .getRepository(User_1.User)
            .findOne({ where: { id } });
        if (UserToUpdate === null) {
            return null;
        }
        if (name !== null) {
            UserToUpdate.name = name;
        }
        if (city !== null) {
            UserToUpdate.city = city;
        }
        return await utils_1.default.getRepository(User_1.User).save(UserToUpdate);
    }
    async Users() {
        const wUsers = await utils_1.default
            .getRepository(User_1.User)
            // .find({ relations: ["upvotes", "upvotes.skill"] });
            .find({});
        return wUsers;
    }
    async User(id) {
        return await utils_1.default
            .getRepository(User_1.User)
            // .findOne({ where: { id }, relations: ["upvotes", "upvotes.skill"] });
            .findOne({ where: { id } });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("password")),
    __param(1, (0, type_graphql_1.Arg)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteOneUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("name")),
    __param(2, (0, type_graphql_1.Arg)("city")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Users", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "User", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
// const resolvers = {
//   Query: {
//     findAll: async (): Promise<User[]> => {
//       const data = await dataSource
//         .getRepository(User)
//         .find({ relations: ["upvotes", "upvotes.skill"] });
//       return data;
//     },
//     find: async (_: any, args: { UserId: any }): Promise<User | null> => {
//       const data = await dataSource
//         .getRepository(User)
//         .findOneBy({ id: args.UserId });
//       return data;
//     },
//   },
//   Mutation: {
//     create: async (_: any, args: any) => {
//       const newUser = await dataSource.getRepository(User).save({
//         name: args.name,
//         city: args.city,
//       });
//       return newUser;
//     },
//     deleteOneUser: async (_: any, args: { id: number }) => {
//       const deleteOneUser = await dataSource
//         .getRepository(User)
//         .createQueryBuilder()
//         .delete()
//         .where("id = :id", { id: args.id })
//         .execute();
//       return deleteOneUser;
//     },
//   },
// };
// export default resolvers;
//   Mutation: {
//     addUser: async (
//       _: any,
//       args: { name: String; city: String; skills: [] }
//     ) => {
//       const User = new User({
//         name: args.name,
//         city: args.city,
//         skills: args.skills,
//       });
//       await User.save();
//       return User;
//     },
//     deleteUser: async (_: any, args: { id: String }) => {
//       await User.findByIdAndDelete(args.id);
//       return { id: args.id };
//     },
//     updateUser: async (
//       _: any,
//       args: { id: String; name: String; city: String; skills: [] }
//     ) => {
//       const User = await User.findByIdAndUpdate(
//         args.id,
//         {
//           name: args.name,
//           city: args.city,
//           skills: args.skills,
//         },
//         { new: true }
//       );
//       return User;
//     },
//   },
// };
// module.exports = resolvers;
