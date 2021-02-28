let componentsArray = []
const findEl = selector => document.querySelector(selector);
class Detail {
    #name = 'default'
    #price = 100;
    #amount = 1;
    get _name() {return this.#name}
    get _price() {return this.#price}
    get _amount() {return this.#amount}
    name(n) {if (n !== ' ') return this.#name = n}
    price(p) {if (p > 0) return this.#price = p}
    amount(a) {
        if (a > 0) return this.#amount = a
    }
    constructor(name, price, amount) {
        if (name !== ' ' && price > 0 && amount > 0) {
            this.#name = name
            this.#price = price
            this.#amount = amount
        }
    }
}
class Mechanism extends Detail {
    #color = "black";
    #typePriority = 1
    #_name = super._name
    #_price = super._price
    #_amount = super._amount
    constructor(name, price, amount, color) {
        super();
        this.#_name = super.name(name)
        this.#_price = super.price(price)
        this.#_amount = super.amount(amount)
        this.#color = color
    }
    showInfo() {
        componentsArray.push({
            name: this._name,
            type: 'Механизм',
            price: this._price,
            amount: this._amount,
            param3: this.#color,
            typePriority: this.#typePriority
        })
        window.localStorage.setItem('Arr', JSON.stringify(componentsArray))
        console.log(componentsArray)
    }
}
class Body extends Detail {
    #weight = 1000;
    #typePriority = 2
    #_name = super._name
    #_price = super._price
    #_amount = super._amount

    constructor(name, price, amount, weight) {
        super();
        this.#_name = super.name(name)
        this.#_price = super.price(price)
        this.#_amount = super.amount(amount)
        this.#weight = weight
        }
    showInfo() {
        componentsArray.push({
            name: this._name,
            type: 'Корпус',
            price: this._price,
            amount: this._amount,
            param3: this.#weight,
            typePriority: this.#typePriority

        })
        window.localStorage.setItem('Arr', JSON.stringify(componentsArray))
        console.log(componentsArray)
    }
}
class Node extends Detail {
    #thickness = 1000;
    #typePriority = 3
    #_name = super._name
    #_price = super._price
    #_amount = super._amount

    constructor(name, price, amount, thickness) {
        super();
        this.#_name = super.name(name)
        this.#_price = super.price(price)
        this.#_amount = super.amount(amount)
        this.#thickness = thickness
    }
    showInfo() {
        componentsArray.push({
            name: this._name,
            type: 'Узел',
            price: this._price,
            amount: this._amount,
            param3: this.#thickness,
            typePriority: this.#typePriority
        })
        window.localStorage.setItem('Arr', JSON.stringify(componentsArray))
        console.log(componentsArray)
    }
}
const params = {
    param1: findEl('#param1'),
    param2: findEl('#param2'),
    param3: findEl('#param3'),
    param4: findEl('#param4'),
    label3: findEl('#l3')
}
let activeTab = 0
const $submit = findEl('#sub')
const $tabItems = document.querySelectorAll('.tab-item')
const $select = findEl('select')
$tabItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        removeActive()
        setActiveItem(item)
        params.label3.innerText = item.getAttribute('datatype')
        activeTab = index
    })
})
$submit.addEventListener('click', e => {
    e.preventDefault()
    if (params.param4.value !== '') {
        pushClass($tabItems[activeTab].getAttribute('datasrc'),params.param4.value, params.param1.value, params.param2.value, params.param3.value)
        removeValue()
        removeComponents()
        componentsArray.forEach(comp => {renderComponent(comp.name, comp.type, comp.price, comp.amount, comp.param3, comp.typePriority)})
    }
    else {alert('Заполните обязательное поле "Имя"')}
})
function removeActive() {$tabItems.forEach(item => item.classList.remove('active'))}
function setActiveItem(item) {item.classList.add('active')}
function pushClass (typeClass, name, price, count, param) {
    if(typeClass === 'Mechanism') typeClass = Mechanism
    if(typeClass === 'Body') typeClass = Body
    if(typeClass === 'Node') typeClass = Node
    let el = new typeClass(name,+price,+count,param)
    el.showInfo()
}
const componentsScrollContainer = document.querySelector('.components-scroll-container')
function removeComponents() {componentsScrollContainer.innerHTML = ''}
function renderComponent(name, type, price, amount, param, priority) {
    let html = `<div class="component" data-priority="${priority}">
        <div class="name-component param-component">
            <span>${name}</span>
        </div>
        <div class="type-component param-component">
            <span>${type}</span>
        </div>
        <div class="count-component param-component">
            <span>${amount}</span>
        </div>
        <div class="param3-component param-component">
            <span>${param}</span>
        </div>
        <div class="price-component param-component">
            <span>${price}$</span>
        </div>
    </div>`
    componentsScrollContainer.insertAdjacentHTML('afterbegin', html)
}
function removeValue() {
    params.param1.value = ''
    params.param2.value = ''
    params.param3.value = ''
    params.param4.value = ''
}
$select.addEventListener("click", (e) => hasSortValue($select.options.selectedIndex))
function hasSortValue(value) {
    if (value === 0) sortArr('I')
    if (value === 1) sortArr('<')
    if (value === 2) sortArr('>')
    if (value === 3) sortArr('AI')
    if (value === 4) sortArr('AD')
    if (value === 5) sortArr('T')
}
function sortArr(val) {
    let shadowArray = componentsArray
    if (val !== 'I') {
        for (let i = 1, l = shadowArray.length; i < l; i++) {
            const current = shadowArray[i];
            let j = i;
            if (val === 'T') {
                while (j > 0 && shadowArray[j - 1].typePriority < current.typePriority) {
                    shadowArray[j] = shadowArray[j - 1];
                    j--;
                }
            }
            else if (val === '<') {
                while (j > 0 && shadowArray[j - 1].price < current.price) {
                    shadowArray[j] = shadowArray[j - 1];
                    j--;
                }
            }
            else if (val === '>') {
                while (j > 0 && shadowArray[j - 1].price > current.price) {
                    shadowArray[j] = shadowArray[j - 1];
                    j--;
                }
            }
            else if (val === 'AI') {
                while (j > 0 && shadowArray[j - 1].amount < current.amount) {
                    shadowArray[j] = shadowArray[j - 1];
                    j--;
                }
            }
            else if (val === 'AD') {
                while (j > 0 && shadowArray[j - 1].amount > current.amount) {
                    shadowArray[j] = shadowArray[j - 1];
                    j--;
                }
            }
            shadowArray[j] = current;
        }
        removeComponents()
        shadowArray.forEach(comp => {renderComponent(comp.name, comp.type, comp.price, comp.amount, comp.param3, comp.typePriority)})
    }
    else {
        removeComponents()
        componentsArray.forEach(comp => {renderComponent(comp.name, comp.type, comp.price, comp.amount, comp.param3, comp.typePriority)})
    }
}
const fromInp = findEl('#from')
const beforeInp = findEl('#before')
const priceRangeInput = findEl('#price-range').onclick = () => {priceRange(+fromInp.value, +beforeInp.value)}
function priceRange(fromEl, before) {
    removeComponents()
    let newArr = 0
    if (fromEl !== 0 && before !== 0) {
        newArr = componentsArray.filter(comp => {
            if (fromEl <= comp.price && comp.price <= before) {
                renderComponent(comp.name, comp.type, comp.price, comp.amount, comp.param3, comp.typePriority)
            }
        })
    }
    else if(fromEl === 0 && before !== 0) {
        newArr = componentsArray.filter(comp => {
            if (comp.price <= before) {
                renderComponent(comp.name, comp.type, comp.price, comp.amount, comp.param3, comp.typePriority)
            }
        })
    }
    else if(fromEl !== 0 && before === 0) {
        newArr = componentsArray.filter(comp => {
            if (fromEl <= comp.price) {
                renderComponent(comp.name, comp.type, comp.price, comp.amount, comp.param3, comp.typePriority)
            }
        })
    }
    else if (fromEl === 0 && before === 0) componentsArray.forEach(comp => {renderComponent(comp.name, comp.type, comp.price, comp.amount, comp.param3, comp.typePriority)})
}
const json = JSON.parse(localStorage.getItem('Arr'))
function JSONinArray() {
    if (json !== null) {
        componentsArray = json
    }
}
componentsArray.forEach(comp => {renderComponent(comp.name, comp.type, comp.price, comp.amount, comp.param3, comp.typePriority)})




