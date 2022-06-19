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
      {tree && <Tree tree={tree}/>}

    </div>
  );
}

export default App;
