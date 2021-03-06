'use strict'

const test = require('tape')
const async = require('../')
const debug = require('debug')('test')
let result = []
let n = 0

function clear() {
  result.length = 0
  n = 0
}

function job() {
    return new Promise( function(resolve) {
        n=n+1
        let m = n
        debug('start', m)
        result.push(m)
        setTimeout(function() {
          result.push(m)
          debug('done', m)
          resolve()
        }, n*100)
    } )
}


test( 'parallel', function(t) {
    t.plan(1)
    clear()
    async.parallel([job, job, job]).then(function(res) {
        t.deepEqual(result, [1,2,3,1,2,3])
    })
})


test( 'parallelLimit max > jobs.length', function(t) {
    t.plan(1)
    clear()
    async.parallelLimit([job, job, job], 4).then(function(res) {
        t.deepEqual(result, [1,2,3,1,2,3])
    })
})


test( 'parallelLimit max < jobs.length', function(t) {
    t.plan(1)
    clear()
    async.parallelLimit([job, job, job], 2).then(function(res) {
        t.deepEqual(result, [1,2,1,3,2,3])
    })
})

test( 'parallelLimit max = 1', function(t) {
    t.plan(1)
    clear()
    async.parallelLimit([job, job, job], 1).then(function(res) {
        t.deepEqual(result, [1,1,2,2,3,3])
    })
})

test( 'series', function(t) {
    t.plan(1)
    clear()
    async.series([job, job, job]).then(function(res) {
        t.deepEqual(result, [1,1,2,2,3,3])
    })
})
