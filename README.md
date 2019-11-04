# virtualDOM-and-diff
realization of react virtual dom and diff algorithm
The code comes from following reference.

Reference: https://mp.weixin.qq.com/s/3G3VrG5VzOEBU5EcyCK7gg
https://juejin.im/post/5c8e5e4951882545c109ae9c

实测后发现该实现仍然存在一些细节处理和性能的问题，但是对于理解virtual DOM生成及diff算法的基础还是有一定帮助的

let virtualDom = createElement('ul', {class: "list"}, [
	createElement('li', {class: 'item'}, ['周杰伦']),
	createElement('li', {class: 'item'}, ['周传雄']),
	createElement('li', {class: 'item'}, ['周星驰']),
	createElement('li', {class: 'item'}, ['周润发']),
])

let virtualDom2 = createElement('ul', {class: "list"}, [
	createElement('li', {class: 'item', id: "fav"}, ['周星驰']),
	createElement('li', {class: 'item'}, ['周渝民']),
	createElement('ul', {class: 'newNode'}, [
	createElement('li', {class: 'sub'}, ['周星星'])
])

此时patch算法出现了问题~

仔细查看代码发现：
在diff时使用的是先序深度优先遍历，而在patch时使用的是后序深度优先遍历，这样会导致一个问题——比如某个节点被替换了，但是它的子节点在patch时使用后序深度优先遍历仍然会分配一个index，而这在先序深度优先遍历时是不会发生的；故导致了两种遍历方式在diff和patch的时候可能分配到不同的index，从而导致patch出现出乎意料的结果~
