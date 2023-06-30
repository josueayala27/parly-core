"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.listen(3000, () => {
    console.log('Hola');
});
const hey = { hey: 'Qué tal estás?' };
console.log(typeof a);
console.log(hey);
app.get('/', (req, res) => {
    res.send('¡Hola, Express con TypeScript!');
});
//# sourceMappingURL=index.js.map