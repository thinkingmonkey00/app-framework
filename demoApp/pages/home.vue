<template>
  <f7-page>

    <!-- Navbar -->
    <f7-navbar title="App Framework 2 - Demo" />

    <!-- Buttons to switch the style -->
    <f7-block>
      <f7-row>
        <f7-col><f7-button fill @click="$style('ios')">iOS</f7-button></f7-col>
        <f7-col><f7-button fill @click="$style('md')">Material</f7-button></f7-col>
      </f7-row>
    </f7-block>

    <!-- Sub pages -->
    <f7-list media-list>
      <f7-list-item title="Framework7-Vue Components" link="/f7vue/">
        <div slot="media"><img src="images/f7vue/f7-icon.png" /></div>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>
<style scoped>
  .item-media img {
    width: 24px;
  }
</style>
