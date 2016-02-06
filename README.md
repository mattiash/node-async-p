# promise-async

## job functions

All async-function take an array of jobs as the first parameter. A job is a
function that returns a promise.

    function job() {
        return new Promise(function(resolve) {
            setTimeout(resolve, 1000)
        })
    }

## parallel

Run all jobs in parallel. Returns a promise that resolves when the promises
returned by all jobs have resolved.

    async.parallel([job, job, job]).then( function() {
        console.log('All jobs resolved in parallel')
    }).catch( function(err) {
        // At least one job rejected and its reject was called with err
    })

parallel is the same as Promise.all()

## parallelLimit

Run jobs in parallel with a limit on how many jobs can run in parallel. Returns
a promise that resolves when the promises returned by all jobs have resolved.

    async.parallelLimit([job, job, job],2).then( function() {
        console.log('All jobs resolved, max 2 running at a time')
    }).catch( function(err) {
        // At least one job rejected and its reject was called with err
    })

## series

Run jobs in series. Equal to parallelLimit(jobs, 1). Returns a promise that
resolves when the promises returned by all jobs have resolved.

    async.series([job, job, job])
