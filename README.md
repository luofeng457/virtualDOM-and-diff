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
