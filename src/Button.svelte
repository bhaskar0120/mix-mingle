<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    function clickHandler(){
        if(!disabled){
            dispatch('send');
        }
    }
    let pressed = false;
    let classStr =  "transition-all rounded-full bg-gradient-to-l select-none from-blue-500 to-indigo-600 h-12 w-1/6 mx-2 text-white text-center text-xl font-thin pt-2";
    let classDisabled = "rounded-full select-none bg-gray-500 text-white h-12 w-1/6 mx-2 text-center text-xl font-thin pt-2 opacity-50";
    export let disabled = true;
</script>
<div
    onclick=""
    on:click={clickHandler}
    on:mousedown={()=>pressed=true}
    on:mouseup={()=>pressed=false}
    class:shadow-lg={!pressed && !disabled}
    class:scale-95={pressed && !disabled}
    class={disabled?classDisabled:classStr}>Send</div>