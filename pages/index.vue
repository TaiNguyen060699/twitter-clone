<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>
      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" />
      </div>
    </MainSection>
  </div>
</template>

<script setup>
const loading = ref(false);
const { twitterBorderColor } = useTailwindConfig();
const { useAuthUser } = useAuth();
const user = useAuthUser();
</script>
