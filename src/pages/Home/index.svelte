<script lang="ts">
    import Posts from "../../components/Posts/index.svelte";
    import Stories from "./components/Stories/index.svelte";
</script>

<div class="feed-container">
    <Stories />
    <Posts
        type="feed"
        filters={true}
    />
</div>

<style lang="scss">
    @import './style.scss';
</style>