import React from 'react';
import './TreeNode.css';

export default function TreeNode({ id, name, parentId }) {
    return (
        <div className="tree-node">
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Parent:</strong> {parentId}</p>
        </div>
    );
}