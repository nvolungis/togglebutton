; (function ($, window, document, undefined) {

    var pluginName = 'togglebutton',
          defaults = { 
          	clear_classes: false, 
          	click_close: null, 
          	class_name:'active' 
          };

    function Toggle(el, options) {
        this.el = el;
        this.$el = $(el);
        this.options = $.extend({}, defaults, options);

        this.init();
    }

    $.extend(Toggle.prototype, {
        init: function () {
        		
            this.$button = this.$el.find(this.options.button);
            this.$button.bind('click', $.proxy(this.toggle, this));

            if (this.options.click_close === null) return;
            this.$el.delegate(this.options.click_close, 'click', $.proxy(this.close, this));
        },

        toggle: function () {
            var showing = this.$el.hasClass(this.options.class_name);
            
            if (showing) {
                this.close();
            } else {
                this.open();
            }
        },
        
        open: function(){
	        this.$el.addClass(this.options.class_name);
        },
        
        close: function(){
	        if (this.options.clear_classes) {
            this.$el.attr({ 'class': '' });
          }

					this.$el.removeClass(this.options.class_name);
        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            new Toggle(this, options);
        });
    }

})(jQuery, window, document);