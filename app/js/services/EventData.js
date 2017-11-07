eventsApp.factory('eventData',function($http,$log){
    return{
        getEvent: function(successcb){
            $http({method:'GET',url:'/data/event/1'}).
            success(function(data,status,headers,config){
                successcb(data)
            }).
            error(function(data,status,headers,config){
                $log.warn(data,status,headers(),config);
            });
        }
    };
});

// eventsApp.factory('eventData',function($http){
//     return{
//         getEvent: function(){
//             return $http({method:'GET',url:'/data/event/1'});
//         }
//     };
// });
//eventsApp.factory('eventData', function($resource) {
    //var resource = $resource('/data/event/:id', {id:'@id'}, {"getAll": {method: "GET", isArray: true, params: {something: "foo"}}});
    // return {
    //     getEvent: function() {
    //         // return resource.get({id:eventId});
    //         return $resource('/data/event/:id',{id:'@id'}).get({id:1});
    //     }
        // save: function(event) {
        //     event.id = 999;
        //     return resource.save(event);
        // },
        // getAllEvents: function() {
        //     return resource.query();
        // }
    // };
// });