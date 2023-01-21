"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 5, from = 0 } = req.query;
    const users = yield User_1.default.findAll({
        limit: +limit,
        offset: +from,
        where: { status: 1 }
    });
    res.json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.default.findByPk(id);
    if (!user) {
        res.status(400).json({
            msg: `There is not exist an user with the ID ${id}`
        });
        return;
    }
    ;
    res.json(user);
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existEmail = yield User_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existEmail) {
            return res.status(400).json({
                msg: `There is a user with email ${body.email}`
            });
        }
        ;
        const user = User_1.default.build(body);
        yield user.save();
        res.json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Report to the administrator"
        });
    }
    ;
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield User_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `There is not an user with ID ${id} `
            });
        }
        ;
        yield user.update(body);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Report to the administrator"
        });
    }
    ;
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: `There is not an user with ID ${id}`
        });
    }
    ;
    yield (user === null || user === void 0 ? void 0 : user.update({ status: false }));
    // await user?.destroy();
    res.json(user);
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map