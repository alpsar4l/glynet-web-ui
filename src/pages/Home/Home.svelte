<script lang="ts">
    import Posts from "../../components/Posts/Posts.svelte";
    import Stories from "./components/Stories/Stories.svelte";
</script>

<div class="feed-container">
    <Stories />
    <Posts
        type="feed"
        filters={true}
    />
</div>

<style lang="scss">
    @import 'Home';
</style>