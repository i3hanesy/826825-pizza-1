<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector/>
        <BuilderSizeSelector/>
        <BuilderIngredientsSelector/>
        <BuilderPizzaView/>
      </div>
    </form>
  </main>
</template>

<script>
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";

export default {
  name: "Index",

  components: {
    BuilderIngredientsSelector,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
  },
};
</script>

<style lang="scss" scoped></style>
