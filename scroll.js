
const ScrollControl = class {
  constructor({ links = [] }) {
    this.hash = null

    this.links = [...links].map(link => ({ selector: link, hash: link.getAttribute('href') }))
    this.nodeList = [...this.links.map( link => ({ selector: document.querySelector(link.hash), hash: link.hash}) )]

    window.addEventListener('scroll', _ => this.sectionHandler())
    this.linksHandler()
  }

  sectionHandler() {
    const windowHeight = document.documentElement.clientHeight;
    for (let node of this.nodeList) {
      const coords = node.selector.getBoundingClientRect();
      const isCurrent = coords.top >= 0 || coords.bottom - 23 > 0
      if ( isCurrent ) {
        this.hash = node.hash
        this.updateNavigation()
        break
      }
    }
  }

  linksHandler() {
    this.links.forEach( link => {
      link.selector.addEventListener('click', event => {
        event.preventDefault()
        this.hash = link.hash
        this.updateSections()
      })
    } )
  }
  updateNavigation() {
    this.links.forEach( link => link.hash === this.hash ? link.selector.classList.add('btn-primary') : link.selector.classList.remove('btn-primary'))
  }

  updateSections() {
    window.scrollTo({ top: this.nodeList.find( node => node.hash === this.hash ).selector.offsetTop, behavior: 'smooth' });
  }
}
