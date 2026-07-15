"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.profile = exports.login = exports.register = void 0;
const auth_validation_1 = require("../validations/auth.validation");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const catchAsyncError_1 = __importDefault(require("../utils/catchAsyncError"));
const jwt_1 = require("../utils/jwt");
const AppError_1 = __importDefault(require("../utils/AppError"));
const client_1 = __importDefault(require("../utils/client"));
exports.register = (0, catchAsyncError_1.default)(async (req, res) => {
    const body = auth_validation_1.registerSchema.parse(req.body);
    const user = await auth_service_1.default.register(body.firstName, body.lastName, body.email, body.password);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
    });
});
exports.login = (0, catchAsyncError_1.default)(async (req, res) => {
    const result = auth_validation_1.loginSchema.safeParse(req.body);
    if (!result.success) {
        throw new AppError_1.default(400, result.error.issues[0].message);
    }
    const user = await auth_service_1.default.login(result.data.email, result.data.password);
    const token = (0, jwt_1.generateToken)(user.id);
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
        success: true,
        message: "Login successful",
        data: user,
    });
});
exports.profile = (0, catchAsyncError_1.default)(async (req, res) => {
    const user = await client_1.default.user.findUnique({
        where: {
            id: req.userId,
        },
        select: {
            id: true,
            email: true,
            createdAt: true,
            firstName: true,
            lastName: true,
        },
    });
    res.json({
        success: true,
        data: user,
    });
});
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({
        success: true,
        message: "Logged out",
    });
};
exports.logout = logout;
