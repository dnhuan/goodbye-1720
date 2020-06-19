$(()=>{
    const socket = io()
    socket.on('hello', data => console.log(data))

    socket.on('countdownTimer', data => {
        $('.timer-number').text(data);
    })
})