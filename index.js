'use strict'

function parallel(jobs) {
    return Promise.all(jobs.map(function(job) { return job() }))
}

function parallelLimit(jobs, max) {
    let n
    let rejected = false

    function runJob(i) {
        if( i < jobs.length ) {
            return jobs[i]().then( function() {
                return runJob(n++)
            } )
        }
        else {
            return Promise.resolve()
        }
    }

    let runners = []
    for(n=0; n<max; n++) {
        runners.push(runJob(n))
    }

    return Promise.all( runners )
}

function series(jobs) {
    return parallelLimit(jobs, 1)
}

module.exports = {
  parallel, parallelLimit, series
}
