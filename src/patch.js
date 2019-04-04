/*
*	 patches过程，需要两个参数：需要打补丁的元素及对应的补丁
*/
import { Element, render, setAttr } from './element';

let allPatches;
let index = 0;

function patch(node, patches) {
	allPatches = patches;
	tranverse(node);
}

function tranverse(node) {
	let current = allPatches[index++];
	let childNodes = node.childNodes;

	childNodes.forEach(child => {
		tranverse(child);
	})

	if (current) {
		doPatch(node, current);
	}
}

function doPatch(node, patches) {
	patches.forEach(patch => {
		switch (patch.type) {
			case 'REMOVE':
				node.parentNode.removeChild(node);
				break;
			case 'TEXT':
				node.textContent = patch.text;
				break;
			case 'ATTR':
				for (let key in patch.attr) {
					let value = patch.attr[key];
					if (value) {
						setAttr(node, key, value);
					} else {	// 属性被移除
						node.removeAttribute(key);
					}
				}
				break;		
			case 'REPLACE':
				let newNode = patch.newNode;
				newNode = (newNode instanceof Element ? render(newNode) : document.createTextNode(newNode));
				node.parentNode.replaceChild(newNode, node);
				break;
		}
	})
}

export default patch;