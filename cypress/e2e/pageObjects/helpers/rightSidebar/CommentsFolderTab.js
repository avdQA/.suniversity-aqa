class CommentsFolderTab {
  comments = {
    container: "div[class='entity-settings__message-comments-wrapper']",
    item_text: "section div.entity-settings__message-comment",
    item_reply_button: "section div.entity-settings__message-comment button",
  };

  buttons = {
    tab: "[data-test='action-tabs_message_button']",
    cancel: "[data-test='comment-tab_cancel']",
    submit: "[data-test='comment-tab_comment']",
  };

  fields = {
    comment: "[data-test='comment-tab_input']",
  };

  getButton(name) {
    return this.buttons[`${cy.nameToProp(name)}`];
  }

  getField(name) {
    return this.fields[`${cy.nameToProp(name)}`];
  }

  getCommentText() {
    return cy.get(this.comments.container).find(this.comments.item_text);
  }

  clickOnSubmit() {
    cy.intercept("POST", `/api/files/*/comment`).as("postComment");
    cy.get(this.buttons.submit).click({ force: true });
    return cy.wait("@postComment");
  }

  selectTab() {
    cy.get(this.buttons.tab).click({ force: true });
  }
}
export default CommentsFolderTab;
