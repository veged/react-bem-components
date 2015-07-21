ReactBem.createComponent('popup', {
    __constructor : function() {
        this.__base.apply(this, arguments);
        this.rootBemjson.content = null;
        this.popupRoot = null;
    },

    componentDidMount : function() {
        this.__base.apply(this, arguments);
        this.popupRoot = React.findDOMNode(this);
        this.updatePopupContent();
    },

    blockDidMount : function() {
        this.__base.apply(this, arguments);
        var domElem = this.block.domElem;
        BemDom.scope.append(
            this.block
                .setAnchor($(React.findDOMNode(this.props.getAnchor())))
                .domElem.replaceWith('<noscript/>')); // TODO: check does such DOM mutations are valid
    },

    blockUpdateState : function() {
        this.updatePopupContent();
    },

    componentWillUnmount : function() {
        React.unmountComponentAtNode(this.popupRoot);
        // NOTE: Doesn't use `__base`, as we need to `destruct` not to `detach` popup
        this.block && BemDom.destruct(this.block.domElem);
        this.popupRoot = null;
    },

    updatePopupContent : function() {
        React.render(React.createElement('div', null, this.props.content), this.popupRoot);
    }
});
