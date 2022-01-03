<script lang="ts">
    import { SearchIcon, PremiumIcon, MoonIcon, BellIcon, AttachmentIcon } from '../../icons';
</script>

<div class="header">
    <div class="hdr-logo">
        <div class="logo">
            {@html PremiumIcon}
        </div>
    </div>
    <div class="hdr-right">
        <div class="hdr-btn">
            <div class="icon">
                {@html MoonIcon}
            </div>
        </div>
        <div class="hdr-btn">
            <div class="icon">
                {@html AttachmentIcon}
            </div>
        </div>
        <div class="hdr-btn">
            <div class="icon">
                {@html BellIcon}
            </div>
        </div>

        <div class="search-container">
            <div class="area">
                <input type="text" placeholder="Bir şeyler arayın">
            </div>
            <div class="icon">
                {@html SearchIcon}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import './style.scss';
</style>