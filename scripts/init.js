let tokenDict = {};

console.log("[KT] Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
  console.log("[KT] This code runs once the Foundry VTT software begins it's initialization workflow.");
});

Hooks.on("ready", function() {
  registerJSONEditorSettings();
  console.log("[KT] This code runs once core initialization is ready and game data is available.");
  let ktTokenMap = JSON.parse(game.settings.get("klindel-tokenizer", "tokenDict"));
  console.log("about to iterate over token map")
  console.log(ktTokenMap)
  ktTokenMap["Actors"].forEach(entry => {
      console.log(entry["Name"])
      console.log(entry["link"])
      let myActor = game.actors.entities.find(i => i.name === entry["Name"])
      let newData = {}
      if (myActor){
        if (myActor.data.token.img != entry["link"])
        {
          newData["token.img"] = entry["link"]
          if (entry["link"].includes("*"))
          {
            newData["token.randomImg"] = true
          }
          console.log("[KT] Updating with newData for " + entry["Name"]);
          console.log(newData);
          myActor.update(newData)
        }
      }
  });
});

async function initJSON() {
  console.log("[KT] Inside Init JSON")
  let response = await fetch("/modules/klindel-tokenizer/data/tokenMap.json")
  let data = await response.json()
  console.log("[KT] IT:")
  game.settings.set("klindel-tokenizer", "tokenDict", data);
}

async function registerJSONEditorSettings() {
  // editor content settings

  game.settings.register("klindel-tokenizer", "tokenDict", {
      scope: "world",
      config: false,
      type: String,
      default: '{\n    \n}'
  });

  console.log("[KT] Inside Init JSON")
  let response = await fetch("/modules/klindel-tokenizer/data/tokenMap.json")
  let data = await response.json()
  console.log("[KT] IT:")
  console.log(data)
  console.log(typeof(game.settings))
  await game.settings.set("klindel-tokenizer", "tokenDict", JSON.stringify(data));
}

