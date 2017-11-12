<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Framework7">
      <f7-nav-right>
        <a class="link icon-only searchbar-enable" data-searchbar=".searchbar-components">
          <i class="icon f7-icons ios-only">search_strong</i>
          <i class="icon material-icons md-only">search</i>
        </a>
      </f7-nav-right>
      <form data-search-container=".components-list" data-search-in="a" class="searchbar searchbar-expandable searchbar-components searchbar-init">
        <div class="searchbar-inner">
          <div class="searchbar-input-wrap">
            <input type="search" placeholder="Search components"/>
            <i class="searchbar-icon"></i>
            <span class="input-clear-button"></span>
          </div>
          <span class="searchbar-disable-button">Cancel</span>
        </div>
      </form>
    </f7-navbar>

    <f7-list class="searchbar-hide-on-search">
      <f7-list-item title="About Framework7" link="/f7vue/about/"></f7-list-item>
    </f7-list>

    <f7-block-title class="searchbar-found">Components</f7-block-title>
    <f7-list class="components-list searchbar-found">
      <f7-list-item link="/f7vue/accordion/" title="Accordion"></f7-list-item>
      <f7-list-item link="/f7vue/action-sheet/" title="Action Sheet"></f7-list-item>
      <f7-list-item link="/f7vue/autocomplete/" title="Autocomplete"></f7-list-item>
      <f7-list-item link="/f7vue/badge/" title="Badge"></f7-list-item>
      <f7-list-item link="/f7vue/buttons/" title="Buttons"></f7-list-item>
      <f7-list-item link="/f7vue/calendar/" title="Calendar / Date Picker" badge="TODO"></f7-list-item>
      <f7-list-item link="/f7vue/cards/" title="Cards"></f7-list-item>
      <f7-list-item link="/f7vue/checkbox/" title="Checkbox"></f7-list-item>
      <f7-list-item link="/f7vue/chips/" title="Chips/Tags"></f7-list-item>
      <f7-list-item link="/f7vue/contacts-list/" title="Contacts List"></f7-list-item>
      <f7-list-item link="/f7vue/content-block/" title="Content Block"></f7-list-item>
      <f7-list-item link="/f7vue/data-table/" title="Data Table"></f7-list-item>
      <f7-list-item link="/f7vue/dialog/" title="Dialog"></f7-list-item>
      <f7-list-item link="/f7vue/fab/" title="FAB"></f7-list-item>
      <f7-list-item link="/f7vue/fab-morph/" title="FAB Morph"></f7-list-item>
      <f7-list-item link="/f7vue/form-storage/" title="Form Storage"></f7-list-item>
      <f7-list-item link="/f7vue/icons/" title="Icons"></f7-list-item>
      <f7-list-item link="/f7vue/infinite-scroll/" title="Infinite Scroll"></f7-list-item>
      <f7-list-item link="/f7vue/inputs/" title="Inputs"></f7-list-item>
      <f7-list-item link="/f7vue/grid/" title="Grid / Layout Grid"></f7-list-item>
      <f7-list-item link="/f7vue/lazy-load/" title="Lazy Load"></f7-list-item>
      <f7-list-item link="/f7vue/list/" title="List View"></f7-list-item>
      <f7-list-item link="/f7vue/login-screen/" title="Login Screen"></f7-list-item>
      <f7-list-item link="/f7vue/messages/" title="Messages"></f7-list-item>
      <f7-list-item link="/f7vue/navbar/" title="Navbar"></f7-list-item>
      <f7-list-item link="/f7vue/notifications/" title="Notifications"></f7-list-item>
      <f7-list-item link="/f7vue/panel/" title="Panel / Side Panels"></f7-list-item>
      <f7-list-item link="/f7vue/picker/" title="Picker" badge="TODO"></f7-list-item>
      <f7-list-item link="/f7vue/photo-browser/" title="Photo Browser"></f7-list-item>
      <f7-list-item link="/f7vue/popup/" title="Popup"></f7-list-item>
      <f7-list-item link="/f7vue/popover/" title="Popover"></f7-list-item>
      <f7-list-item link="/f7vue/preloader/" title="Preloader"></f7-list-item>
      <f7-list-item link="/f7vue/progressbar/" title="Progress Bar"></f7-list-item>
      <f7-list-item link="/f7vue/pull-to-refresh/" title="Pull To Refresh"></f7-list-item>
      <f7-list-item link="/f7vue/radio/" title="Radio"></f7-list-item>
      <f7-list-item link="/f7vue/range/" title="Range Slider"></f7-list-item>
      <f7-list-item link="/f7vue/searchbar/" title="Searchbar"></f7-list-item>
      <f7-list-item link="/f7vue/searchbar-expandable/" title="Searchbar Expandable"></f7-list-item>
      <f7-list-item link="/f7vue/sheet-modal/" title="Sheet Modal"></f7-list-item>
      <f7-list-item link="/f7vue/smart-select/" title="Smart Select"></f7-list-item>
      <f7-list-item link="/f7vue/sortable/" title="Sortable List"></f7-list-item>
      <f7-list-item link="/f7vue/statusbar/" title="Statusbar"></f7-list-item>
      <f7-list-item link="/f7vue/subnavbar/" title="Subnavbar"></f7-list-item>
      <f7-list-item link="/f7vue/swipeout/" title="Swipeout (Swipe To Delete)"></f7-list-item>
      <f7-list-item link="/f7vue/swiper/" title="Swiper Slider"></f7-list-item>
      <f7-list-item link="/f7vue/tabs/" title="Tabs"></f7-list-item>
      <f7-list-item link="/f7vue/timeline/" title="Timeline"></f7-list-item>
      <f7-list-item link="/f7vue/toast/" title="Toast"></f7-list-item>
      <f7-list-item link="/f7vue/toggle/" title="Toggle"></f7-list-item>
      <f7-list-item link="/f7vue/toolbar-tabbar/" title="Toolbar & Tabbar"></f7-list-item>
      <f7-list-item link="/f7vue/virtual-list/" title="Virtual List"></f7-list-item>
    </f7-list>
    <f7-list class="searchbar-not-found">
      <f7-list-item title="Nothing found"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7NavRight, f7BlockTitle, f7List, f7ListItem } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7NavRight,
      f7BlockTitle,
      f7List,
      f7ListItem,
    },
  };
</script>
