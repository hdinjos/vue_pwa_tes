<template>
  <div>
    <label for="inputFile"> Upload File </label>
    <input @change="getFile" accept=".zip" type="file" />
  </div>
</template>

<script>
import jszip from "jszip";

export default {
  data: () => ({
    newFiles: [],
  }),
  methods: {
    async getFile(e) {
      const file = e.target.files[0];
      const zip = new jszip();
      const getFileFromZip = await zip.loadAsync(file);
      getFileFromZip.forEach((filename) => {
        zip
          .file(filename)
          .async("blob")
          .then((content) => {
            const file = new File([content], filename);
            this.newFiles.push(file);
            console.log(this.newFiles);
          });
      });
      console.log(getFileFromZip);
    },
  },
};
</script>

<style>
</style>