class Emoji{
    constructor(x, y, emoID, TTL){
        this.x = x;
        this.y = y;
        this.emoID = emoID;
        this.TTL = TTL;
        this.emoList = ["hi banana 1", "banana 2 says hi","😀","🤔","🥵"];
        this.divID = Math.random() * 696969 + 5;
    }
    remove(){
        // delete element
        $(`#${this.divID}`).remove()
    }
    show(){
        // create element
        $('.emo-container').append(`<div> hello bitasid </div>`)
        setTimeout(this.remove(), this.TTL)
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
        let emoji = new Emoji(emo.x, emo.y, emo.ID, 2000)
        emoji.show()
    })

    // listen emo
    $('.emo-container').click(e => {
        emo = {
            "x": parseInt(e.pageX / $(window).width() * 100),
            "y": parseInt(e.pageY / $(window).height() * 100),
            "ID": parseInt(Math.random() * 5)
        }
        console.log(emo)
        socket.emit('emoSend', emo)
    })
})