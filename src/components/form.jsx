import React, { useContext, useState, useEffect } from "react";
import DataContext from "./dataContext";
import { v4 } from "uuid";

const availableTreeTypes = [
    "Oak",
    "Willow",
    "Maple",
    "Yew",
    "Magic",
    "Redwood",
];

export default function Form() {
    const [treeType, setTreeType] = useState(availableTreeTypes[0]);
    const [treeHeight, setTreeHeight] = useState(0);
    const [treeAge, setTreeAge] = useState(0);

    const {
        currentTree,
        setCurrentTree,
        treeList,
        setTreeList,
        isEditing,
        setIsEditing,
    } = useContext(DataContext);

    useEffect(() => {
        setTreeType(currentTree.type ?? availableTreeTypes[0]);
        setTreeHeight(currentTree.height ?? 0);
        setTreeAge(currentTree.age ?? 0);
    }, [currentTree]);

    const isDataValid = () => {
        if (!availableTreeTypes.includes(treeType))
            return false;
        
        if (treeHeight <= 0)
            return false;

        if (treeAge <= 0)
            return false;

        return true;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            if (!isDataValid())
                return alert("Can't edit tree with invalid options.");

            const newTreeList = [...treeList];
            const editableTreeIndex = newTreeList.findIndex(x => x.id === currentTree.id);
            newTreeList[editableTreeIndex].type = treeType;
            newTreeList[editableTreeIndex].height = treeHeight;
            newTreeList[editableTreeIndex].age = treeAge;
            setTreeList(newTreeList);
        } else {
            if (!isDataValid())
                return alert("Can't register tree with invalid options.");
            
            const newTreeList = [...treeList];
            newTreeList.push({ id: v4(), type: treeType, height: treeHeight, age: treeAge });
            console.log(newTreeList);
            setTreeList(newTreeList);
        }

        setIsEditing(false);
        setCurrentTree({});
    };

    return (
        <div className="row">
            <div className="registration-card card m-4 w-50">
                <h2 className="card-header">Tree Registration Form</h2>

                <form className="form card-body" onSubmit={onSubmit}>
                    <div className="list-group">
                        <div className="list-group-item">
                            <label htmlFor="type">Please select tree type:</label>
                            <select className="form-input" name="type" id="type" value={treeType} onChange={(e) => setTreeType(e.target.value)}>
                                {availableTreeTypes.map(treeType => <option value={treeType} key={treeType}>{treeType}</option>)}
                            </select>
                        </div>

                        <div className="list-group-item">
                            <label htmlFor="height">Please write tree's height (m):</label>
                            <input className="form-input" type="number" name="height" id="height" value={treeHeight} onChange={(e) => setTreeHeight(e.target.value)} />
                        </div>

                        <div className="list-group-item">
                            <label htmlFor="age">Please write tree's age (years):</label>
                            <input className="form-input" type="number" name="age" id="age" value={treeAge} onChange={(e) => setTreeAge(e.target.value)} />
                        </div>   
                    </div>
                    <br/>
                    <button className="btn btn-primary" type="submit">{isEditing ? "Edit" : "Submit"}</button>           
                </form>            
            </div>
            <div className="gif-card card m-4"/>            
        </div>
    );
}
