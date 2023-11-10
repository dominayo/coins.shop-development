import _ from "lodash";

export const pagination = {
  data() {
    return {
      perPage: 5,
      pageNumber: 1
    };
  },
  computed: {
    itemsPage() {
      return _.slice(
        this.items,
        this.perPage * (this.pageNumber - 1),
        this.perPage * this.pageNumber
      );
    },
    pagesNumber() {
      return Math.ceil(this.items.length / this.perPage);
    }
  },
  methods: {
    perPageChanged(event) {
      this.perPage = event;
      this.pageNumber = 1;
    }
  }
};

export const toggle = {
  data() {
    return {
      active: {}
    };
  },
  computed: {},
  methods: {
    getKey(index) {
      return `${this.pageNumber}:${index}`;
    },
    toggleRow(index) {
      this.$set(this.active, this.getKey(index), !this.active[this.getKey(index)]);
    },
    rowState(index) {
      return !!this.active[this.getKey(index)];
    }
  }
};
