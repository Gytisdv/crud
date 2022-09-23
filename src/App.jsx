import "./App.scss";
import { useState, useEffect } from "react";
import Form from "./components/form";
import List from "./components/list";
import Context from "./components/dataContext";

let isInitialized = false;

export default function App() {
  const localStorageKey = "trees";

  const [currentTree, setCurrentTree] = useState({});
  const [treeList, setTreeList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const savedTreeList = localStorage.getItem(localStorageKey);
      if (savedTreeList?.length > 0) {
        setTreeList(JSON.parse(savedTreeList));
      }
      isInitialized = true;
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify(treeList));
    }
  }, [treeList]);

  return (
    <Context.Provider value={{ 
      currentTree,
      setCurrentTree,
      treeList,
      setTreeList,
      isEditing,
      setIsEditing,
    }}>
      <main className="container">
        <Form />
        <List />
      </main>
    </Context.Provider>
  );
}