<script>
    //Import createEventDispatcher from svelte
    import { createEventDispatcher } from 'svelte';
    //Create an event dispatcher
    const dispatch = createEventDispatcher();
    function clickHandler(){
        //Dispatch an event called "next"
        dispatch('next');
    }
    let pressed = false;
</script>

<div onclick="" on:click={clickHandler} on:mousedown={()=>pressed = true} on:mouseup={()=>pressed = false}
 class="select-none transition-colors rounded-md gray-50 h-12 w-1/12 mr-2 ml-6 shadow text-center text-lg font-thin pt-2"
 class:bg-slate-100={!pressed}
 class:bg-gray-500={pressed}
 class:text-white={pressed}
 >Next</div>