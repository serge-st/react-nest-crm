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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const userRole_entity_1 = require("./entities/userRole.entity");
let UsersService = class UsersService {
    constructor(usersRepository, userRolesRepository) {
        this.usersRepository = usersRepository;
        this.userRolesRepository = userRolesRepository;
        const admin = this.userRolesRepository.create({ id: 'admin', description: 'Administrator', forbiddenRoutes: [] });
        const manager = this.userRolesRepository.create({ id: 'manager', description: 'Manager', forbiddenRoutes: ['/users'] });
        this.userRolesRepository.save(admin);
        this.userRolesRepository.save(manager);
    }
    async create(createUserDto) {
        const { username, password, roleId, isEnabled, fullName, email } = createUserDto;
        const [role] = await this.userRolesRepository.find({ where: { id: roleId } });
        const newUser = this.usersRepository.create({
            username,
            password,
            roleId: role,
            isEnabled,
            fullName,
            email,
        });
        try {
            await this.usersRepository.save(newUser);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException(`Username '${username}' already exists`);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
        return newUser;
    }
    async findAll() {
        return await this.usersRepository.find({ loadRelationIds: true });
    }
    async findOne(id) {
        const [user] = await this.usersRepository.find({ loadRelationIds: true, where: { id: id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} was not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const foundUser = await this.findOne(id);
        if (updateUserDto.roleId) {
            const [role] = await this.userRolesRepository.find({ where: { id: updateUserDto.roleId } });
            foundUser.roleId = role;
        }
        const { roleId } = updateUserDto, restUpdatedValues = __rest(updateUserDto, ["roleId"]);
        const updatedUser = Object.assign(Object.assign({}, foundUser), restUpdatedValues);
        this.usersRepository.save(updatedUser);
        return updatedUser;
    }
    async remove(id) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} was not found`);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(userRole_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map