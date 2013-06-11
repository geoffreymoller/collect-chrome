test:
	karma start --singleRun=true --browsers PhantomJS
testci:
	karma start --singleRun=false --autoWatch=true --browsers PhantomJS
.PHONY: test
