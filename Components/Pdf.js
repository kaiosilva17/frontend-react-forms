import React, { useRef } from 'react'

const Pdf = () => {

    const componentsRef = useRef();
  return (
    <>
    <div ref={componentsRef} style={{width:'100%', height: window.innerHeight}}>
<h1></h1>
    </div>
    </>
  )
}

export default Pdf