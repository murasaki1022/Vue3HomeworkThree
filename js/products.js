import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
createApp({
  data() {
    return {
      apiUrl: `https://vue3-course-api.hexschool.io`,
      path: `murasaki1022`,
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/v2/api/user/check`;
      axios
        .post(url)
        .then((response) => {
          this.getProductList();
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
          window.location = "index.html";
        });
    },
    getProductList() {
      const url = `${this.apiUrl}/v2/api/${this.path}/admin/products`;
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkAdmin();
  },
}).mount("#app");
