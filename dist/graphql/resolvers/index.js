"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wilders_1 = require("../../models/wilders");
const utils_1 = __importDefault(require("../../utils"));
const resolvers = {
    Query: {
        findAll: async () => {
            const data = await utils_1.default
                .getRepository(wilders_1.Wilder)
                .find({ relations: ["upvotes", "upvotes.skill"] });
            return data;
        },
        find: async (_, args) => {
            const data = await utils_1.default
                .getRepository(wilders_1.Wilder)
                .findOneBy({ id: args.wilderId });
            return data;
        },
    },
    Mutation: {
        create: async (_, args) => {
            const newWilder = await utils_1.default.getRepository(wilders_1.Wilder).save({
                name: args.name,
                city: args.city,
            });
            return newWilder;
        },
        deleteOneWilder: async (_, args) => {
            const deleteOneWilder = await utils_1.default
                .getRepository(wilders_1.Wilder)
                .createQueryBuilder()
                .delete()
                .where("id = :id", { id: args.id })
                .execute();
            return deleteOneWilder;
        },
    },
};
exports.default = resolvers;
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
