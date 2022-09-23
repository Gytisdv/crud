import React, { useContext } from "react";
import DataContext from "./dataContext";

export default function List() {
    const {
        currentTree,
        setCurrentTree,
        treeList,
        setTreeList,
        isEditing,
        setIsEditing,
    } = useContext(DataContext);

    const isActive = (treeToCheck) => {
        return treeToCheck.id === currentTree.id;
    };

    const editTree = (treeToEdit) => {
        setIsEditing(true);
        setCurrentTree(treeToEdit);
    };

    const deleteTree = (treeToDelete) => {
        if (isEditing && treeToDelete.id === currentTree.id)
            return alert("Can't delete tree you're currently editing.")

        const newTreeList = [...treeList].filter(tree => tree.id !== treeToDelete.id);
        setTreeList(newTreeList);
    };

    return (
        <div className="card m-1">
            <h3 className="card-header">Registered Tree List</h3>
            <div className="card-body">
                <ul className="list-group">
                    {treeList.map((tree) => (
                        <li className={`list-group-item ${isActive(tree) ? "active" : ""}`} key={tree.id}>
                            <div className="tree">
                                <div className="tree__content">
                                    <p className="tree__content__type">{tree.type}</p>
                                    <b>/</b>
                                    <p className="tree__content__height">{tree.height} m</p>
                                    <b>/</b>
                                    <p className="tree__content__age">{tree.age} years</p>
                                </div>

                                <div className="tree__buttons">
                                    <button type="button" className={`btn btn-secondary ${isActive(tree) ? "disabled" : ""}`} onClick={() => editTree(tree)}>
                                        Edit
                                    </button>
                                    <button type="button" className={`btn btn-danger ${isActive(tree) ? "disabled" : ""}`} onClick={() => deleteTree(tree)}>
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>                
            </div>

        </div>
    );
}
