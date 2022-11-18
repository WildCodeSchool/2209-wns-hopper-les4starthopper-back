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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wilder = void 0;
const typeorm_1 = require("typeorm");
const Upvote_1 = require("./Upvote");
const type_graphql_1 = require("type-graphql");
let Wilder = class Wilder {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", Number)
], Wilder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Wilder.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Wilder.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Upvote_1.Upvote, "wilder"),
    (0, type_graphql_1.Field)(() => [Upvote_1.Upvote], { nullable: true }),
    __metadata("design:type", Array)
], Wilder.prototype, "upvotes", void 0);
Wilder = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Wilder);
exports.Wilder = Wilder;
// interface Wilder extends Document {
//   name: string;
//   city: string;
//   skills: Array<{ name: string; votes: number }>;
//   image: File;
// }
// export interface File {
//   name: string;
//   size: number;
//   type: string;
//   extension: string;
//   content: ArrayBuffer;
// }
// const schema = new Schema<Wilder>({
//   name: { type: String, required: true },
//   city: String,
//   skills: [{ title: String, votes: Number }],
//   image: {
//     name: String,
//     size: Number,
//     type: String,
//     extension: String,
//     content: Buffer,
//   },
// });
// const WilderModel = model<Wilder>("Wilder", schema);
// module.exports = WilderModel;
