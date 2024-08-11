# Challenge: Automation Workable Alert

## Context

MakerDAO has several jobs which require onchain automation. In interest of decentralisation they have built a Sequencer , in charge of supporting multiple Keeper Networks to work.

Keeper Networks will be required to watch the activeJobs array in the Sequencer and find all instances of available jobs. Helper methods getNextJobs(...) can be used to check a subsection (or everything) of the array all at once. Each job is safe to be executed in parallel.

It is important that the work function succeeds if and only if the workable function returns a valid execution.

### Contracts

Sequencer: https://etherscan.io/address/0x238b4E35dAed6100C6162fAE4510261f88996EC9#code

## Challenge goal

Develop an AWS Lambda function using Typescript which will send a discord alert if any Maker job hasn’t been worked for the past 10 consequent blocks.

## Hint

You will need to make use of at least the following functions from the Sequencer:

numNetworks()
networkAt(uint256 _index)
windows(bytes32 _network)
numJobs()
jobAt(uint256 _index)
Criteria

At Wonderland we strive for excellence in every single thing we do. That’s why while looking at your challenge, besides working correctly, we will also take into account:

Efficiency: Can you reduce those RPC calls? 👀
Best practices: Good error handling, a modular code structure, and overall awesome code.
Tests, tests, and tests: You should at least write unit tests to cover the key functionalities.
Documentation: Does your README explain how to run your project and what it does? Is your code clear and explained?
Deliverables

A GitHub repository containing the developed code, including instructions on how to set up and run the application.

## Expectations

We expect this challenge to take between 10 to 16 hours of work.