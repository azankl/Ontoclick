<template>
  <div id="app" class="container">
    <SearchBox></SearchBox>
  </div>
</template>

<script>
import SearchBox from './components/SearchBox/SearchBox';

export default {
  components: { SearchBox },
};
</script>

<style lang="sass">

  // Bootstrap
  $icon-font-path: '../node_modules/bootstrap-sass/assets/fonts/bootstrap/'
  $link-color: #039be5
  $brand-success: #039be5
  $form-group-margin-bottom: 3px
  @import 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap'

  // font awesome
  $fa-font-path: '../node_modules/font-awesome/fonts/'
  @import 'node_modules/font-awesome/scss/font-awesome'

  body
    background-color: #EEEEEE

  #app
    background: #EEEEEE
    padding-top: 5px

  .table
    background-color: #FFFFFF
    border-radius: 4px

  //some styling adaptations
  h3
    color: #2887d4
    margin-top: 7px
  p
    text-align: left
</style>
