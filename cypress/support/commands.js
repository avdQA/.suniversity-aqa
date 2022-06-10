// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ***********************************************

import Colors from "../e2e/pageObjects/helpers/rightSidebar/mainSection/Colors";

Cypress.Commands.add("getByTestAttr", (dataAttr, timeout = Cypress.config("defaultCommandTimeout")) => {
  const element = cy.get(`[data-test='${dataAttr}']`, { timeout });
  return element;
});

Cypress.Commands.add("setTokenToLocalStorage", (token) => {
  localStorage.setItem("X-Token", token);
});

Cypress.Commands.add("getActiveUser", (userName = "Phantom user") => {
  const [user] = Cypress.config("stage").users.filter((user) => user.name === userName);
  if (user) {
    return user;
  } else expect(user, "Unable to authenticate, user's X-Token is wrong").to.be.an("object");
});

Cypress.Commands.add("deleteDownloadsFolder", (downloadsFolder = Cypress.config("downloadsFolder")) => {
  // cy.log(`[downloadsFolder] >_ ${downloadsFolder}`);
  cy.task("deleteFolder", downloadsFolder);
});

Cypress.Commands.add("deleteItem", (targetSlug) => {
  const deleteOptions = {
    url: `${Cypress.config("stage").apiUrl}/api/files/${targetSlug}`,
    method: "DELETE",
    headers: { "x-token": localStorage.getItem("X-Token") },
  };
  cy.request(deleteOptions)
    .as("deleteItem")
    .then((resp) => {
      if (resp.status === 200) cy.log(`_> Delete ITEM by SLUG:${targetSlug} ~ is Successful`);
      else expect(resp.status, "[Deleting ITEM response status code is 200]").to.eq(200);
    });
  return cy.get("@deleteItem");
});

Cypress.Commands.add("deleteNote", (targetNoteID) => {
  const deleteOptions = {
    url: `${Cypress.config("stage").apiUrl}/api/wikis/${targetNoteID}`,
    method: "DELETE",
    headers: { "x-token": localStorage.getItem("X-Token") },
  };
  cy.request(deleteOptions)
    .as("deleteNote")
    .then((resp) => {
      if (resp.status === 200) cy.log(`_> Delete NOTE by ID:${targetNoteID} ~ is Successful`);
      else expect(resp.status, "[Deleting NOTE response status code is 200]").to.eq(200);
    });
  // return cy.get("@deleteNote");
});

Cypress.Commands.add("deleteItemPermanently", (...targetSlugs) => {
  targetSlugs = targetSlugs.filter((el) => el);
  if (targetSlugs.length) {
    const deleteOptions = {
      url: `${Cypress.config("stage").apiUrl}/api/trash/multiply`,
      method: "PUT",
      headers: { "x-token": localStorage.getItem("X-Token") },
      body: targetSlugs,
    };
    cy.request(deleteOptions).then((resp) => {
      if (resp.status === 200) {
        Cypress.env("activePage", null);
        // cy.log(`targetSlugs :>> ${targetSlugs}`);
        // cy.log(`_> MULTIPLE FOLDERs Delete Permanently ~ is Successful`);
      } else expect(resp.status, "[MULTIPLE FOLDERs Delete Permanently is 200]").to.eq(200);
    });
  }
});

Cypress.Commands.add("deleteItemFinally", (...targetSlugs) => {
  targetSlugs = targetSlugs.filter((el) => el);
  if (targetSlugs.length) {
    const deleteOptions = {
      url: `${Cypress.config("stage").apiUrl}/api/files/multiply/delete`,
      method: "DELETE",
      headers: { "x-token": localStorage.getItem("X-Token") },
      body: targetSlugs,
    };
    cy.request(deleteOptions).then((resp) => {
      if (resp.status === 200) {
        // cy.log(`targetSlugs :>> ${targetSlugs}`);
        // cy.log(`_> Delete MULTIPLE FOLDERs ~ is Successful`);
        cy.deleteItemPermanently(targetSlugs);
      } else expect(resp.status, "[Delete MULTIPLE FOLDERs is 200]").to.eq(200);
    });
  }
});

Cypress.Commands.add("createFolderIPFS", (targetFolderSlug, targetFolderName = cy.getFakeText("Folder name")) => {
  const optionsForFolder = {
    url: `${Cypress.config("stage").apiUrl}/api/folders/folder`,
    method: "POST",
    headers: { "x-token": localStorage.getItem("X-Token") },
    body: {
      name: `${targetFolderName}`,
      parent: targetFolderSlug,
    },
  };
  cy.request(optionsForFolder)
    .as("createFolderIPFS")
    .then(() => {
      cy.reload();
    });
  cy.wait("@workspaces").then(() => {
    return cy.get("@createFolderIPFS");
  });
});

Cypress.Commands.add("getFile", (url, fileName) => {
  cy.downloadFile(url, "./cypress/fixtures/downloads", fileName);
});

Cypress.Commands.add("uploadFile", (fileName = "small", fileType = "svg", filePath = "/uploads-file") => {
  const { data } = Cypress.env("activePage");
  const srcFilePath = `${filePath}/${cy.nameToProp(fileName)}.${cy.nameToProp(fileType)}`;
  const fakeFileName = `${cy.getFakeText("File name", [`${cy.nameToProp(fileType)}`])}`;
  cy.log(`[fakeFileName] >_ ${fakeFileName}`);
  cy.intercept("POST", "/api/files/ipfs").as("uploadFile");
  cy.intercept("POST", "/api/files/node/ipfs").as("uploadFile");
  cy.intercept("POST", "/api/files").as("uploadFile");
  cy.get("[data-test='drive_container'] input[type='file']").attachFile({ filePath: srcFilePath, fileName: fakeFileName, lastModified: Date.now() });
  data["file_name"] = fakeFileName;

  return cy.wait("@uploadFile");
});

Cypress.Commands.add("setSecurityPIN", (targetSlug) => {
  const options = {
    url: `${Cypress.config("stage").apiUrl}/api/files/${targetSlug}/securities/2`,
    method: "POST",
    headers: { "x-token": localStorage.getItem("X-Token") },
  };
  cy.request(options).as("setSecurityPIN");
  return cy.get("@setSecurityPIN");
});

Cypress.Commands.add("setColorToItem", (color, targetSlug) => {
  const colors = new Colors();
  colors.setColorToItem(color, targetSlug);
});

Cypress.Commands.add("setTagToItem", (targetSlug) => {
  const options = {
    url: `${Cypress.config("stage").apiUrl}/api/files/${targetSlug}/tags`,
    method: "POST",
    headers: { "x-token": localStorage.getItem("X-Token") },
    body: {
      tagsText: cy.getFakeText("tag"),
    },
  };
  cy.request(options).as("setTag");
  return cy.get("@setTag");
});

Cypress.Commands.add("setCommentToItem", (targetSlug) => {
  const options = {
    url: `${Cypress.config("stage").apiUrl}/api/files/${targetSlug}/comment`,
    method: "POST",
    headers: { "x-token": localStorage.getItem("X-Token") },
    body: {
      parent: "",
      text: cy.getFakeText("comment"),
    },
  };
  cy.request(options).as("setComment");
});
