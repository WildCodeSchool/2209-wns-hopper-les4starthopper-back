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
exports.WilderResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Wilder_1 = require("../../models/Wilder");
const utils_1 = __importDefault(require("../../utils"));
let WilderResolver = class WilderResolver {
    async createWilder(name, city) {
        return await utils_1.default.getRepository(Wilder_1.Wilder).save({ name, city });
    }
    async deleteWilder() {
        return await utils_1.default
            .getRepository(Wilder_1.Wilder)
            .createQueryBuilder()
            .delete()
            .from(Wilder_1.Wilder)
            .execute();
    }
    async deleteOneWilder(id) {
        return await utils_1.default
            .getRepository(Wilder_1.Wilder)
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
    }
    async updateWilder(id, name, city) {
        const wilderToUpdate = await utils_1.default
            .getRepository(Wilder_1.Wilder)
            .findOne({ where: { id } });
        if (wilderToUpdate === null) {
            return null;
        }
        if (name !== null) {
            wilderToUpdate.name = name;
        }
        if (city !== null) {
            wilderToUpdate.city = city;
        }
        return await utils_1.default.getRepository(Wilder_1.Wilder).save(wilderToUpdate);
    }
    async wilders() {
        const wwilders = await utils_1.default
            .getRepository(Wilder_1.Wilder)
            .find({ relations: ["upvotes", "upvotes.skill"] });
        return wwilders;
    }
    async wilder(id) {
        return await utils_1.default
            .getRepository(Wilder_1.Wilder)
            .findOne({ where: { id }, relations: ["upvotes", "upvotes.skill"] });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Wilder_1.Wilder),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("city")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WilderResolver.prototype, "createWilder", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Wilder_1.Wilder),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WilderResolver.prototype, "deleteWilder", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Wilder_1.Wilder),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WilderResolver.prototype, "deleteOneWilder", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Wilder_1.Wilder),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("name")),
    __param(2, (0, type_graphql_1.Arg)("city")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], WilderResolver.prototype, "updateWilder", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Wilder_1.Wilder], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WilderResolver.prototype, "wilders", null);
__decorate([
    (0, type_graphql_1.Query)(() => Wilder_1.Wilder, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WilderResolver.prototype, "wilder", null);
WilderResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], WilderResolver);
exports.WilderResolver = WilderResolver;
// const resolvers = {
//   Query: {
//     findAll: async (): Promise<Wilder[]> => {
//       const data = await dataSource
//         .getRepository(Wilder)
//         .find({ relations: ["upvotes", "upvotes.skill"] });
//       return data;
//     },
//     find: async (_: any, args: { wilderId: any }): Promise<Wilder | null> => {
//       const data = await dataSource
//         .getRepository(Wilder)
//         .findOneBy({ id: args.wilderId });
//       return data;
//     },
//   },
//   Mutation: {
//     create: async (_: any, args: any) => {
//       const newWilder = await dataSource.getRepository(Wilder).save({
//         name: args.name,
//         city: args.city,
//       });
//       return newWilder;
//     },
//     deleteOneWilder: async (_: any, args: { id: number }) => {
//       const deleteOneWilder = await dataSource
//         .getRepository(Wilder)
//         .createQueryBuilder()
//         .delete()
//         .where("id = :id", { id: args.id })
//         .execute();
//       return deleteOneWilder;
//     },
//   },
// };
// export default resolvers;
//   Mutation: {
//     addWilder: async (
//       _: any,
//       args: { name: String; city: String; skills: [] }
//     ) => {
//       const wilder = new Wilder({
//         name: args.name,
//         city: args.city,
//         skills: args.skills,
//       });
//       await wilder.save();
//       return wilder;
//     },
//     deleteWilder: async (_: any, args: { id: String }) => {
//       await Wilder.findByIdAndDelete(args.id);
//       return { id: args.id };
//     },
//     updateWilder: async (
//       _: any,
//       args: { id: String; name: String; city: String; skills: [] }
//     ) => {
//       const wilder = await Wilder.findByIdAndUpdate(
//         args.id,
//         {
//           name: args.name,
//           city: args.city,
//           skills: args.skills,
//         },
//         { new: true }
//       );
//       return wilder;
//     },
//   },
// };
// module.exports = resolvers;
