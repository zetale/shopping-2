<template>
  <q-page class="flex q-mt-sm">
    <q-spinner-hourglass v-if="loading" color="primary" size="4em"/>
    <div v-else class="full-width">
      <Login v-if="!auth"/>
      <div v-else class="full-width">
        <div v-if="items">
          <list-items :items="listItems" @markItems="markItems" @arrangeList="arrangeList"/>
          <main-footer :selected="selected" @clear="clear" class="layout fixed-bottom"/>
        </div>
        <Welcome v-else/>
      </div>
    </div>
    <div v-if="error" class="error-text q-pa-md">{{errorText}}</div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Login from "components/common/Login.vue";
import Welcome from "components/common/Welcome.vue";
import ListItems from "components/list/ListItems.vue";
import MainFooter from "components/common/MainFooter.vue";

export default {
  name: "Home",
  components: { ListItems, MainFooter, Login, Welcome },
  data: () => ({
    selected: [],
    listItems: []
  }),
  computed: {
    ...mapState({
      items: state => state.list.items,
      lists: state => state.user.lists,
      auth: state => state.user.auth,
      loading: state => state.list.loading,
      error: state => state.list.error
    }),
    errorText() {
      switch (this.error) {
        case "add":
          return "תקלה- הפריט לא התווסף";
          break;
        case "delete":
          return "תקלה- הפריט/ים לא נמחק/ו";
          break;
        case "edit":
          return "תקלה בעריכת פריט";
          break;
        default:
          return "מצטערים, נראה שיש תקלה במערכת";
          break;
      }
    }
  },
  mounted() {
    if (!this.lists) {
      this.loadLists();
    }
    this.listItems = this.items;
  },
  watch: {
    items() {
      this.listItems = this.items;
    }
  },
  methods: {
    ...mapActions({
      loadLists: "user/loadLists"
    }),
    markItems(array) {
      this.selected = array;
    },
    clear() {
      this.selected = [];
    },
    arrangeList(list) {
      this.listItems = list;
    }
  }
};
</script>

<style lang="scss">
</style>
