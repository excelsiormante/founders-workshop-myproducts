/* eslint-disable class-methods-use-this */

const { Router } = require('express');
const multer = require('multer');
const Status = require('http-status');
const path = require('path');

const BaseController = require('./BaseController');

const storage = multer.diskStorage(
  {
    destination: 'src/interfaces/http/public/img/products',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  },
);
const upload = multer({ storage });

class ProductsController extends BaseController {
  constructor() {
    super();
    const router = Router();
    router.get('/', this.injector('ListProducts'), this.index);
    router.post('/', upload.single('image'), this.injector('CreateProduct'), this.create);
    router.get('/:uuid', this.injector('ShowProduct'), this.show);
    router.put('/:uuid', upload.single('image'), this.injector('UpdateProduct'), this.update);
    router.delete('/:uuid', this.injector('DeleteProduct'), this.delete);

    return router;
  }

  async create(req, res, next) {
    const { operation } = req;
    try {
      if (req.file) {
        req.body.image = req.file.filename;
      }
      // parse multipart form array data manually
      if (req.body.categories) {
        const { categories } = req.body;
        req.body.categories = categories.search(',') !== -1 ? categories.split(',') : [categories];
      }

      const result = await operation.execute(req.body);
      res.status(Status.CREATED).json({
        statusCode: Status.CREATED,
        message: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { operation } = req;
    try {
      if (req.file) {
        req.body.image = req.file.filename;
      }
      // parse multipart form array data manually
      if (req.body.categories) {
        const { categories } = req.body;
        req.body.categories = categories.search(',') !== -1 ? categories.split(',') : categories;
      }
      const result = await operation.execute(req.params.uuid, req.body);
      res.status(Status.ACCEPTED).json({
        statusCode: Status.ACCEPTED,
        message: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductsController;
