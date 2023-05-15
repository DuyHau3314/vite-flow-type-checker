import { forwardRef } from 'react';

const ComponentToPrint = forwardRef(( props, ref ) => {
  return (
  <div ref={ref}>
    <p><img src={`data:image/png;base64,${props.labelBase64Content}`} style={{ maxWidth: '400px' }} /></p>
  </div>
)});

export default ComponentToPrint;