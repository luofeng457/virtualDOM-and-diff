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

// 后续深度优先遍历
function tranverse(node) {
	let current = allPatches[index++];
	let childNodes = node.childNodes;
	console.debug('tranverse: ', JSON.stringify(current) + ' ' + (index-1) + ' nodeType: ' + node.nodeType + ' nodeName: ' + node.nodeName + ' TextContent: ' + node.textContent)
	
	if (current) {
		console.debug('current: ', current)
		doPatch(node, current);
	}

	if (current && current[0].type == 'REPLACE') {
		childNodes = [];
	}

	childNodes.forEach(child => {
		tranverse(child);
	})


	// if (index == 7) {
	// 	console.debug('patch.js index=6: ', node, current)
	// }
}

function doPatch(node, patches) {
	console.debug('doPatch: ', node, patches)
	patches.forEach(patch => {
		switch (patch.type) {
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
			case 'TEXT':
				node.textContent = patch.text;
				break;
			case 'REPLACE':
				let newNode = patch.newNode;
				newNode = (newNode instanceof Element ? render(newNode) : document.createTextNode(newNode));
				node.parentNode.replaceChild(newNode, node);
				console.debug('replace: ', JSON.stringify(patch))
				break;
			case 'REMOVE':
				console.debug('remove: ', JSON.stringify(patch))
				console.debug('remove node: ', node)
				node.parentNode.removeChild(node);
				break;
		}
	})
}

export default patch;