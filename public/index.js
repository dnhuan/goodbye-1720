$(()=>{
    const socket = io('http://wilsonle.me:3000')
    socket.on('hello', data => console.log(data))

    socket.on('countdownTimer', sec => {
        if(sec > 0){
            $('.timer-number').text(sec);
        }else{
            $('.timer-container').hide();
            $('iframe').css("visibility","visible");
        }
    })
})