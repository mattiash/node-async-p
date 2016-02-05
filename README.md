# promise-async

## parallel

  function job() {
      return new Promise(function(resolve) {
          setTimeout(resolve, 1000)
      })
  }

  async.parallel([job, job, job]).then( function() {
      console.log('All jobs resolved in parallel')
  }).catch( function(err) {
    // At least one job rejected and its reject was called with err
  })

## parallelLimit

    async.parallelLimit([job, job, job],2).then( function() {
        console.log('All jobs resolved, max 2 running at a time')
    }).catch( function(err) {
      // At least one job rejected and its reject was called with err
    })
