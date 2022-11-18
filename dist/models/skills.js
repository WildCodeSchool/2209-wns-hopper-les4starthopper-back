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
exports.Skill = void 0;
const typeorm_1 = require("typeorm");
// import Upvote from "../controllers/Upvotes";
const Upvote_1 = require("./Upvote");
const type_graphql_1 = require("type-graphql");
let Skill = class Skill {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", Object)
], Skill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Skill.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Upvote_1.Upvote, "skill"),
    (0, type_graphql_1.Field)(() => [Upvote_1.Upvote], { nullable: true }),
    __metadata("design:type", Array)
], Skill.prototype, "upvotes", void 0);
Skill = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Skill);
exports.Skill = Skill;
