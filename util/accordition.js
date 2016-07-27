
function Accordition (el,multiple) {
    //初始化折叠菜单
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.link');
    // Even to
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
}

Accordition.prototype.dropdown = function(e) {
    var $el = e.data.el,
        $this = $(this),
        $next = $this.next();
    if(!$next){
        return;
    }
    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
        $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    }
};
 
export default Accordition;