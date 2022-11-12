jQuery(($)=>{
    const socket = io.connect();
    const $messajeForm = $('#btnEnviar');
    const $message = $('#message');
    const $chat = $('#divMensajes');
    
    const users = $('#ulUsuarios');
    const nick = $('#nickInput');
    const setNick = $('#setNick');

    

    $messajeForm.click((event)=>{
        event.preventDefault();
        if($message.val() !== ''){
            socket.emit('mandar-mensaje', $message.val());
        }
        $message.val('');
    });

    socket.on('nuevo-mensaje', (data)=>{
        $chat.append(`
        <p>${data.nick}</p>
        <p class="message ">${data.msg}</p>`);
        $chat.scrollTop($chat.prop('scrollHeight'));
    });

    setNick.click((e)=>{
        e.preventDefault();
        socket.emit('nuevo-usuario', nick.val(), (data)=>{
            if(data){
                $('#nickContainer').hide();
                $('#chatContainer').show();
            }
            else{
                $('#login-error').show();
            }
        })
    });

    socket.on('usernames', (data=[])=>{
        let userName = "";
        for(let user in data){
            userName += `
            <p class="user_online">
                <h5 class="text-success"> ◉ ${user} </h5>
            </p>`
            users.html(userName);
        }
    })

});