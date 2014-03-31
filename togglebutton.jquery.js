; (function ($, window, document, undefined) {

  var defaults = { 
    clear_classes: false, 
    click_close: null, 
    class_name:'active',
    on_open: function(){},
    on_close: function(){},
    close_on_body_click: true
  };

  function Toggle(el, options) {
    this.options = $.extend({}, defaults, options);
    this.el = el;
    this.$el = $(el);
    this.on_open = this.options.on_open;
    this.on_close = this.options.on_close;

    this.init();
  }

  $.extend(Toggle.prototype, {
    init: function () {
      this.$button = this.$el.find(this.options.button);
      this.$button.bind('click', $.proxy(this.toggle, this));

      if (this.options.click_close === null) return;
      this.$el.delegate(this.options.click_close, 'click', $.proxy(this.close, this));
    },

    toggle: function (e) {
      e.preventDefault();
      e.stopPropagation();
      var showing = this.$el.hasClass(this.options.class_name);

      if (showing) {
        this.close();
      } else {
        this.open();
      }
    },

    open: function(){
      this.$el.addClass(this.options.class_name);
      if(this.options.close_on_body_click) this.bind_body_close();
      this.on_open()
    },

    close: function(e){
      e && e.preventDefault();
      if (this.options.clear_classes) {
        this.$el.attr({ 'class': '' });
      }

      if( this.options.close_on_body_click ) this.unbind_body_close();

      this.$el.removeClass(this.options.class_name);
      this.on_close();
    },


    bind_body_close: function(){
      var that = this;

      $('body').on('click.toggelbutton', function(){
        that.close(); 
      });        
    },

    unbind_body_close: function(){
      $('body').off('click.togglebutton');
    },

    destroy: function(){
      this.$button.unbind('click');
      this.$el.undelegate(this.options.click_close, 'click');
    }
  });

  $.fn.togglebutton = function (options) {
    this.each(function () {
      var $el = $(this),
      toggle = $el.data('toggle');

    if(toggle){
      if(options == 'close'){
        toggle.close();
      }else{
        toggle.destroy();
      }
    }else {
      $el.data('toggle', new Toggle($el, options));
    }
    });
  }
})(jQuery, window, document);
