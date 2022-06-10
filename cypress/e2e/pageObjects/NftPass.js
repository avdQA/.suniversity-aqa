export const NftPassProtected = {
  title: "Protected page",
  path: "/nft-pass",
  buttons: {
    submit: "form[id='email-form'] input[type='submit']",
  },
  fields: {
    password: "form[id='email-form'] input[type='password']",
  },
};

export const NftPass = {
  title: "NFT Pass",
  path: "/nft-pass",
  targets: {
    wrapper: "#story",
    drop_down: "#w-dropdown-toggle-0",
    buy_astro_link: ".reg-card a[href$='p-type=1']",
    buy_astro_plus_link: ".reg-card a[href$='p-type=2']",
  },

  buttons: {
    submit: "form[id='email-form'] input[type='submit']",
  },
  fields: {
    password: "form[id='email-form'] input[type='password']",
  },
};
