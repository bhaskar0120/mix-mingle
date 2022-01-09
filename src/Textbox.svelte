<script>
    import {createEventDispatcher, onMount} from 'svelte';
    export let textValue; 
    let textBox;
    const dispatch = createEventDispatcher();
    onMount(()=>{
        textBox.focus();
    });
    function eventHandler(event) {
        if(event.keyCode === 13) {
            dispatch('send');
            textValue="";
        }
    }
    
</script>
<input 
bind:value={textValue} 
on:keypress={eventHandler} 
bind:this={textBox} type="text" 
class="outline-indigo-700 rounded-full w-8/12 h-12 border-none ml-2 p-2" 
placeholder="Text..">