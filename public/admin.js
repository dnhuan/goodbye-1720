$(()=>{
    const socket = io('https://wilsonle.me:6969')

    socket.on('hello', data => console.log(data))
    socket.on('countdownTimer', data => {
        $('.timer-number').text(data);
    })

    $('.controller-button__start').click(e=>{
        e.preventDefault();
        socket.emit('start', $('#controller-key').val())
        $('#controller-key').val('')
    })
    //
    $('.controller-button__cancel').click(e=>{
        e.preventDefault();
        socket.emit('cancel', $('#controller-key').val())
        $('#controller-key').val('')
    })
})