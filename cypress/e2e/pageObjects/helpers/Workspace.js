class Workspace {
  create = {
    getField(name) {
      return this.fields[name];
    },
    getButton(name) {
      return this.buttons[name];
    },
    title: "Create New Workspace",
    fields: {
      workspace_name: "section.modal input[name='workspace']",
    },
    buttons: {
      close: "button.modal__exit",
      next: "div.modal__buttons button.accept",
      ghost_cloud: "section.modal div.storage-btn button:nth-child(1)",
      ipfs: "section.modal div.storage-btn button:nth-child(2)",
      back: "section.modal div.modal__buttons button:nth-child(1)",
      create_workspace: "section.modal div.modal__buttons button.accept",
    },
  };
}
export default Workspace;
