import React from 'react';
import ReactDOM from 'react-dom';
import { createElement, render, renderDom } from './element';
import diff from './diff';
import patch from './patch';


class App extends React.Component {
	// constructor(props) {
	// 	super(props);
	// }
	componentDidMount (e) {
		// 创建虚拟DOM 
		let virtualDom = createElement('ul', {class: "list"}, [
			createElement('li', {class: 'item'}, ['周杰伦']),
			createElement('li', {class: 'item'}, ['周传雄']),
			createElement('li', {class: 'item'}, ['周星驰']),
			createElement('li', {class: 'item'}, ['周润发']),
		])

		let el = render(virtualDom);
		let root = document.getElementById('hook');
		renderDom(el, root);
		console.log(el);

		let btn = document.getElementById('btn');
		btn.addEventListener('click', function () {
			let virtualDom2 = createElement('ul', {class: "list"}, [
				createElement('li', {id: "fav"}, ['周星驰']),
				createElement('li', {class: 'item'}, ['周渝民']),
				createElement('ul', {class: 'newNode'}, [
					createElement('li', {class: 'sub'}, ['周星星'])
				]),
			])

			let patches = diff(virtualDom, virtualDom2);

			console.log('patches: ', patches)

			patch(el, patches);
		});
	}
	render () {
		return (
			<div className="wrapper" id="hook"></div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))



