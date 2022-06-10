class IPFShelper {
  ipfs = create("https://ipfs.infura.io:5001/api/v0");

  async saveToIpfs(files) {
    const source = this.ipfs.add(files);
    try {
      for await (const file of source) {
        console.log(file);
        // this.setState({ added_file_hash: file.path })
      }
    } catch (err) {
      console.error(err);
    }
  }
}
export default IPFShelper;
