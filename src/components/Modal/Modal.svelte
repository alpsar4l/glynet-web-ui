<script lang="ts">
    export let id: string;
    export let type: number = 5;
    export let title: string = 'Bir başlık gir';
</script>

<div id={id} class="modal">
    <div class="modal-content" fill>
        <div class="template-{type}">
            {#if type === 5}
                <div class="title">{title}</div>
                <slot></slot>
            {:else}
                <span>buralar yapılacak</span>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    @import "../../styles/components/modals";
</style>