import './App.css';
import Form from './components/Form';
import Tree from './components/Tree';
import {useEffect, useState} from 'react'
function App() {
  const [tree, setTree] = useState(null);
  console.log(tree);

  return (
    <div className="App">
      <Form setTree={setTree}/>
      <div style={{width:"90%",margin:"auto"}}>
      {tree && <Tree tree={tree}/>}
      </div>
     

    </div>
  );
}

export default App;
