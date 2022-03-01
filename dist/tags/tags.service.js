"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsService = void 0;
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const mongoose_1 = __importStar(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const constants_1 = require("../common/constants");
const paginate_1 = require("../common/pagination/paginate");
const slug_options_1 = require("../common/utils/slug-options");
let TagsService = class TagsService {
    constructor(tagsRepository) {
        this.tagsRepository = tagsRepository;
    }
    async create(createTagDto) {
        const { image } = createTagDto;
        const tag = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createTagDto), { image: Object.assign(Object.assign({}, image), { _id: new mongoose_1.default.Types.ObjectId(image === null || image === void 0 ? void 0 : image._id) }), slug: (0, slugify_1.default)(createTagDto.name, slug_options_1.slugOptions), created_at: new Date(), updated_at: new Date() });
        const tagCreated = new this.tagsRepository(tag);
        return await tagCreated.save();
    }
    async findAll({ page, limit }) {
        if (!page)
            page = 1;
        const tags = await this.tagsRepository.find().sort({ created_at: -1 }).exec();
        const url = `/tags?limit=${limit}`;
        return Object.assign({ data: tags }, (0, paginate_1.paginate)(tags.length, page, limit, tags.length, url));
    }
    async findOne(id) {
        return await this.tagsRepository.findOne({ id }).populate('image').exec();
    }
    async update(id, updateTagDto) {
        if (Object.keys(updateTagDto === null || updateTagDto === void 0 ? void 0 : updateTagDto.image).length === 0) {
            updateTagDto.image = undefined;
        }
        return await this.tagsRepository.updateOne({ id }, Object.assign({}, updateTagDto)).exec();
    }
    remove(id) {
        return this.tagsRepository.remove({ id }).exec();
    }
};
TagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TAG_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TagsService);
exports.TagsService = TagsService;
//# sourceMappingURL=tags.service.js.map