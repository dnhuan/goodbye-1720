const emoList = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "👋", "🤚", "🖐", "✋", "🖖", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "💪", "🧠"];

class Emoji {
    constructor(x, y, emoID, TTL) {
        this.x = x;
        this.y = y;
        this.emoID = emoID;
        this.TTL = TTL;
        this.divID = parseInt(Math.random() * 696969 + 5);
    }
    remove() {
        // delete element
        // console.log('attempt delete',this.divID)
        $(`#${this.divID}`).remove()
    }
    show() {
        // create element
        // console.log('create',this.divID)
        const cordX = parseInt(this.x / 100 * $(window).width())
        const cordY = parseInt(this.y / 100 * $(window).height())
        $('.emo-container').append(`<div class="emo" id=${this.divID} style="top:${cordY}px; left:${cordX}px">${emoList[this.emoID]}</div>`)
        setTimeout(() => { this.remove() }, this.TTL)
    }
}

$(() => {
    // init socket
    const socket = io('https://wilsonle.me:6969')
    socket.on('hello', sec => {
        console.log("Hello at", sec)
        if (sec > 30) {
            // $('.timer-container').css("visibility","visible");
            resetCountdown();
        }
        else if (sec > 0) {
            initCountdown(sec);
        } else {
            $('.timer-container').remove();
            $('iframe').css("visibility", "visible");
        }
    })

    // socket timer
    socket.on('countdownTimer', sec => {
        if (sec > 30) {
            resetCountdown();
        }
        else if (sec > 0) {
            initCountdown(sec);
        } else {
            $('.timer-container').remove();
            $('iframe').css("visibility", "visible");
        }
    })

    // admin console
    $('.controller-button__start').click(e => {
        e.preventDefault();
        socket.emit('start', $('#controller-key').val())
        $('#controller-key').val('')
    })
    //
    $('.controller-button__reset').click(e => {
        e.preventDefault();
        socket.emit('cancel', $('#controller-key').val())
        $('#controller-key').val('')
    })

    // socket emo
    socket.on('emoReceive', emo => {
        let emoji = new Emoji(emo.x, emo.y, emo.ID, 2000);
        emoji.show();
    })

    // listen emo
    $('.emo-container').click(e => {
        emo = {
            "x": parseInt(e.pageX / $(window).width() * 100),
            "y": parseInt(e.pageY / $(window).height() * 100),
            "ID": parseInt(Math.random() * emoList.length)
        }
        socket.emit('emoSend', emo);
        let emoji = new Emoji(emo.x, emo.y, emo.ID, 2000);
        emoji.show()
    })
    $('.emo-container').click(e => {
        console.log("click on timer")
    })
    $('iframe').click(e => {
        console.log("click on iframe")
    })
})