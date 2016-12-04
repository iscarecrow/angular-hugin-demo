angular.module('homeService', [])
  .factory('HomeService', function(BaseService) {
    var service = {
      home: {
        save: function(params_) {
          return BaseService.post('xxxxxxx', params_).then(function(data_) {
            return data_;
          });
        },
        delete: function(params_) {
          return BaseService.post('xxxxxx', params_).then(function(data_) {
            return data_;
          });
        }
      }
    };
    return service;
  });