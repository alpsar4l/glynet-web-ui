<script lang="ts">
    import { onMount } from "svelte";
    import { VerifiedBadge, SearchIcon, TrendingUpIcon, ArrowDownIcon, ArrowUpIcon } from "../../scripts/icons";
    import { user, rank } from '../../scripts/stores.ts';
    import Config from "../../scripts/config";

    let suggested_contacts = [];
    let trending_topics = [];
    let trending_show_more = false;

    onMount(async () => {
        fetch(`${Config.API_URL}/api/@me/suggested_contacts`)
            .then(response => response.json())
            .then(data => {
                suggested_contacts = data;
            });

        fetch(`${Config.API_URL}/api/@me/trends`)
            .then(response => response.json())
            .then(data => {
                trending_topics = data['trends'];
            });
    });
</script>

<div class="fixed-right">
    <div class="details">

        <div class="box fixed">
            <div class="right-header">
                <div class="user">
                    <div class="details">
                        <div class="profile-picture">
                            <img src="{Config.CDN_URL}/{$user.avatar}" alt="">
                        </div>
                    </div>
                </div>
                <div class="rank">
                    <div class="level-container">
                        <div class="text">
                            <span>Seviye</span><span>{$rank.level} / {$rank.level + 1}</span>
                        </div>
                        <div class="road">
                            <div class="road-completed" style="width: {$rank.percent}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="box">
            <div class="title">
                <span>Gündem</span>
            </div>
            <div class="box-contact">
                <div class="trending-topics">
                    {#if trending_topics !== []}
                        {#each trending_topics as topic, i}
                            <div class="trend-container" hide="{ i > 3 ? !trending_show_more : false }">
                                <div class="trending-up-icon">
                                    {#if topic.icon === 1}
                                        {@html TrendingUpIcon}
                                    {:else}
                                        {@html SearchIcon}
                                    {/if}
                                </div>
                                <div class="trending-details">
                                    <span>{topic.icon === 1 ? '#' : ''}{topic.title}</span>
                                    <span>{topic.description}</span>
                                </div>
                            </div>
                        {/each}
                    {/if}

                    {#if !trending_show_more}
                        <div class="trend-show-more" on:click={() => { trending_show_more = true; }}>
                            <div class="text">
                                <span>Daha fazlasını göster</span>
                            </div>
                            <div class="icon">
                                {@html ArrowDownIcon}
                            </div>
                        </div>
                    {:else}
                        <div class="trend-show-more" on:click={() => { trending_show_more = false; }}>
                            <div class="text">
                                <span>Azalt</span>
                            </div>
                            <div class="icon">
                                {@html ArrowUpIcon}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <div class="box">
            <div class="title">
                <span>Önerilen kişiler</span>
            </div>
            <div class="box-contact">
                <div class="suggested-contacts">
                    {#if suggested_contacts !== []}
                        {#each suggested_contacts as contact}
                            <div class="contact">
                                <div class="avatar">
                                    <img src="{Config.CDN_URL}/{contact.avatar}" alt="">
                                </div>
                                <div class="details">
                                    <div class="name">
                                        <span>{contact.name}</span>
                                        {#if contact.isVerified}
                                            {@html VerifiedBadge}
                                        {/if}
                                    </div>
                                    <div class="username">
                                        <span>@{contact.username}</span>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>

    </div>
</div>

<style lang="scss">
    @import 'Right';
</style>