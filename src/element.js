class Element {
	constructor(type, props, children) {
		this.type = type;
		this.props = props;
		this.children = children;
	}
}

// 创建虚拟DOM
function createElement (type, props, children) {
	return new Element(type, props, children);
}

// render方法可以将虚拟DOM转化成真实DOM
const render = (domObj) => {
	let el = document.createElement(domObj.type);

	for (let key in domObj.props) {
		setAttr(el, key, domObj.props[key])
	}

	domObj.children.forEach(item => {
		item = (item instanceof Element) ? render(item) : document.createTextNode(item)
		el.appendChild(item);
	})

	return el;
}

const setAttr = (node, key, value) => {
	switch(key) {
		case 'value': 
			if (node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea') {
				node.value = value;
			} else {
				node.setAttribute(key, value);
			}
			break;
		case 'style':
			node.style.cssText = value;
			break;
		default:
			node.setAttribute(key, value);
			break;
	}
}

// 将元素插入页面
const renderDom =(el, target) => {
	target.appendChild(el);
}

export { Element, createElement, render, setAttr, renderDom }