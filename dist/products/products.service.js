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
exports.ProductsService = void 0;
const constants_1 = require("./../common/constants");
const uuid_1 = require("uuid");
const slugify_1 = __importDefault(require("slugify"));
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("@nestjs/common");
const paginate_1 = require("../common/pagination/paginate");
const fuse_js_1 = __importDefault(require("fuse.js"));
const mongoose_2 = require("mongoose");
const constants_2 = require("../common/constants");
const slug_options_1 = require("../common/utils/slug-options");
const category_entity_1 = require("../categories/entities/category.entity");
const tag_entity_1 = require("../tags/entities/tag.entity");
const options = {
    keys: ['name', , 'categories.slug', 'status', 'shop_id'],
    threshold: 0.3,
};
let ProductsService = class ProductsService {
    constructor(productModel, categoryModel, tagModel) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
        this.tagModel = tagModel;
    }
    async create(createProductDto) {
        const { name, categories, tags, image } = createProductDto;
        const prod = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createProductDto), { image: Object.assign(Object.assign({}, image), { _id: new mongoose_1.default.Types.ObjectId(image._id) }), slug: (0, slugify_1.default)(name, slug_options_1.slugOptions), created_at: new Date(), updated_at: new Date() });
        const product = new this.productModel(prod);
        const prodDoc = await product.save();
        for (const _id of categories) {
            const category = await this.categoryModel.findById(new mongoose_1.default.Types.ObjectId(_id));
            category.products.push(product);
            await category.save();
            prodDoc.categories.push(category);
        }
        if (tags) {
            for (const _id of tags) {
                const tag = await this.tagModel.findById(new mongoose_1.default.Types.ObjectId(_id));
                tag.products.push(product);
                await tag.save();
                prodDoc.tags.push(tag);
            }
        }
        return prodDoc.save();
    }
    async getProducts({ limit, page, search }) {
        var _a;
        if (!page)
            page = 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let data = await this.productModel.find()
            .populate('tags')
            .populate('categories')
            .populate('image')
            .sort({ created_at: -1 })
            .exec();
        const fuse = new fuse_js_1.default(data, options);
        if (search) {
            const parseSearchParams = search.split(';');
            if ((parseSearchParams === null || parseSearchParams === void 0 ? void 0 : parseSearchParams.length) > 1) {
                for (const searchParam of parseSearchParams) {
                    const [key, value] = searchParam.split(':');
                    data = (_a = fuse.search(value)) === null || _a === void 0 ? void 0 : _a.map(({ item }) => item);
                }
            }
        }
        const results = data.slice(startIndex, endIndex);
        const url = `/products?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(data.length, page, limit, results.length, url));
    }
    async getProductBySlug(slug) {
        const products = await this.productModel
            .find()
            .populate('tags')
            .populate('categories')
            .populate('image')
            .exec();
        const product = products.find((p) => (p === null || p === void 0 ? void 0 : p.slug) === slug);
        const related_products = products
            .filter((p) => { var _a, _b; return ((_a = p === null || p === void 0 ? void 0 : p.type) === null || _a === void 0 ? void 0 : _a.slug) === ((_b = product === null || product === void 0 ? void 0 : product.type) === null || _b === void 0 ? void 0 : _b.slug); })
            .slice(0, 20);
        return Object.assign(Object.assign({}, product), { related_products });
    }
    async getPopularProducts({ shop_id, limit }) {
        return await this.productModel
            .find()
            .populate('image')
            .limit(limit)
            .exec();
    }
    async getFeaturedProducts({ limit }) {
        return await this.productModel
            .find({ is_featured: true })
            .populate('image')
            .limit(limit)
            .exec();
    }
    async update(id, updateProductDto) {
        return this.productModel.updateOne({ slug: id }, Object.assign(Object.assign({}, updateProductDto), { image: (updateProductDto === null || updateProductDto === void 0 ? void 0 : updateProductDto.image) ? Object.assign(Object.assign({}, updateProductDto === null || updateProductDto === void 0 ? void 0 : updateProductDto.image), { _id: new mongoose_1.default.Types.ObjectId(updateProductDto.image._id) }) : undefined, updated_at: Date() })).exec();
    }
    async remove(id) {
        return this.productModel.deleteOne({ id }).exec();
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_2.PRODUCT_MODEL)),
    __param(1, (0, common_1.Inject)(constants_1.CATEGORY_MODEL)),
    __param(2, (0, common_1.Inject)(constants_1.TAG_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map