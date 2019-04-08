// DOM-diff: 给定任意两棵树(两个virtualDOM树)，采用先序深度优先遍历的算法找到最少的转换步骤
// 根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新DOM
function diff(oldTree, newTree) {
	let patches = {};

	let index = 0;	// 第一次比较应该是树的第0个索引
	// 递归树
	walk(oldTree, newTree, index, patches);

	return patches;
}

function walk(oldNode, newNode, index, patches) {
	// 每个元素都有一个补丁
	let current = [];

	console.log('index: ', index + '->' + JSON.stringify(oldNode) + '->' + JSON.stringify(newNode))

	if (!newNode) {
		// 节点被删除 
		console.debug('walk !newNode: ', oldNode);
		current.push({type: 'REMOVE', index});
	} else if (isString(oldNode) && isString(newNode)) {
		// 文本节点
		if (oldNode !== newNode) {
			console.debug('walk textNode: ', oldNode + '->' + newNode);
			current.push({type: 'TEXT', text: newNode});
		}
	} else if (oldNode.type === newNode.type) {
		// 比较节点属性是否更改
		let attr = diffAttr(oldNode.props, newNode.props);
		if (Object.keys(attr).length > 0) {
			console.debug('walk !attr: ', attr);
			current.push({type: 'ATTR', attr});
		}
		// 先序深度优先遍历子节点
		diffChildren(oldNode.children, newNode.children, patches);
	} else {
		// 节点替换
		current.push({type: 'REPLACE', newNode});
		console.debug('walk replace: ', newNode);
	}

	if (current.length) {
		patches[index] = current;
	}
	if (index == 6) {
		console.debug('index=6: ', oldNode, newNode)
	}
}

function isString(node) {
	return typeof node === 'string';
}

function diffAttr(oldAttrs, newAttrs) {
	let patch = {}

	for (let key in oldAttrs) {
		if (oldAttrs[key] !== newAttrs[key]) {
			patch[key] = newAttrs[key];
		}
	}
	// 新增属性
	for (let key in newAttrs) {
		if (!oldAttrs.hasOwnProperty(key)) {
		// if (!oldAttrs[key]) {
			patch[key] = newAttrs[key];
		}
	}

	return patch;
}

let num = 0;

function diffChildren (oldChildren, newChildren, patches) {
	console.debug('diffChildren: ', oldChildren + '-->' + newChildren);
	oldChildren.forEach((child, index) => {
		walk(child, newChildren[index], ++num, patches);
	}) 
}

export default diff;