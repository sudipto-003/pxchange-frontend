<template>
  <div class="home">
    <b-row>
      <b-col>
        <SideBar/>
      </b-col>
      <b-col lg="9" sm="12">
        <Page/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SideBar from '../components/SideBar'
import Page from '../components/Page'
export default {
  name: 'Home',
  components: {
    SideBar,
    Page
  }
  
}
</script>
