"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutesService = void 0;
const common_1 = require("@nestjs/common");
let AppRoutesService = class AppRoutesService {
    getAppRouters(req) {
        const router = req.app._router;
        return router.stack
            .map(layer => {
            var _a, _b;
            if (layer.route) {
                const path = (_a = layer.route) === null || _a === void 0 ? void 0 : _a.path;
                const method = (_b = layer.route) === null || _b === void 0 ? void 0 : _b.stack[0].method;
                return `${method.toUpperCase()} ${path}`;
            }
        })
            .filter(item => !!item);
    }
};
AppRoutesService = __decorate([
    (0, common_1.Injectable)()
], AppRoutesService);
exports.AppRoutesService = AppRoutesService;
//# sourceMappingURL=approutes.service.js.map