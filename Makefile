test:
	karma start --singleRun=true --browsers Chrome
testci:
	karma start --singleRun=false --autoWatch=true --browsers Chrome
.PHONY: test
