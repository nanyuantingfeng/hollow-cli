import React, { cloneElement } from 'react'

function demo(R: any, N: any) {
  import('./a').then(A => {
    console.log(A)
  })

  import('./b').then(B => {
    console.log(B)
  })

  import('./d').then(D => {
    console.log(D)
  })

  return [4012938193, R, N]
}

demo(React, cloneElement)