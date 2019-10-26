/* 
https://github.com/marcusbecker
Color Field for jQuery v1.1.0.
Written by Marcus Becker Siviero Oct 2019.
Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
Please attribute the author if you use it. 
*/
(function($){
    function Plugin(){
        this._default = { showColor: true, colorField: false, autoInit: false }
    }

    $.extend(Plugin.prototype, {
        className: 'hasColorField',
        dataPropName: 'color-field-data',
        pluginName: 'colorfield',
        _add: function(target, options){
            target = $(target);
            if(!target.hasClass(this.className)){
                var sp = {},
                    config = $.extend({}, this._default, options);
                if(config.showColor){
                    sp = $('<span />');
                    sp.addClass(this.className)
                    .insertAfter(target);
                }
                target.addClass(this.className)
                .data(this.dataPropName, config)
                .bind('keyup.' + this.pluginName, function(){
                    plugin._do($(this), sp);
                });
                if(config.autoInit && '' !== target.val()){
                    plugin._do(target, sp);
                }
            }
            return this;
        },
        _do: function(obj, sp){
            var val = obj.val(),
                opt = plugin._options(obj);
            
            if(opt.colorField){
                obj.css('background-color', val);
            }
            if(opt.showColor){
                sp.css( 'background-color', val );
            }
        },
        _destroy: function(target){
            target = $(target);
            var opt = plugin._options(target);
            if(opt.colorField){
                target.css('background-color', '');
            }            
            if(opt.showColor){
                target.next('span.' + this.className).remove();
            }
            target.removeClass(this.className)
                .data(this.dataPropName, {})
                .unbind('keyup.' + this.pluginName);
        },
        _options: function(obj){
            return obj.data(this.dataPropName || {});
        }
    });

    $.fn.colorfield = function(options){
        return this.each(function(){
            if('destory' === options){
                plugin._destroy(this);
            }else if('object' === typeof options){
                plugin._add(this, options || {});
            }
        });
    };

    var plugin = $.colorfield = new Plugin();

})(jQuery); 