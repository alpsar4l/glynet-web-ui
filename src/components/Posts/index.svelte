<script lang="ts">
    import {
        VerifiedBadge,
        ThreeDotsVertical,
        SoundOnIcon,
        SoundOffIcon,
        ReportIcon,
        AttachmentIcon,
        TrashIcon,
        GridIcon,
        TextIcon,
        AlbumIcon,
        VideoIcon,
        HeartIconFilled,
        HeartIconOutline,
        CommentsIcon,
        ShareIcon,
        BookmarksIconOutline,
        BookmarksIconFilled
    } from "../../icons";

    import Config from "../../config.ts";
    import { onMount } from "svelte";

    export let type = 'feed';
    export let query = 'unknown';
    export let filters = true;

    let posts = {};

    onMount(async () => {
        fetch(`${Config.API_URL}/api/@me/posts/${type}/${query}?raw=true`)
            .then(response => response.json())
            .then(data => {
                posts = data;
            });
    });
</script>

<div class="posts-container">
    {#if JSON.stringify(posts) !== "{}"}
        {#if posts.list}
            {#if filters}
                <div class="post-filter">
                    <div class="filters">
                        <div class="filter filter-all selected">
                            {@html GridIcon}
                        </div>
                        <div class="filter filter-text">
                            {@html TextIcon}
                        </div>
                        <div class="filter filter-image">
                            {@html AlbumIcon}
                        </div>
                        <div class="filter filter-video">
                            {@html VideoIcon}
                        </div>
                    </div>
                </div>
            {/if}

            <div class="post-list">
                {#each posts.posts as post}
                    <div class="post post-{post.id} post-type-{post.type}">
                        <div class="post-author">
                            <div class="post-author-left">
                                <div class="post-author-avatar">
                                    <img src="{Config.CDN_URL}/{post.author.avatar}" alt="">
                                </div>
                                <div class="post-author-details">
                                    <div class="post-author-name">
                                        <span>{post.author.name}</span>
                                        {#if post.author.isVerified}
                                            <div class="verified">
                                                {@html VerifiedBadge}
                                            </div>
                                        {/if}
                                    </div>
                                    <div class="post-author-username">
                                        <span data-title={post.post.date.raw}>{post.post.date.text}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="post-author-right">
                                <div class="post-more-container">
                                    <div class="post-more-button post-more-button-{post.id}">
                                        {@html ThreeDotsVertical}
                                    </div>
                                </div>
                            </div>
                            <div class="post-more-dropdown post-more-dd-{post.id}">
                                <div class="pm-content">
                                    <div class="pm-button pm-button-id-{post.id}">
                                        <div class="pm-icon">{@html ReportIcon}</div>
                                        <div class="pm-text"><span>Bildir</span></div>
                                    </div>
                                    <div class="pm-button pm-button-copy-link pm-button-id-{post.id}">
                                        <div class="pm-icon">{@html AttachmentIcon}</div>
                                        <div class="pm-text"><span>Bağlantıyı kopyala</span></div>
                                    </div>
                                    <div class="pm-button pm-button-delete pm-button-id-{post.id}">
                                        <div class="pm-icon">{@html TrashIcon}</div>
                                        <div class="pm-text"><span>Gönderiyi kaldır</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="post-content-parent">
                            {#if post.post.content.src !== ''}
                                <div class="post-image">
                                    {#if post.post.content.type === 'image'}
                                        <img src="{Config.CDN_URL}/{post.post.content.url}" alt="">
                                    {:else}
                                        <div class="video-buttons">
                                            <div class="volume">
                                                <div class="sound-on sd-on-232" style="display: none">
                                                    {@html SoundOnIcon}
                                                </div>
                                                <div class="sound-off sd-off-232">
                                                    {@html SoundOffIcon}
                                                </div>
                                            </div>
                                        </div>
                                        <video src="{Config.CDN_URL}/{post.post.content.url}" autoplay muted loop></video>
                                    {/if}
                                </div>
                            {/if}

                            {#if post.post.text.raw !== ''}
                                <div class="post-text" long="">
                                    <span>{@html post.post.text.html[0]}</span>
                                </div>
                            {/if}
                        </div>
                        <div class="post-buttons">
                            <div class="post-button-left">
                                <div class="post-button post-button-like">
                                    <div class="icon post-btn-icon-like post-btn-like-{post.id} icon-{post.likes.isLiked ? 2 : 1}">
                                        {@html HeartIconOutline}
                                        {@html HeartIconFilled}
                                    </div>
                                    <div class="text post-btn-text-like post-btn-text-like-{post.id}">
                                        <span>{post.likes.count}</span>
                                    </div>
                                </div>
                                <div class="post-button">
                                    <div class="icon">
                                        {@html CommentsIcon}
                                    </div>
                                    <div class="text">
                                        <span>{post.comments.count}</span>
                                    </div>
                                </div>
                                <div class="post-button">
                                    <div class="icon">
                                        {@html ShareIcon}
                                    </div>
                                </div>
                            </div>
                            <div class="post-button-right">
                                <div class="post-button">
                                    <div class="icon post-btn-icon-save post-btn-save-{post.id} icon-{post.bookmarks.isSaved ? 2 : 1}">
                                        {@html BookmarksIconOutline}
                                        {@html BookmarksIconFilled}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
</div>

<style lang="scss">
    @import './style.scss';
</style>