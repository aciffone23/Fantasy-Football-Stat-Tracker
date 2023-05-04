class Example{
    constructor(HtmlElement) {
        this.htmlElement = HtmlElement
        this.HTMLElement.innerHTML = "<h1> It's Alive!!!</h1>"

        this.handleClick = this.handleClick.bind(this)
        this.HtmlElement.addEventListener('click', this.handleClick)
    }

    handleClick() {
        this.HtmlElement.children[0].innerText = "Ouch"
    }
}

export default Example;