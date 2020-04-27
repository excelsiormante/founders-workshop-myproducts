const express = require('express');
const path = require('path');

const { Router } = express;
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');


module.exports = ({
  config, containerMiddleware, loggerMiddleware, errorHandler, swaggerMiddleware, utils,
}) => {
  const router = Router();
  router.use((containerMiddleware));

  /* istanbul ignore if */
  if (config.env === 'development') {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if (config.env !== 'test') {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())
    .use(compression())
    .use('/docs', swaggerMiddleware);


  apiRouter.use('/products', utils.createControllerRoutes('controllers/ProductsController'));
  apiRouter.use('/categories', utils.createControllerRoutes('controllers/CategoriesController'));
  apiRouter.use('/offers', utils.createControllerRoutes('controllers/OffersController'));

  router.use('/api', apiRouter);
  router.use(express.static(path.join(__dirname, './public')));
  router.use(errorHandler);

  return router;
};
