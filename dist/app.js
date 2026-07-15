"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const reply_routes_1 = __importDefault(require("./routes/reply.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://bunnyscript-frontend.vercel.app/"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/posts", post_routes_1.default);
app.use("/api/comments", comment_routes_1.default);
app.use("/api/replies", reply_routes_1.default);
app.use("/api/likes", like_routes_1.default);
// Global Error Handler
app.use(error_middleware_1.default);
exports.default = app;
