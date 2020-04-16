class TitleHandler {
  element(element) {
    // An incoming element, such as `div`
    element.setInnerContent("Bryan's website");
  }
}

class H1TitleHandler {
  element(element) {
    // An incoming element, such as `div`
    element.setInnerContent("Hi.");
  }
}

class PHandler {
  element(element) {
    // An incoming element, such as `div`
    element.setInnerContent(
      "Congrats! You've made to Bryan Yuan's website. Bryan Yuan has captured this domain."
    );
  }
}

class AHandler {
  element(element) {
    // An incoming element, such as `div`
    element
      .setInnerContent("Go to Bryan's Linkedin profile")
      .setAttribute("href", "https://www.linkedin.com/in/yizhiyuan/");
  }
}

class ButtonHandler {
  element(element) {
    // An incoming element, such as `div`
    element.setInnerContent("Go to Bryan's Linkedin");
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  //   let cookies = document.cookie;
  //   data = {};
  //   cookies.split(";").map((str) => {
  //     let args = str.trim().split("=");
  //     data[args[0]] = args[1];
  //   })
  //   console.log(data);
  let selection = "https://cfw-takehome.developers.workers.dev/api/variants";
  let urls_res = await fetch(selection);
  let URLs = (await urls_res.json()).variants;
  let rand_url = URLs[Math.round(Math.random())];
  let res = await fetch(rand_url);
  res = new Response(res.body, res);
  return new HTMLRewriter()
    .on("h1#title", new H1TitleHandler())
    .on("a#url", new AHandler())
    .on("p#description", new PHandler())
    .on("title", new TitleHandler())
    .transform(res);
}
