<script>
    import ButtonGray from './ButtonGray.svelte';
    import ChatBubble from './ChatBubble.svelte';
    import Button from './Button.svelte';
    import Textbox from './Textbox.svelte';
    import {afterUpdate} from 'svelte';

    let status = "Disconnected";
    let chatBox;
    // Some random Messages to test with
    /*
    let messages = [{message:"Hello",isUser:true, time:getTime()},
    {message:"How are you?",isUser:true, time:getTime()},
    {message:"I'm fine, thank you",isUser:false, time:getTime()},
    {message:"How was your day?",isUser:true, time:getTime()},
    {message:"I had a great day",isUser:false, time:getTime()},
    {message:"I'm glad to hear that",isUser:true, time:getTime()},
];
    */
    let messages = [];

    function getTime(){
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
    }


    let textValue = "";

    //const ws = new WebSocket("wss://mix-mingle.herokuapp.com/chat");
    const ws = new WebSocket("wss://mix-mingle-c71d02663c9e.herokuapp.com/chat");

    //Push message to the array
    function send(){
        if(textValue !== "" && status == 'Connected'){
            let message = {
                type : "message",
                value : textValue
            };
            messages = [...messages,{message:textValue,isUser:true, time:getTime()}];
            textValue = "";
            ws.send(JSON.stringify(message));
        }
    }
    //Scroll to the bottom of the chat after every update
    afterUpdate(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    });
    function next(){
        ws.send(JSON.stringify({
            type : "next"
        }));
    }

    ws.onmessage = event=>{
        let data = JSON.parse(event.data);
        if(data.type === 'status'){
            status = data.value;
            if(status === 'Connected'){
                messages = [];
            }
        }
        else if(data.type === 'message'){
            messages = [...messages, {message:data.value,isUser:false, time:getTime()}];
        }
    };


</script>
<div class="lg:w-1/2 transition-all lg:h-[36rem] h-screen flex flex-col w-full mx-auto lg:shadow-xl lg:mt-12">
<!-- HEAD -->
    <div class="bg-gradient-to-r font-light from-indigo-600 bg-blue-500 p-4 text-white lg:rounded-t-xl h-24"> 
        <div class="text-4xl">Chat with strangers!</div> 
        <div class="text-lg mt-2 mx-3">Status : {status}</div>
    </div>
<!-- CHAT BOX -->
    <div bind:this={chatBox} class=" bg-white p-4 grow scroll-smooth overflow-y-auto">
        {#each messages as message}
        <ChatBubble {...message}/> <!--message={message.message} isUser={message.isUser} />--> 
        {/each}
    </div>
<!-- INPUT BOX -->
    <div class=" bg-gray-200 h-20 py-4 w-full flex">
        <ButtonGray on:next={next}/>
        <Textbox bind:textValue on:send={send}/>
        <Button on:send={send} disabled={status!=='Connected'}/>
    </div>
</div>
