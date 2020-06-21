class Emoji{
    constructor(x, y, emoID, TTL){
        this.x = x;
        this.y = y;
        this.emoID = emoID;
        this.TTL = TTL;
        this.emoList = ["hi banana 1", "banana 2 says hi","😀","🤔","🥵"];
        this.divID = parseInt(Math.random() * 696969 + 5);
        console.log(this.divID)
    }
    remove(){
        // delete element
        console.log('attempt delete',this.divID)

        $(`#${this.divID}`).remove()
    }
    show(){
        // create element
        console.log('create',this.divID)
        const cordX = parseInt(this.x / 100 * $(window).width())
        const cordY = parseInt(this.y / 100 * $(window).height())
        $('.emo-container').append(`<div class="emo" id=${this.divID} style="top:${cordY}px; left:${cordX}px"> hello bitasid </div>`)
        setTimeout(()=>{this.remove()}, this.TTL)
    }
}

$(()=>{
    // init socket
    const socket = io('https://wilsonle.me:6969')
    socket.on('hello', data => console.log(data))

    // socket timer
    socket.on('countdownTimer', sec => {
        if(sec > 0){
            $('.timer-number').text(sec);
        }else{
            $('.timer-container').hide();
            $('iframe').css("visibility","visible");
        }
    })

    // socket emo
    socket.on('emoReceive', emo =>{
        let emoji = new Emoji(emo.x, emo.y, emo.ID, 2000);
        emoji.show();
    })

    // listen emo
    $('.emo-container').click(e => {
        emo = {
            "x": parseInt(e.pageX / $(window).width() * 100),
            "y": parseInt(e.pageY / $(window).height() * 100),
            "ID": parseInt(Math.random() * 5)
        }
        console.log(emo)
        socket.emit('emoSend', emo);
        let emoji = new Emoji(emo.x, emo.y, emo.ID, 2000);
        emoji.show()
    })
})