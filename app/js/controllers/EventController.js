'use strict';

eventsApp.controller('EventController', function EventController($scope, $http) {
    $scope.sortorder = '-upvote';
    $scope.events = function(){
        return $http.post('/app/data/event',{
            filename:1,
        }).then(function(response){
            $scope.resp = response.data;
        },function(response){
            //log
        });
    }

    $scope.event = {
        // name : 'Akshatha',
        // location : {
        //     houseName : 'The Villa',
        //     houseNo : 100
        // },
        imageUrl: '/img/angularjs-logo.png',
        altTag: 'nameOfTheImg',

        questions: [
            {
                //id:1,
                qname: 'What is HTML',
                answers: [
                    {
                        ans: 'HTML refers to Hyper Text Markup Language',
                        upvote: 10
                    },
                    {
                        ans: 'It is  a standardized system for tagging text files to achieve font, colour, graphic, and hyperlink effects on World Wide Web pages.',
                        upvote: 5
                    }
                ]
            },
            {
                // id:2,
                qname: 'What is CSS',
                answers: [
                    {
                        ans: 'CSS refers to Cascading Style Sheet',
                        upvote: 20
                    },
                    {
                        ans: 'CSS is the language for describing the presentation of Web pages, including colors, layout, and fonts.',
                        upvote: 15
                    }
                ]
            }
        ]
    };
    $scope.getEvent = function () {
        // $http({
        //     method: "GET",
        //     url: "/api/ping"
        // }).then(function mySuccess(response) {
        //     $scope.message = response.data.records;
        //     //$scope.name=name;
        // }, function myError(response) {
        //     $scope.message = response.statusText;
        // });
        $http.get('/api/ping/5').then(function (response) {
            $scope.message = response.data;
        }, function (response) {
            $scope.message = response.statusText;
        })
    };
    // $scope.submitform = function (answer) {
    //     //alert('Form submitted');
    //     answer.push({
    //         ans: this.Object.ans,
    //         upvote: 10
    //     })
    //     this.Object.ans = "";
    //     //this.newans.upvote = "";
    //     alert('Form submitted');
    // };

    $scope.upVoteAnswer = function (answer) {
        answer.upvote++;
    };
    $scope.downVoteAnswer = function (answer) {
        answer.upvote--;
    };
}
);
