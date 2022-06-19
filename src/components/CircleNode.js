import { useCallback, memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';


export default memo(({ data }) => {
   
  return (
    <div style={{background: '#ffffff', border: '1px solid black', width: '40px', height: '40px', borderRadius: '50%', position:'relative'}}>
      <Handle type="target" position={Position.Top} style={{display: !data.input && 'none'}}/>
      <div style={{position: 'absolute', width: '100%', height: '100%', top: '0', left: '0',lineHeight: '40px'}}>
        {data.value}
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" style={{display: !data.output && 'none'}}/>
    </div>
  );
});
