// FONTS
let _fonts = {
    target: 3,
    loaded: 0,
}

//let roboto_400 = new FontFace("roboto_400", "url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxK.woff2)");
//let roboto_mono_700 = new FontFace("roboto_mono_700", "url(https://fonts.gstatic.com/s/robotomono/v21/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Of2_ROW4.woff2)");
//let roboto_900 = new FontFace("roboto_900", "url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmYUtfBBc4.woff2)");
//let libre_bodoni_700 = new FontFace("libre_bodoni_700", "url(https://fonts.gstatic.com/s/librebodoni/v2/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6GpY8WvTcQ.woff2)");
let montserrat_light = new FontFace("montserrat_light", "url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw5aXo.woff2)");
let montserrat_regular = new FontFace("montserrat_regular", "url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2)");
let montserrat_bold = new FontFace("montserrat_bold", "url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aXo.woff2)");
let lato_light = new FontFace("lato_light", "url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwiPGQ.woff2) format('woff2')");
let lato_bold = new FontFace("lato_bold", "url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPGQ.woff2)");
let secular_one_regular = new FontFace("secular_one_regular", "url(https://fonts.gstatic.com/s/secularone/v11/8QINdiTajsj_87rMuMdKyqDiOOg.woff2)");
let oswald_bold = new FontFace("oswald_bold", "url(https://fonts.gstatic.com/s/oswald/v49/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZosUZiZQ.woff2)");

// @ADD integrate above into this function
async function font(f) {
    await f.load();
    document.fonts.add(f);
    _fonts.loaded += 1;
}

//font(roboto_400);
//font(roboto_mono_700);
//font(libre_bodoni_700);
//font(roboto_900);
font(montserrat_light);
font(montserrat_regular);
font(montserrat_bold);
font(lato_light);
font(lato_bold);
font(secular_one_regular);
font(oswald_bold);