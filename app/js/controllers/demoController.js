// 'use strict';

eventsApp.controller('DemoController', function ($scope, $http, getQAService) {
    var new_max;

    //Read questions from file

    $scope.getQuestions = function () {
        $http.get('/api/ping/questions').success(function (data) {
            console.log("Success");
            $scope.questions = data;
        }, function () {
            console.log("Error");
        });
    }

    //Read answers from file

    $http.get('/api/ping/answers').success(function (data) {
        console.log("Success");
        $scope.answers = data;
        console.log(data);
    }, function () {
        console.log("Error");
    })

    $scope.getQuestions();
    //console.log("Service");
    //console.log(getQAService.getQuestion());

    //Find the next ID for the new question to be added

    $scope.MaxId = function () {
        $scope.getQuestions();
        $scope.max = 0;
        for (var i = 1; i < $scope.questions.length; i++) {
            if ($scope.questions[i].id > $scope.max) {
                $scope.max = $scope.questions[i].id;
            }
        }
        console.log($scope.max);
        new_max = $scope.max;
        console.log(new_max + 1);
        new_max += 1;
        return new_max;
    }

    //Adding new question to the file on submit

    $scope.postQuestion = function () {
        $scope.newQuestion = {
            "id": $scope.MaxId(),
            "qname": $scope.new_ques
        }
        alert("Submitted your question successfully");

        $http.get('/api/ping/questions').success(function (data) {
            console.log("Success QP");
            console.log(data);
            $scope.questions = data;
            $scope.questions.push($scope.newQuestion);
            $http.post('/api/ping/questions', $scope.questions).success(function () {
                console.log("POST Question Success");
            }, function () {
                console.log("POST Question Error");
            });
        }, function () {
            console.log("Error QP");
        });
        $scope.new_ques = "";
    };

    //Adding new answer to the file on submit

    $scope.postNewAnswer = function (qid, new_ans) {
        $scope.newAnswer = {
            "id": qid,
            "ans": new_ans,
            "upvote": 20
        }
        alert("Submitted your answer successfully");

        $http.get('/api/ping/answers').success(function (data) {
            console.log("Success AP");
            console.log(data);
            $scope.answers = data;
            $scope.answers.push($scope.newAnswer);
            $http.post('/api/ping/answers', $scope.answers).success(function () {
                console.log("POST Answer Success");
            }, function () {
                console.log("POST Answer Error");
            });
        }, function () {
            console.log("Error AP");
        });

        $scope.new_ans = " ";
    };

    $scope.sortorder = '-upvote';
    $scope.imageUrl = '/img/angularjs-logo.png';
    $scope.altTag = 'nameOfTheImg';

    //Increment vote count of answer on upvote

    $scope.upVoteAnswer = function (session) {

        session.upvote++;
        $http.get('/api/ping/answers').success(function (data) {
            console.log(data);
            $scope.answer = data;
            $scope.updatedAnswer = {
                "id": session.id,
                "ans": session.ans,
                "upvote": session.upvote
            }

            for (i = 0; i < $scope.answer.length; i++) {
                if ($scope.answer[i].ans == session.ans) {
                    $scope.answer[i].upvote = session.upvote;
                    $scope.answer.splice(i, 1, $scope.updatedAnswer);
                    console.log($scope.answer);
                }
            }

            $http.post('/api/ping/answers', $scope.answer).success(function () {
                console.log("POST update Success");
            }, function () {
                console.log("POST Error");
            });
            console.log($scope.answer);

        }, function () {
            console.log();
        });

    };

    //decrement vote count of answer on downvote

    $scope.downVoteAnswer = function (session) {
        session.upvote--;
        $http.get('/api/ping/answer').then(function (data) {
            console.log(data);
            $scope.answer = data;
            $scope.updatedAnswer = {
                "id": session.id,
                "ans": session.ans,
                "upvote": session.upvote
            }

            for (i = 0; i < $scope.answer.length; i++) {
                if ($scope.answer[i].ans == session.ans) {
                    $scope.answer[i].upvote = session.upvote;
                    $scope.answer.splice(i, 1, $scope.updatedAnswer);
                    console.log($scope.answer);
                }
            }

            $http.post('/api/ping/answer', $scope.answer).success(function () {
                console.log("POST update Success");
            }, function () {
                console.log("POST Error");
            });
            console.log($scope.answer);

        }, function () {
            console.log();
        });

    };
}
);
