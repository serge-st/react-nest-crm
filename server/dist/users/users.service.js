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
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const passwordHasher_1 = require("./helpers/passwordHasher");
const roles_service_1 = require("../roles/roles.service");
const db_error_code_enum_1 = require("../db-error-code.enum");
let UsersService = class UsersService {
    constructor(usersRepository, configService, rolesService) {
        this.usersRepository = usersRepository;
        this.configService = configService;
        this.rolesService = rolesService;
        const prefil = async () => {
            const testUser = await this.usersRepository.findOne({ where: { username: 'admin' } });
            if (!testUser) {
                const role = await this.rolesService.findOne('admin');
                const password = await (0, passwordHasher_1.default)(4, 'Testing1');
                const admin = this.usersRepository.create({ username: 'admin', password, role });
                await this.usersRepository.save(admin);
            }
        };
        prefil();
    }
    async create(createUserDto) {
        const { username, password, role: roleId, isEnabled, fullName, email } = createUserDto;
        const hashedPassword = await (0, passwordHasher_1.default)(+this.configService.get('BCRYPT_SALT_ROUNDS'), password);
        const role = await this.rolesService.findOne(roleId);
        const newUser = this.usersRepository.create({
            password: hashedPassword,
            role,
            username,
            isEnabled,
            fullName,
            email,
        });
        try {
            await this.usersRepository.save(newUser);
        }
        catch (error) {
            if (error.code === db_error_code_enum_1.DbErrorCode.duplicateName) {
                throw new common_1.ConflictException(`Username '${username}' already exists`);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
        return newUser;
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findById(id) {
        const [user] = await this.usersRepository.find({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} was not found`);
        }
        return user;
    }
    async findByUsername(username) {
        const [user] = await this.usersRepository.find({ where: { username } });
        return user;
    }
    async update(id, updateUserDto) {
        const foundUser = await this.findById(id);
        if (updateUserDto.role) {
            const role = await this.rolesService.findOne(updateUserDto.role);
            foundUser.role = role;
        }
        const { role: roleId } = updateUserDto, restUpdatedValues = __rest(updateUserDto, ["role"]);
        const updatedUser = this.usersRepository.create(Object.assign(Object.assign({}, foundUser), restUpdatedValues));
        await this.usersRepository.save(updatedUser);
        return updatedUser;
    }
    async updatePassword(id, updateUserPasswordDto) {
        const foundUser = await this.findById(id);
        const { password } = updateUserPasswordDto;
        const hashedPassword = await (0, passwordHasher_1.default)(+this.configService.get('BCRYPT_SALT_ROUNDS'), password);
        const updatedUser = this.usersRepository.create(Object.assign(Object.assign({}, foundUser), { password: hashedPassword }));
        await this.usersRepository.save(updatedUser);
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        roles_service_1.RolesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map