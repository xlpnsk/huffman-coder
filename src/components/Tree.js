import { useCallback,useState, useEffect, useMemo } from "react";
import ReactFlow, { addEdge, ConnectionLineType, useNodesState, useEdgesState } from 'react-flow-renderer';
import CircleNode from './CircleNode'
import dagre from 'dagre';

const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      style: {width: '40px', height: '40px', fontSize: '12px', padding: '0'},
      position: { x: 0, y: 0 },
    },
  
    {
      id: '2',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      style: {width: '40px', height: '40px', fontSize: '12px', padding: '0'},
      position: { x: 0, y: 0 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      style: {width: '40px', height: '40px', fontSize: '12px', padding: '0'},
      position: { x: 0, y: 0 },
    },
    // {
    //     id: '4',
    //     type: 'circleNode',
    //     data: { value: 12, input:true, output:true },
    //     position: { x: 0, y: 0 },
    // },
    {
        id: '5',
        data: { label: <div>Default Node</div> },
        style: {width: '40px', height: '40px', fontSize: '12px', padding: '0', borderRadius: '50%'},
        position: { x: 0, y: 0 },
    },
  ];
  
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e2-4', source: '2', target: '5', animated: true },
  ];
function test(){
    const text = 'Katarzyna Kurek'

function getCharFrequency(str){
    const freq = {}
    for(let i=0; i<str.length; i++){
        const char = str[i]
        !freq[char] ? freq[char] = 1 : freq[char]++
    }
    return freq
}

let chars = getCharFrequency(text)

function buildTree(chars){
    const tree = []
    for(let char in chars) {
        const node = {
            'val': chars[char], 
            'char': char,
            'left': null,
            'right': null
        } 
        tree.push(node);
    }
    while(tree.length !== 1){
        let min1 = tree.reduce(function(prev, curr) {
            return prev.val < curr.val ? prev : curr
        })
        tree.splice(tree.indexOf(min1), 1);
        let min2 = tree.reduce(function(prev, curr) {
            return prev.val < curr.val ? prev : curr
        })
        tree.splice(tree.indexOf(min2), 1)

        let node = {
            'val': min1.val + min2.val, 
            'char': '',
            'left': null,
            'right': null
        } 
        node.left = min1
        node.right = min2

        tree.push(node)
    }
    return tree[0]
}

const tree = buildTree(chars)
return tree
}

/*layout*/
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 40;
const nodeHeight = 40;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);
/********/

function destruct(array){
    let res = [];
    array.forEach(element => {
        if(Array.isArray(element)){
            const w = destruct(element)
            res.push(...w)
        }else{
            res.push(element);
        }
    });
    return res;
}

function getEdge(nodes,iter=0,lastCenterId=null){
    let edges = []
    const [left, center, right] = nodes;
    if(lastCenterId){
        edges.push({ id: `e1-${iter}-c-${lastCenterId}`, source: `${lastCenterId}`, target: `${center.id}` })
    }
    if(left !==null){
        if(Array.isArray(left)){
            const leftEdges = getEdge(left, iter+1,center.id);
            edges.push(...leftEdges)
        }
        else{
            edges.push({ id: `e1-${iter}-l`, source: `${center.id}`, target: `${left.id}` })
        }  
    } 

    if(right !==null){
        if(Array.isArray(right)){
            const rightEdges = getEdge(right,iter+1,center.id);
            edges.push(...rightEdges)
        }
        else{
            edges.push({ id: `e1-${iter}-r`, source: `${center.id}`, target: `${right.id}` })
        }
    } 
    
    return edges;
}

function filterSort(array){
    const sorted = array.filter(n => n).sort((aNode, bNode) => {
            const a=aNode.position.y;
            const b=bNode.position.y;
            if (a <= b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
        })
    
    return sorted;
}

function createNode(element,iter=0,position={x: 0, y:25},letter="m"){
    let nodeTab, heightTab;
    if(element.char===''){
        const mainNode = {
            id: `${`${iter+1}-c-${letter}`}`,
            type: 'circleNode',
            data: { value: element.val, input:true, output:true },
            position: position,
        };

        const [leftNode,heightL] = element.left ? createNode(element.left,iter+1,{x: position.x-100+40, y: position.y+100},`${letter}l`) : [null,iter]
        const [rightNode,heightR] = element.right ? createNode(element.right,iter+1,{x: position.x+100-40, y: position.y+100},`${letter}r`) : [null,iter] 
  
        nodeTab = [leftNode,mainNode,rightNode]
        heightTab =[heightL,heightR]
    }
    else{
        const mainNode = {
            id: `${`${iter+1}-n-${letter}`}`,
            // you can also pass a React component as a label
            data: { label: <div style={{height: '100%', width: '100%', lineHeight: '40px',display: 'flex',alignItems: 'center', justifyContent: 'center' }}>{element.val} | "{element.char}"</div> },
            style: {width: '40px', height: '40px', fontSize: '12px', padding: '0'},
            position: position,
        }

        const [leftNode,heightL] = element.left ? createNode(element.left,iter+1,{x: position.x-100+40, y: position.y+100},`${letter}l`) : [null,iter]
        
        const [rightNode,heightR] = element.right ? createNode(element.right,iter+1,{x: position.x+100-40, y: position.y+100},`${letter}r`) : [null,iter]
        
        nodeTab = [leftNode,mainNode,rightNode]
        heightTab =[heightL,heightR]
    }
    const height = (nodeTab[0] == null && nodeTab[2] == null) ? iter+1 : (heightTab[0]<heightTab[1]) ? heightTab[1] : heightTab[0]; 
    return [nodeTab,height]
}

const nodeTypes = {
    circleNode: CircleNode
}

function Tree({ tree }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
    
    useEffect(() => {
        
        const testTree = test();
        const [resultNodes,height] = createNode(testTree);
        
        const readyEdges = getEdge(resultNodes);
        const readyNodes = destruct(resultNodes).filter(n => n).map(node => {
            node.position ={x:0, y:0}
            return node
        })
        console.log('a',readyNodes);
        
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            readyNodes,
            readyEdges,
        );
        console.log(layoutedNodes);
        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
        

    },[tree])
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)),
        []
      );
      const onLayout = useCallback(
        (direction) => {
          const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            nodes,
            edges,
            direction
          );
    
          setNodes([...layoutedNodes]);
          setEdges([...layoutedEdges]);
        },
        [nodes, edges]
      );

    return (
        <ReactFlow 
            nodeTypes={nodeTypes} 
            nodes={nodes} 
            edges={edges} 
            fitView 
            style={{minHeight: '500px'}}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineType={ConnectionLineType.SmoothStep}
    />);

}

export default Tree;

