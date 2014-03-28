exports.testSomething = function(test){
    test.expect(1);
    test.ok(true, "this assertion deberia pasar in plaza mayor");
    test.done();
};

exports.testSomethingElse = function(test){
    test.ok(false, "this assertion should fail");
    test.done();
};