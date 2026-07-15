"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../utils/client"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const register = async (firstName, lastName, email, password) => {
    const existingUser = await client_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        throw new AppError_1.default(409, "Email already exists");
    }
    const passwordhash = await bcrypt_1.default.hash(password, 10);
    const user = await client_1.default.user.create({
        data: {
            firstName,
            lastName,
            email,
            passwordhash,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
        },
    });
    return user;
};
const login = async (email, password) => {
    const user = await client_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new AppError_1.default(401, "Invalid email or password");
    }
    const isMatch = await bcrypt_1.default.compare(password, user.passwordhash);
    if (!isMatch) {
        throw new AppError_1.default(401, "Invalid email or password");
    }
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
    };
};
exports.default = {
    register,
    login,
};
