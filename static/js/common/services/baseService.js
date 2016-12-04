angular.module('baseService', [])
  .factory('BaseService', function($http, $q) {
    var service = {
      get: function(url, config) {
        var deferred = $q.defer();
        $http.get(url, config)
          .then(function(jsn){
            var data = jsn.data;
            if (data.success || data.status === 1) {
              deferred.resolve(data);
            } else {
              console.log('wrong message');
            }
            deferred.reject(data);
          },function(data){
            if(config&&(config.myfailure||(config.params&&config.params.myfailure))){
              deferred.resolve(data.status);
              return deferred.promise;
            }else{
              SUGAR.PopOut.alert('<div class="prompt"><h3>请求出错：' + data.status + '</h3></div>');
              $({}).delay(4000).queue(function() {
                SUGAR.PopOut.closeMask();
              });
            }
            deferred.reject('出错了');
          })
          .catch(function(data){            
            console.log(data);
          });
        return deferred.promise;
      },
      post: function(url,config, _cfg) {
        var deferred = $q.defer();
        $http.post(url,config, _cfg)
          .then(function(jsn){
            var data = jsn.data;
        
            if (data.success || data.status === 1) {
              deferred.resolve(data);
            } else {
              console.log('wrong message');
            }
            deferred.reject(data);
          },function(data){
            if(config&&config.myfailure){
              deferred.resolve(data.status);
              return deferred.promise;
            }else{
              SUGAR.PopOut.alert('<div class="prompt"><h3>请求出错：' + data.status + '</h3></div>');
              $({}).delay(4000).queue(function() {
                SUGAR.PopOut.closeMask();
              });
            }
            deferred.reject('出错了');
          })
          .catch(function(data){            
            console.log(data);
          });
        return deferred.promise;
      },
      delete: function(url, config, _cfg) {
        var deferred = $q.defer();
        config = config ? config : {};
        $http.delete(url, config, _cfg)
          .success(function(data) {
            if (data.success || data.status === 1) {
              deferred.resolve(data);
            } else {
              var wrongmsg = JSON.stringify(data.message) || '出错了，但是后端没有返回错误信息';
              SUGAR.PopOut.alert('<div class="prompt"><h3>' + wrongmsg + '</h3></div>');
              $({}).delay(4000).queue(function() {
                SUGAR.PopOut.closeMask();
              });
            }
            deferred.reject(data);
          }).error(function() {
            deferred.reject('出错了');
          });
        return deferred.promise;
      },
      put: function(url, config, _cfg) {
        var deferred = $q.defer();
        config = config ? config : {};
        $http.put(url, config, _cfg)
          .success(function(data) {
            if (data.success || data.status === 1) {
              deferred.resolve(data);
            } else {
              var wrongmsg = JSON.stringify(data.message) || '出错了，但是后端没有返回错误信息';
              SUGAR.PopOut.alert('<div class="prompt"><h3>' + wrongmsg + '</h3></div>');
              $({}).delay(4000).queue(function() {
                SUGAR.PopOut.closeMask();
              });
            }
            deferred.reject(data);
          }).error(function() {
            deferred.reject('出错了');
          });
        return deferred.promise;
      }
    };

    return service;
  })
  .factory(
    "transformRequestAsFormPost",
    function() {
      function transformRequest(data, getHeaders) {
        var headers = getHeaders();
        headers["Content-type"] = "application/x-www-form-urlencoded; charset=utf-8";
        return (serializeData(data));
      }
      return (transformRequest);
      function serializeData(data) {
        if (!angular.isObject(data)) {
          return ((data === null) ? "" : data.toString());
        }
        var buffer = [];
        for (var name in data) {
          if (!data.hasOwnProperty(name)) {
            continue;
          }
          var value = data[name];
          buffer.push(
            encodeURIComponent(name) +
            "=" +
            encodeURIComponent((value === null) ? "" : value)
          );
        }
        var source = buffer
          .join("&")
          .replace(/%20/g, "+");
        return (source);
      }

    }
  );