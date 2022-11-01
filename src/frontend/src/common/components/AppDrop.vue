<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";
import { mapGetters } from "vuex";
export default {
  name: "AppDrop",

  computed: {
    ...mapGetters("Builder", {
        pizzaPrice: "pizzaPrice",
      }),
  },

  methods: {
    onDrop({ dataTransfer }) {
      const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
      if (payload) {
        const transferData = JSON.parse(
          dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
        );
        this.$emit("drop", transferData);
      }
      this.pizzaPrice
    },
  },
};
</script>
