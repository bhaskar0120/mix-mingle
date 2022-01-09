<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    function clickHandler(){
        dispatch('send');
    }
    let pressed = false;
</script>
<div
    onclick=""
    on:click={clickHandler}
    on:mousedown={()=>pressed=true}
    on:mouseup={()=>pressed=false}
    class:shadow-lg={!pressed}
    class:scale-95={pressed}
    class="transition-all rounded-full bg-gradient-to-l select-none from-blue-500 to-indigo-600 h-12 w-1/6 mx-2 text-white text-center text-xl font-thin pt-2">Send</div>