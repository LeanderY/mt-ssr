<template>
  <div class />
</template>

<script>
export default {
  layout: 'blank',
  middleware: async ctx => {
    const { code } = await ctx.$axios.get('/users/exit')
    if (code === 0) {
      window.location.href = '/'
    }
  }
}
</script>
