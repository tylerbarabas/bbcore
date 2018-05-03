export default class DomElement {
    constructor(tag = 'DIV'){
        this.dom = document.createElement(tag);
    }

    addEvent(evtName, func){
        this.dom.addEventListener(evtName,func);
    }

    removeEvent(evtName, func){
        this.dom.removeEventListener(evtName,func);
    }

    dispatchEvent(evtName, params){
        var evt = document.createEvent('Event');
        evt.initEvent(evtName,true,true);
        evt.params = params;
        this.dom.dispatchEvent(evt);
    }

    setTransition (transition,setChildren,element) {
        setChildren = setChildren || false;
        element = element || this.dom;

        element.style.transition = transition;
        element.style.WebkitTransition = transition;
        element.style.MozTransition = transition;

        if (!setChildren) return;

        let children = element.childNodes;
        for (let i=0;i<children.length;i++) {
            children[i].style.transition = transition;
            children[i].style.WebkitTransition = transition;
            children[i].style.MozTransition = transition;

            if (children[i].childNodes.length > 0) this.setTransition(transition,true,children[i]);
        }
    }

    style (attr,val) {
        if ( typeof attr === 'string' ) {
            this.dom.style[attr] = val;
        } else {
            for (let i in attr) {
                this.dom.style[i] = attr[i];
            }
        }
    }

    appendTo( elem = window.stage || document.body ) {
        if (typeof elem === 'object') {
            elem.dom.appendChild( this.dom );
        } else {
            elem.appendChild( this.dom );
        }
    }
}
