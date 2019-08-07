import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox = (function(){

    return function( opts ){  //配置参数
		
		var defaults = {   //默认值
		    title : '',
		    content : '',
		    cancel : '',
		    ok : '',
		    handleCancel : null,
		    handleOk : null
		};
		
		var MyComponent = Vue.extend(MessageBox);//extend创建的是一个组件构造器，而不是一个具体的组件实例
		// 传参给默认数据
        for(var attr in opts){
            defaults[attr] = opts[attr];
        }
		// 创建一个组件实例，作用在新建的div元素，对数据进行赋值
        var vm = new MyComponent({
            el : document.createElement('div'),
            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },
            methods : {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this);//集成父组件的方法和属性
                    document.body.removeChild( vm.$el );//移除新建的div元素
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild( vm.$el );
                }
            }
        });

        document.body.appendChild( vm.$el );

    };

})();