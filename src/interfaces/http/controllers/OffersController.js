
/* eslint-disable class-methods-use-this */
const { Router } = require('express');
const Status = require('http-status');
const BaseController = require('./BaseController');

class OffersController extends BaseController {
  constructor() {
    super();
    const router = Router();
    router.get('/', this.injector('ListOffers'), this.index);
    router.post('/', this.injector('CreateOffer'), this.create);
    router.get('/:uuid', this.injector('ShowOffer'), this.show);
    router.put('/:uuid', this.injector('UpdateOffer'), this.update);
    router.delete('/:uuid', this.injector('DeleteOffer'), this.delete);

    return router;
  }

  async index(req, res, next) {
    const { operation } = req;
    try {
      const { limit, offset, itemUUID = [] } = req.query;

      const results = await operation.execute({
        limit,
        offset,
        itemUUID: typeof itemUUID === 'string' ? [itemUUID] : itemUUID,
      });
      res.status(Status.OK).json({
        statusCode: Status.OK,
        message: 'success',
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OffersController;
