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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const package_json_1 = __importDefault(require("../package.json"));
const char_1 = __importDefault(require("./char"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Success',
        status: {
            code: 200,
            text: 'OK',
        },
        characterAiStatus: {
            isAuthenticated: char_1.default.isAuthenticated(),
            type: package_json_1.default.dependencies.node_characterai.startsWith('github:') ||
                package_json_1.default.dependencies.node_characterai.startsWith('https://')
                ? 'GitHub'
                : 'Package',
            version: package_json_1.default.dependencies.node_characterai,
        },
        moduleStatus: {
            express: {
                ver: `${package_json_1.default.dependencies.express}`,
                status: 'HEALTHY',
            },
            cors: {
                ver: `${package_json_1.default.dependencies.cors}`,
            },
        },
    });
});
app.post('/send-message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const characterId = process.env.CHARACTER_ID;
        const chat = yield char_1.default.createOrContinueChat(characterId);
        const response = yield chat.sendAndAwaitResponse(message, true);
        res.json({
            message: 'Success',
            status: {
                code: 200,
                message: 'OK',
            },
            sent: message,
            ai: {
                src: response.src,
                response: response.text,
            },
        });
    }
    catch (error) {
        console.error('Error', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}));
exports.default = app;
//# sourceMappingURL=app.js.map