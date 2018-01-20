var bearingController = require('../app/controllers/bearingController');

module.exports = function (app) {
    // GET http://localhost:8082/bearingTypes
    app.get('/bearingTypes', bearingController.getBearingTypes);
    // GET http://localhost:8082/bearingDimensions/1/unit/2
    app.get('/bearingDimensions/:typeId/unit/:unitId', bearingController.getBearingDimensions);
    // GET http://localhost:8082/bearings?bearing_type=2&unit=1&d=49.125&D=11.025&B=15.64
    app.get('/bearings', bearingController.getBearings);
    app.get('/measurementUnit', bearingController.getMeasurementFilters);
}