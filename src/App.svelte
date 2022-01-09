<script>
    import ButtonGray from './ButtonGray.svelte';
    import ChatBubble from './ChatBubble.svelte';
    import Button from './Button.svelte';
    import Textbox from './Textbox.svelte';
    import {afterUpdate} from 'svelte';

    let status = "Connected";
    let UID = "";
    let chatBox;
    // Some random Messages to test with
    let messages = ["Hello", "How are you?", "I am fine", "This is a very long message some more random text. This is another sentence and some more text"];

    let textValue = "";

    //Push message to the array
    function send(){
        if(textValue != ""){
            let message = textValue;
            textValue = "";
            messages = [...messages, message];
        }
    }
    //Scroll to the bottom of the chat after every update
    afterUpdate(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    });
    function next(){
    }



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
        <ChatBubble message={message} />
        {/each}
    </div>
<!-- INPUT BOX -->
    <div class=" bg-gray-200 h-20 py-4 w-full flex">
        <ButtonGray on:next={next}/>
        <Textbox bind:textValue on:send={send}/>
        <Button on:send={send}/>
    </div>
</div>