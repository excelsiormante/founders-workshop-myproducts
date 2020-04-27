
const { Router } = require('express');
const BaseController = require('./BaseController');

class CategoriesController extends BaseController {
  constructor() {
    super();
    const router = Router();
    router.get('/', this.injector('ListCategories'), this.index);
    router.post('/', this.injector('CreateCategory'), this.create);
    router.get('/:uuid', this.injector('ShowCategory'), this.show);
    router.put('/:uuid', this.injector('UpdateCategory'), this.update);
    router.delete('/:uuid', this.injector('DeleteCategory'), this.delete);

    return router;
  }
}

module.exports = CategoriesController;
