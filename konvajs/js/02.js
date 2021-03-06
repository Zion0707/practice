$(function(){

    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("progress", handleProgress, this);
    queue.on("complete", handleComplete, this);
    queue.loadFile({ id: "sound", src: "music/music.mp3" });
    queue.loadManifest([
        // { id: "p1", src: "images/01.png" },
        // { id: "p2", src: "images/02.png" },
        // { id: "p3", src: "images/03.png" },
        // { id: "p4", src: "images/04.png" },
        // { id: "p5", src: "images/05.png" },
        { id: "p6", src: "images/06.png" },
        { id: "p7", src: "images/sprite.png" },
    ]);
    //加载中.
    function handleProgress(event) {
        var progress = parseInt(event.progress * 100);
        console.log(progress);
    }
    //加载完.
    function handleComplete() {
        console.log('加载完成');

        

        var stage = new Konva.Stage({
            container: 'container',
            width: 750,
            height: 2668
        });

        var layer = new Konva.Layer();

        var rect = new Konva.Rect({
            x: 160,
            y: 60,
            width: 100,
            height: 90,
            fill: 'red',
            name: 'rect',
            stroke: 'black',
            draggable: true
        });
        layer.add(rect);
        // create new transformer
        var tr = new Konva.Transformer();
        layer.add(tr);
        tr.attachTo(rect);
        layer.draw();

        stage.add(layer);
    }

    




});