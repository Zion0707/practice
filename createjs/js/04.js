$(function(){

    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on('complete', handleComplete, this);
    queue.on('progress', handleProgress, this);
    queue.loadManifest([
        { id:'p01' , src:'images/04/01.png'},
        { id:'p02' , src:'images/04/02.png'},
        { id:'p03' , src:'images/04/03.png'},
        { id:'p04' , src:'images/04/04.png'},
        { id:'p05' , src:'images/04/05.png'},
        { id:'p06' , src:'images/04/06.png'},
        { id:'p07' , src:'images/04/07.jpg'},
        { id:'p08' , src:'images/04/08.jpg'},
    ]);
    //加载进度
    function handleProgress(event){
        let progress = parseInt( event.progress * 100 );
        $('.progress span').html( progress );
        if( progress == 100 ){
            $('.page1').fadeOut();
        }
    }
    //加载完成
    function handleComplete() {
        console.log('加载完成');

        addElement('p01');
    }

    //tab切换
    $('.tab-btn li').on('click',function(){
        let index = $(this).index();
        $(this).addClass('active').siblings('li').removeClass();
        $('.tab-item .item-li').eq(index).show().siblings('.item-li').hide();
    });
    //工具栏隐藏
    $('.tool-btn').on('click',function(){
        $('.p2-tool').toggle();
    });

    var stage = new createjs.Stage('canvas');

    $('.item-li span').on('click',function(){
        var name = $(this).attr('name');
        console.log(name);

        if( name == 'p07' || name == 'p08' ){
            setBg(name);
        }else{
            addElement(name);
        }
    });

    
    function setBg(name){
        var bg = queue.getResult(name);
        var bitmap = new createjs.Bitmap(bg);
        stage.addChild(bitmap);
        stage.update();
        // 获取x,y,w,h
        console.log( bitmap.getBounds() );
    }
    function addElement(name){
        var el = queue.getResult(name);

        //图片
        var bitmap = new createjs.Bitmap(el);
        var bounds = bitmap.getBounds();
        // bitmap.set({x:bounds.x+20, y:bounds.y+20, scaleX:0.5, scaleY:0.5});
        bitmap.set({scaleX:0.5, scaleY:0.5});
        
        //关闭按钮
        var rmBtn = new createjs.Shape();
        //设置关闭按钮到左下角
        rmBtn.graphics.beginFill('orangered').drawCircle(-7, bounds.height/2+7, 14);
        //设置名称
        rmBtn.set({ name:'rmBtn'});
        rmBtn.on('mousedown',function(event){
            console.log(event.currentTarget.name);
            // stage.removeChild(container);
        });

        //缩放按钮
        var zoomBtn = new createjs.Shape();
        zoomBtn.graphics.beginFill('#36a0db').drawCircle(bounds.width / 2 + 7, -7, 14);


        var container = new createjs.Container();
        container.set({x:20, y:20});
        container.addChild(bitmap, rmBtn, zoomBtn);
        stage.addChild(container);
        stage.update();

        container.on('mousedown',function(event){
            // 设置层级问题
            stage.setChildIndex(this,1);
            this.set({ x: event.stageX - bounds.width / 4, y: event.stageY - bounds.height / 4 });    
        });
        container.on('pressmove', function (event) {
            this.set({ x: event.stageX - bounds.width / 4, y: event.stageY - bounds.height / 4 });
        });
        container.on('pressup', function (event) {
            // console.log(event);
        });
    }


    //动起来
    createjs.Ticker.on('tick', handleTick);
    function handleTick(){
        stage.update();
    }
    //必须开启这个才有touch事件
    createjs.Touch.enable(stage);
});