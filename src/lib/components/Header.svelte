<script>
  import Nav from '$lib/components/Nav.svelte';
</script>

<header class="site-header">
  <div class="container">
    <Nav />
  </div>
</header>

<style>
  /* Site header (navbar) */
  .site-header {
    position: absolute;
    height: 86px;
    left: 0px;
    right: 0px;
    top: 0px;
    background: #a13b1e; /* gruv-darkorange */
    padding: 0;
    border-bottom: none;
  }

  .container {
    padding: 13px 29px;
  }
</style>