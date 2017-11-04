<template>
  <div>

    <!-- Framework7-Vue kitchen sink elements -->
    <f7-statusbar></f7-statusbar>
    <f7-panel left cover>
      <f7-view url="/f7vue/panel-left/" links-view=".view-main" />
    </f7-panel>
    <f7-panel right reveal>
      <f7-view url="/f7vue/panel-right/"></f7-view>
    </f7-panel>

    <!-- Main view -->
    <f7-view url="/" main></f7-view>

  </div>
</template>
<script>

  // Framework7-Vue kitchen sink CSS
  import './f7vue.css'

  // Default export to avoid compiling errors
  export default {}

</script>
