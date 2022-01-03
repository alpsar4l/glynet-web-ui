<script lang="ts">
    import { PlusIcon } from "../../../../icons";
    import Config from "../../../../config.ts";
    import { user } from '../../../../stores.ts';
    import { onMount } from "svelte";

    let stories = {};

    onMount(async () => {
        fetch(`${Config.API_URL}/api/@me/stories/collect`)
            .then(response => response.json())
            .then(data => {
                stories = data;
            });
    });

    function slide(left: boolean = false) {
        const $ = (name: string) => <HTMLElement>window.document.querySelector(name);

        let container = $('.stories');
        let containerMaxWidth = (container.scrollWidth - container.clientWidth);
        let leftButton = $('.btn-left');
        let rightButton = $('.btn-right');

        if (left) {
            leftButton.style.display = 'flex';
            leftButton.style.opacity = '1';
            container.scrollLeft += 500;

            if (containerMaxWidth == container.scrollLeft) {
                rightButton.style.opacity = '0';
                setTimeout(() => rightButton.style.display = 'none', 100)
            }
        } else {
            rightButton.style.display = 'flex';
            rightButton.style.opacity = '1';

            if ((container.scrollLeft - 500) <= 350) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft = (container.scrollLeft - 500);
            }

            if ((container.scrollLeft - 500) < 0 || (container.scrollLeft - 500) == 0) {
                leftButton.style.opacity = '0';
                setTimeout(() => leftButton.style.display = 'none', 100)
            }
        }
    }
</script>

<div class="stories-container">
    <div class="stories">

        <div class="story">
            <div class="story-content">
                <div class="story-create-container">
                    <div class="story-create">
                        {@html PlusIcon}
                    </div>
                </div>
                <div class="story-image">
                    <div class="story-image-filter"></div>
                    <img src="{Config.CDN_URL}/{$user.avatar}" alt="">
                </div>
            </div>
            <div class="story-username">
                <span>Yeni hikaye</span>
            </div>
        </div>

        {#if JSON.stringify(stories) !== "{}"}
            {#each stories.stories as story}
                <div class="story">
                    <div class="story-content">
                        <div class="story-avatar">
                            <img src={story.content.thumbnail} alt="">
                        </div>
                        <div class="story-image">
                            <div class="story-image-filter"></div>
                            <img src={story.user.avatar} alt="">
                        </div>
                    </div>
                    <div class="story-username">
                        <span>{story.user.username}</span>
                    </div>
                </div>
            {/each}
        {/if}

    </div>

    <div class="btn-container btn-left" on:click={() => { slide(false) }}>
        <div class="btn stories-right-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-right"><rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"></rect><path d="M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z"></path></g></g></svg>
        </div>
    </div>

    <div class="btn-container btn-right" on:click={() => { slide(true) }}>
        <div class="btn stories-right-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-right"><rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"></rect><path d="M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z"></path></g></g></svg>
        </div>
    </div>
</div>

<style lang="scss">
    @import './style.scss';
</style>