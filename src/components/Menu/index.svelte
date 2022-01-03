<script lang="ts">
    import { tab } from '../../stores.ts';
    import * as Icon from '../../icons';

    const menuItems = [
        {
            "path": "feed",
            "title": "Ana sayfa",
            "icon": Icon.FeedIcon
        },
        {
            "path": "explore",
            "title": "Keşfet",
            "icon": Icon.ExploreIcon
        },
        {
            "path": "profile",
            "title": "Profilim",
            "icon": Icon.UserIcon
        },
        {
            "path": "search",
            "title": "Arama",
            "icon": Icon.SearchIcon
        },
        {
            "path": "messages",
            "title": "Mesajlar",
            "icon": Icon.MessageIcon
        },
        {
            "path": "create_post",
            "title": "Gönderi oluştur",
            "icon": Icon.PlusIcon
        },
        {
            "path": "history",
            "title": "Geçmiş",
            "icon": Icon.HistoryIcon
        },
        {
            "path": "bookmarks",
            "title": "Kaydedilenler",
            "icon": Icon.StarIcon
        },
        {
            "path": "premium",
            "title": "Glynet Premium",
            "icon": Icon.PremiumIcon
        },
        {
            "path": "settings",
            "title": "Ayarlar",
            "icon": Icon.SettingsIcon
        },
    ];

    let current_tab;

    tab.subscribe(value => {
        current_tab = value;
    });

    function changePath(path) {
        history.pushState('', '', path);
        tab.update(n => path);
    }
</script>

<div class="menu">
    {#each menuItems as item}
    <div on:click={() => { changePath(item.path) }} class="menu-item" selected="{current_tab === item.path}">
        <div class="icon">
            {@html item.icon}
        </div>
    </div>
    {/each}
</div>

<style lang="scss">
    @import './style.scss';
</style>