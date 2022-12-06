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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesController = void 0;
const common_1 = require("@nestjs/common");
let RoutesController = class RoutesController {
    getAppRoutes(req) {
        const router = req.app._router;
        return {
            routes: router.stack
                .map(layer => {
                var _a, _b;
                if (layer.route) {
                    const path = (_a = layer.route) === null || _a === void 0 ? void 0 : _a.path;
                    const method = (_b = layer.route) === null || _b === void 0 ? void 0 : _b.stack[0].method;
                    return `${method.toUpperCase()} ${path}`;
                }
            })
                .filter(item => item !== undefined)
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoutesController.prototype, "getAppRoutes", null);
RoutesController = __decorate([
    (0, common_1.Controller)('routes')
], RoutesController);
exports.RoutesController = RoutesController;
//# sourceMappingURL=routes.controller.js.map