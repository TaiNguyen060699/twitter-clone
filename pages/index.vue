<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>
    </MainSection>
  </div>
</template>

<script setup>
const loading = ref(false);
</script>
