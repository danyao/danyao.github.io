function loadTestPage() {
  var containerDiv = document.querySelector("div#tester");
  var testMethods = [
    "location.href",
    "location.assign()",
    "location.replace()",
    "location.reload()",
    "history.pushState()",
    "history.replaceState()",
    "history.back()",
    "history.forward()",
    "dump()"];

  var html = [];
  for (var i in testMethods) {
    var method = testMethods[i];
    html.push('<p><input type="button" onclick="run(\'' + method + '\')" value="' + method + '"></p>');
  }
  containerDiv.innerHTML = html.join('\n');
}

function run(cmd) {
  if (cmd == "location.href") {
    location.href = "1.html?q=location-href";
  } else if (cmd == "location.assign()") {
    location.assign("1.html?q=location-assign");
  } else if (cmd == "location.replace()") {
    location.replace("1.html?q=location-replace");
  } else if (cmd == "location.reload()") {
    location.reload();
  } else if (cmd == "history.pushState()") {
    history.pushState({name: "pushState"}, "Unused Title", "2.html?q=history-pushState");
  } else if (cmd == "history.replaceState()") {
    history.replaceState({name: "replaceState"}, "Unused Title", "2.html?q=history-replaceState");
  } else if (cmd == "history.back()") {
    history.back();
  } else if (cmd == "history.forward()") {
    history.forward();
  } else if (cmd == "dump()") {
    dump();
  } else {
    console.log("Unknown command: ", cmd);
  }
}

function dump() {
  console.log("location.href: ", location.href);
  console.log("history.length: ", history.length);
  console.log("history.state: ", history.state);
}
