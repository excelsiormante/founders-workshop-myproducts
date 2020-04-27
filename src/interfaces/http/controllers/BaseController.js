/* eslint-disable class-methods-use-this */
const Status = require('http-status');

class BaseController {
  constructor() {
    // dynamically inject operation based on operation request parameter
    this.injector = (operation) => (req, res, next) => {
      req.operation = req.container.resolve(operation);
      next();
    };
  }


  async index(req, res, next) {
    const { operation } = req;
    try {
      const { limit, offset, order = [] } = req.query;

      const results = await operation.execute({
        limit,
        offset,
        order: typeof order === 'string' ? [order] : order,
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

  async show(req, res, next) {
    const { operation } = req;

    try {
      const result = await operation.execute(req.params.uuid);
      res.status(Status.OK).json({
        statusCode: Status.OK,
        message: 'success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    const { operation } = req;
    try {
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

  async delete(req, res, next) {
    const { operation } = req;

    try {
      await operation.execute(req.params.uuid);
      res.status(Status.ACCEPTED).json({
        statusCode: Status.ACCEPTED,
        message: 'accepted',
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BaseController;
