<script>
    // This is the chat bubble for every message
    export let isUser ;
    // String to hold the message
    export let message = "";
    export let time;
</script>
<style>
    .user{
        border-radius: 10px 10px 0% 10px / 10px 10px 0% 10px ;
    }
    .other{
        border-radius: 10px 10px 10px 0% / 10px 10px 10px 0% ;
    }
</style>
<!-- The design of the chat bubble -->
    <div class="max-w-sm w-fit mr-0 p-2 mt-2" 
    class:ml-auto={isUser}
    class:bg-blue-100={isUser}
    class:bg-gray-200={!isUser}
    class:user={isUser}
    class:other={!isUser}
    >
    <div>{message}</div>
    <div class="text-gray-600 text-xs"
    class:text-right={isUser}
    class:ml-2={isUser}
    class:mr-2={!isUser}
    >{time}</div>
</div>