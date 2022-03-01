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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const fuse_js_1 = __importDefault(require("fuse.js"));
const slugify_1 = __importDefault(require("slugify"));
const paginate_1 = require("../common/pagination/paginate");
const mongoose_2 = require("mongoose");
const constants_1 = require("../common/constants");
const slug_options_1 = require("../common/utils/slug-options");
const options = {
    keys: ['name', 'type.slug'],
    threshold: 0.3,
};
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async create(createCategoryDto) {
        const { name, parent, image } = createCategoryDto;
        const cat = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createCategoryDto), { image: Object.assign(Object.assign({}, image), { _id: new mongoose_1.default.Types.ObjectId(image === null || image === void 0 ? void 0 : image._id) }), slug: (0, slugify_1.default)(name, slug_options_1.slugOptions), created_at: new Date(), updated_at: new Date() });
        const category = new this.categoriesRepository(cat);
        const parentCat = await this.categoriesRepository
            .findById(new mongoose_1.default.Types.ObjectId(parent));
        const catDoc = await category.save();
        catDoc.parent = parentCat;
        if (parent) {
            const parentCat = await this.categoriesRepository
                .findById(new mongoose_1.default.Types.ObjectId(parent));
            parentCat.children.push(category);
            parentCat.save();
        }
        return category.save();
    }
    async getCategories({ limit, page, search, parent }) {
        if (!page)
            page = 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let data = await this.categoriesRepository
            .find({ parent: null })
            .populate('children')
            .populate('image')
            .sort({ created_at: -1 })
            .exec();
        const fuse = new fuse_js_1.default(data, options);
        if (parent === null) {
            data = data.filter((item) => item.parent === null);
        }
        const results = data.slice(startIndex, endIndex);
        const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(data.length, page, limit, results.length, url));
    }
    async getCategory(slug) {
        const category = await this.categoriesRepository
            .findOne({ slug })
            .populate('image')
            .populate('parent')
            .exec();
        return category;
    }
    async update(slug, updateCategoryDto) {
        const categoryDoc = await this.categoriesRepository.findOne({ slug }).exec();
        if ((updateCategoryDto === null || updateCategoryDto === void 0 ? void 0 : updateCategoryDto.parent_id) &&
            (updateCategoryDto === null || updateCategoryDto === void 0 ? void 0 : updateCategoryDto.parent_id) !== categoryDoc.parent_id) {
            const originalParentDoc = await this.categoriesRepository
                .findOne({ id: categoryDoc.parent_id })
                .populate('children')
                .exec();
            originalParentDoc.children.map((cat, i) => {
                if (cat.slug === categoryDoc.slug) {
                    originalParentDoc.children.splice(i);
                }
            });
            originalParentDoc.save();
            const newParentDoc = await this.categoriesRepository.findOne({ id: updateCategoryDto.parent_id }).exec();
            categoryDoc.parent = newParentDoc;
            categoryDoc.parent_id = newParentDoc.id;
            categoryDoc.type_id = updateCategoryDto.type_id;
            categoryDoc.name = updateCategoryDto.name;
            categoryDoc.icon = updateCategoryDto.icon;
            categoryDoc.save();
            newParentDoc.children.push(categoryDoc);
            newParentDoc.save();
            return categoryDoc;
        }
        else {
            return this.categoriesRepository.updateOne({ slug }, Object.assign(Object.assign({}, updateCategoryDto), { image: updateCategoryDto.image ? Object.assign(Object.assign({}, updateCategoryDto.image), { _id: new mongoose_1.default.Types.ObjectId(updateCategoryDto.image._id) }) : undefined, updated_at: Date() })).exec();
        }
    }
    async remove(slug) {
        const categoryDoc = await this.categoriesRepository.findOne({ slug }).exec();
        if (categoryDoc === null || categoryDoc === void 0 ? void 0 : categoryDoc.parent_id) {
            const parentCatDoc = await this.categoriesRepository
                .findOne({ id: categoryDoc.parent_id })
                .populate('children')
                .exec();
            parentCatDoc.children.map((cat, i) => {
                if (cat.slug === categoryDoc.slug) {
                    parentCatDoc.children.splice(i);
                }
            });
            parentCatDoc.save();
        }
        return this.categoriesRepository.deleteOne({ slug }).exec();
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CATEGORY_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map