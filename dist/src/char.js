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
exports.authenticateCharacter = void 0;
const node_characterai_1 = __importDefault(require("node_characterai"));
const characterAI = new node_characterai_1.default();
characterAI.requester.puppeteerPath =
    process.env.NODE_ENV === 'production'
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : characterAI.requester.puppeteerPath;
function authenticateCharacter() {
    return __awaiter(this, void 0, void 0, function* () {
        yield characterAI.authenticateWithToken(process.env.SESSION_TOKEN);
    });
}
exports.authenticateCharacter = authenticateCharacter;
exports.default = characterAI;
//# sourceMappingURL=char.js.map