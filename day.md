7.1
7.2
## @click="search" 和 @click="search()" 
    ```
    sync search(pages = 1) {
      this.page = pages
      const { page, limit } = this
    }
    ```
    pages是否调用