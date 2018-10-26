(function(){
    //地图
    var map = document.getElementById('snake'),
        score = document.getElementById('score'),
        row = 25,//行
        col = 20;//列
    //地图宽、高
    map.style.width = col * 20 + 'px';
    map.style.height = row * 20 + 'px';
    //小格格
    var snakeDiv = [];
    for(var i = 0 ; i < row ; i++){
        var rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        map.appendChild(rowDiv);
        var rowArray = [];
        for(var j = 0 ; j < col ; j++){
            var colDiv = document.createElement('div');
            colDiv.className = 'col';
            rowDiv.appendChild(colDiv);
            rowArray.push(colDiv)
        }
        snakeDiv.push(rowArray) 
    };
    //蛇模型
    var snake = [];
    for(var i = 0; i < 3 ; i++){
        snakeDiv[0][i].className = 'col activeSnake';
        snake[i] = snakeDiv[0][i];
    }
    //控制蛇
    var x = 2, 
        y = 0,//起始位置
        scoreCount = 0,//分数
        eggX = 0,
        eggY = 0;//蛋的位置
    var direcyion = 'right',//蛇移动的方向
        changeDiv = true;//判断是否需要改变蛇的方向
    var delayTimer = null;//延迟定时器
    document.onkeydown = function(event){
        if(!changeDiv){
            return;
        };
        event = event || window.event;
        if(direcyion == 'right' && event.keyCode == 37){
            return;
        };
        if(direcyion == 'left' && event.keyCode == 39){
            return;
        };
        if(direcyion == 'up' && event.keyCode == 40){
            return;
        };
        if(direcyion == 'down' && event.keyCode == 38){
            return;
        };
        switch (event.keyCode){
            case 37 : direcyion = "left";break;
            case 38 : direcyion = "up";break;
            case 39 : direcyion = "right";break;
            case 40 : direcyion = "down";break;
        };
        snakeMove()
        changeDiv = false;
        delayTimer = setTimeout(function(){
            changeDiv = true;
        },100);
    };
    //移动逻辑
    function snakeMove(){
        switch (direcyion){
            case 'left' : x--;break;
            case 'right' : x++;break;
            case 'up' : y--;break;
            case 'down' : y++;break;
        }
        //判断游戏是否结束
        if(x < 0 || y < 0 || x >= col || y >= row){
            alert('game over');
            clearInterval(moverTimer);
            return;
        }
        //蛇吃到自己
        for(var i = 0 ; i < snake.length; i++){
            if(snake[i] == snakeDiv[y][x]){
                alert("game over");
                clearInterval(moverTimer);
                return;
            };
        };
        //判断蛇头移动的位置 是否有蛋
        if(eggX == x && eggY == y){
            snakeDiv[eggY][eggX].className = 'col activeSnake';
            snake.push(snakeDiv[eggY][eggX]);
            scoreCount++;
            score.innerHTML = scoreCount;
            createNewEgg()
        }else{
            snake[0].className = 'col';
            snake.shift();
            snakeDiv[y][x].className = 'col activeSnake'
            snake.push(snakeDiv[y][x]);
        }
    }
    var moverTimer = setInterval(function(){
        snakeMove()
    },600)

    //随机
    function random(min,max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function createNewEgg(){
        eggX = random(0,col -1)
        eggY = random(0,row - 1)
        if(snakeDiv[eggY][eggX].className == 'col activeSnake'){
            createNewEgg();
        }else{
            snakeDiv[eggY][eggX].className = 'col egg'
        }
    };
    createNewEgg();
    var pause = document.getElementById('pause'),
        start = document.getElementById('start'),
        refresh = document.getElementById('refresh'),
        speed = document.getElementById('speed');
    pause.onclick = function(){
        clearInterval(moverTimer)
    }
    start.onclick = function(){
        moverTimer = setInterval(function(){
            snakeMove()
        },spped1)
        console.log(spped1);
        
    }
    refresh.onclick = function(){
        window.location.reload();
    }
    var spped1 = 600;
    speed.onclick = function(){
        spped1 -= 50
        clearInterval(moverTimer)
        moverTimer = setInterval(function(){
            snakeMove()
        },spped1)
    }
})();