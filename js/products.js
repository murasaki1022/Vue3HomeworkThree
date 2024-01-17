import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let productModal = null;
let delProductModal = null;

createApp({
  data() {
    return {
      apiUrl: `https://vue3-course-api.hexschool.io`,
      path: `murasaki1022`,
      products: [],
      isNew: false,
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
    openModal(status, item) {
      if (status === "new") {
        this.tempProduct = {};
        this.isNew = true;
        productModal.show();
      } else if (status === "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (status === "delete") {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkAdmin();

    productModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      {
        keyboard: false,
        backdrop: "static",
      }
    );

    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false,
        backdrop: "static",
      }
    );
  },
}).mount("#app");
