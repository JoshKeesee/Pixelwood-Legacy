const plainTypes = ["tree", "small-tree", "flower", "blue-flower", "purple-flower"];
const ores = ["emerald", "diamond", "gold", "iron", "ruby"];
const scenes = [
  {
    width: 20,
    height: 10,
    type: "plains",
    scenery: [],
    num: 80,
  },
  {
    width: 6,
    height: 4,
    type: "house",
    scenery: [],
  },
  {
    width: 6,
    height: 3,
    type: "house",
    scenery: [],
  },
  {
    width: 10,
    height: 10,
    type: "plains",
    scenery: [],
    num: 60,
  },
  {
    width: 32,
    height: 32,
    type: "cave",
    scenery: [],
    num: 200,
  },
  {
    width: 6,
    height: 4,
    type: "house",
    scenery: [],
  },
  {
    width: 10,
    height: 10,
    type: "plains",
    scenery: [],
    num: 60,
  },
  {
    width: 20,
    height: 10,
    type: "plains",
    scenery: [],
    num: 150,
  },
  {
    width: 40,
    height: 40,
    type: "cave",
    scenery: [],
    num: 200,
  },
];

for (var i = 0; i < scenes.length; i++) {
  var scenery = scenes[i].scenery;
  if (scenes[i].type === "plains") {
    for (var x = 0; x < scenes[i].num; x++) {
      var xCord = Math.floor(Math.random() * 3600);
      var yCord = Math.floor(Math.random() * 1600);

      if (i === 6 || i === 3) {
        xCord = Math.floor(Math.random() * 1600);
        yCord = Math.floor(Math.random() * 1600);
      }
  
      if (i === 0 && xCord > 1000 && yCord < 1000) {
        xCord = Math.floor(Math.random() * 1600);
        yCord = Math.floor(Math.random() * 600) + 1000;
      }

      if (i === 0 && xCord > 1800) {
        xCord = Math.floor(Math.random() * 1200);
        yCord = Math.floor(Math.random() * 600) + 1000;
      }
      
      if (i === 3 && xCord < 1200 && yCord < 1100) {
        xCord = Math.floor(Math.random() * 600) + 1200;
        yCord = Math.floor(Math.random() * 600) + 1100;
      }

      if (i === 6 && xCord < 1000 && yCord < 1100) {
        xCord = Math.floor(Math.random() * 1000) + 1000;
        yCord = Math.floor(Math.random() * 600) + 1100;
      }

      if (i === 7 && xCord > 2000 && yCord < 1100) {
        xCord = Math.floor(Math.random() * 2000);
        yCord = Math.floor(Math.random() * 600) + 1100;
      }
      
      scenes[i].scenery[x] = {
        x: xCord,
        y: yCord,
        type: plainTypes[Math.floor(Math.random() * (plainTypes.length - 1))],
        opacity: 1,
      }
    }
  } else if (scenes[i].type === "cave") {
    updateCave(i);
  } else if (scenes[i].type === "house") {
    if (i === 1) {
      scenery[scenery.length] = {
        x: 0,
        y: -80,
        type: "ladder",
        toScene: 2,
        toX: 0,
        toY: 0,
      }
      
      scenery[scenery.length] = {
        x: 200 * 5,
        y: 200 * 3 + 190,
        type: "exit",
        toScene: 0,
        toX: 0,
        toY: 0,
      }

      scenery[scenery.length] = {
        x: 200 * 5,
        y: -20,
        type: "bed",
      }

      scenery[scenery.length] = {
        x: 200,
        y: 0,
        type: "workbench",
      }

      scenery[scenery.length] = {
        x: 450,
        y: 0,
        type: "chest",
      }

      scenery[scenery.length] = {
        x: 350,
        y: 0,
        type: "furnace",
      }

      scenery[scenery.length] = {
        x: 200,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 300,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 400,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 500,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 600,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 700,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 800,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 900,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 1000,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 1100,
        y: -80,
        type: "glass",
      }
    } else if (i === 2) {
      scenery[0] = {
        x: 0,
        y: 0,
        type: "ladder",
        toScene: 1,
        toX: 0,
        toY: 20,
      }

      scenery[scenery.length] = {
        x: 0,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 100,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 200,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 300,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 400,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 500,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 600,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 700,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 800,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 900,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 1000,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 1100,
        y: -80,
        type: "glass",
      }
    } else if (i === 5) {
      scenery[scenery.length] = {
        x: 200 * 5,
        y: 200 * 3 + 190,
        type: "exit",
        toScene: 0,
        toX: 0,
        toY: 0,
      }

      scenery[scenery.length] = {
        x: 0,
        y: -20,
        type: "bed",
      }

      scenery[scenery.length] = {
        x: 650,
        y: 0,
        type: "workbench",
      }

      scenery[scenery.length] = {
        x: 450,
        y: 0,
        type: "chest",
      }

      scenery[scenery.length] = {
        x: 300,
        y: 0,
        type: "furnace",
      }

      scenery[scenery.length] = {
        x: 0,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 100,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 200,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 300,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 400,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 500,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 600,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 700,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 800,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 900,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 1000,
        y: -80,
        type: "glass",
      }

      scenery[scenery.length] = {
        x: 1100,
        y: -80,
        type: "glass",
      }
    }
  }
}

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3600,
  y: 200,
  type: "dirt",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3400,
  y: 200,
  type: "dirt",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3400,
  y: 400,
  type: "dirt",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3600,
  y: 400,
  type: "dirt",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3600,
  y: 600,
  type: "dirt",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3400,
  y: 600,
  type: "dirt",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3400,
  y: 100,
  type: "fence-horizontal",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3500,
  y: 100,
  type: "fence-horizontal",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3600,
  y: 100,
  type: "fence-horizontal",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3700,
  y: 100,
  type: "fence-horizontal",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3400,
  y: 800,
  type: "fence-horizontal",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3700,
  y: 800,
  type: "fence-horizontal",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3369,
  y: 100,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3369,
  y: 200,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3369,
  y: 300,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3369,
  y: 400,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3369,
  y: 500,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3369,
  y: 600,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3369,
  y: 700,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3800,
  y: 100,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3800,
  y: 200,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3800,
  y: 300,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3800,
  y: 400,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3800,
  y: 500,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3800,
  y: 600,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3800,
  y: 700,
  type: "fence-vertical",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3500,
  y: 800,
  type: "fence-post",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3670,
  y: 800,
  type: "fence-post",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3369,
  y: 800,
  type: "fence-post",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3800,
  y: 800,
  type: "fence-post",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2110,
  y: 1270,
  type: "fountain",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2500,
  y: 100,
  type: "house",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2500 + 275,
  y: 100 + 600 - 85,
  type: "exit",
  toScene: 1,
  toX: 2500 + 275,
  toY: 100 + 600 - 85,
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 1300,
  y: 100,
  type: "house",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 1300 + 275,
  y: 100 + 600 - 85,
  type: "exit",
  toScene: 5,
  toX: 2500 + 275,
  toY: 100 + 600 - 85,
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2750,
  y: 700,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 1550,
  y: 500,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 1550,
  y: 700,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 1550,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 1750,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 1950,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2150,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2150,
  y: 1100,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2150,
  y: 1300,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 1950,
  y: 1300,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2350,
  y: 1300,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 1950,
  y: 1500,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2150,
  y: 1500,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2350,
  y: 1500,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2150,
  y: 1700,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2150,
  y: 1800,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2150,
  y: 1990,
  type: "change",
  toScene: 7,
  toX: 2150,
  toY: 20,
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2350,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2550,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2750,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 2950,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3150,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3350,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3550,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3750,
  y: 900,
  type: "path",
};

scenes[0].scenery[scenes[0].scenery.length] = {
  x: 3950,
  y: 900,
  type: "change",
  toScene: 3,
  toX: 15,
  toY: 900,
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 0,
  y: 900,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: -190,
  y: 900,
  type: "change",
  toScene: 0,
  toX: 3850,
  toY: 900,
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 200,
  y: 900,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 400,
  y: 900,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 600,
  y: 900,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 100,
  y: 500,
  type: "small-tree",
  opacity: 1,
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 600,
  y: 500,
  type: "small-tree",
  opacity: 1,
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 800,
  y: 900,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 900,
  y: 800,
  type: "sign",
  text: "Cave",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 1000,
  y: 900,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 1000,
  y: 700,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 1000,
  y: 500,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 1000,
  y: 300,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 1000,
  y: 100,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 800,
  y: 100,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 600,
  y: 100,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 400,
  y: 100,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 100,
  y: 0,
  type: "cave",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 295,
  y: 125,
  type: "ladder",
  toScene: 4,
  toX: 0,
  toY: 0,
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 1900,
  y: 1875,
  type: "easter egg",
}

scenes[4].scenery[scenes[4].scenery.length] = {
  x: 0,
  y: -80,
  type: "ladder",
  toScene: 3,
  toX: 345,
  toY: 100,
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 800,
  y: 1100,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 800,
  y: 1300,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 800,
  y: 1500,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 800,
  y: 1700,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 800,
  y: 1800,
  type: "path",
};

scenes[3].scenery[scenes[3].scenery.length] = {
  x: 800,
  y: 1990,
  type: "change",
  toScene: 6,
  toX: 800,
  toY: 20,
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: 800,
  y: -190,
  type: "change",
  toScene: 3,
  toX: 800,
  toY: 1800,
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: 800,
  y: 0,
  type: "path",
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: 800,
  y: 200,
  type: "path",
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: 800,
  y: 400,
  type: "path",
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: 800,
  y: 600,
  type: "path",
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: 800,
  y: 800,
  type: "path",
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: 600,
  y: 800,
  type: "path",
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: 400,
  y: 800,
  type: "path",
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: 200,
  y: 800,
  type: "path",
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: 0,
  y: 800,
  type: "path",
};

scenes[6].scenery[scenes[6].scenery.length] = {
  x: -190,
  y: 800,
  type: "change",
  toScene: 7,
  toX: 3860,
  toY: 800,
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 3990,
  y: 800,
  type: "change",
  toScene: 6,
  toX: 20,
  toY: 800,
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 2150,
  y: -190,
  type: "change",
  toScene: 0,
  toX: 2150,
  toY: 1860,
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 2150,
  y: 0,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 2150,
  y: 200,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 2150,
  y: 400,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 2150,
  y: 600,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 2150,
  y: 800,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 2350,
  y: 800,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 2550,
  y: 800,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 2750,
  y: 800,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 2950,
  y: 800,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 3150,
  y: 800,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 3350,
  y: 800,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 3550,
  y: 800,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 3750,
  y: 800,
  type: "path",
};

scenes[7].scenery[scenes[7].scenery.length] = {
  x: 3800,
  y: 800,
  type: "path",
};

function updateCave(i) {
  for (var y = 0; y < scenes[i].height; y++) {
    for (var x = 0; x < scenes[i].width; x++) {
      scenes[i].scenery[scenes[i].scenery.length] = {
        x: 200 * x,
        y: 200 * y,
        type: "box",
        opacity: 1,
      }
    }
  }

  for (var x = 0; x < scenes[i].num; x++) {
    var xCord = Math.floor(Math.random() * scenes[i].width);
    var yCord = Math.floor(Math.random() * scenes[i].height);
    
    scenes[i].scenery[scenes[i].scenery.length] = {
      x: xCord * 200,
      y: yCord * 200,
      type: ores[Math.floor(Math.random() * ores.length)],
      mining: 1,
      mined: false,
    }

    if (scenes[i].scenery[scenes[i].scenery.length - 1].type === "diamond") {
      scenes[i].scenery[scenes[i].scenery.length - 1].miningSpeed = 0.00001;
    } else if (scenes[i].scenery[scenes[i].scenery.length - 1].type === "emerald") {
      scenes[i].scenery[scenes[i].scenery.length - 1].miningSpeed = 0.000009;
    } else if (scenes[i].scenery[scenes[i].scenery.length - 1].type === "iron") {
      scenes[i].scenery[scenes[i].scenery.length - 1].miningSpeed = 0.001;
    } else if (scenes[i].scenery[scenes[i].scenery.length - 1].type === "gold") {
      scenes[i].scenery[scenes[i].scenery.length - 1].miningSpeed = 0.01;
    } else if (scenes[i].scenery[scenes[i].scenery.length - 1].type === "ruby") {
      scenes[i].scenery[scenes[i].scenery.length - 1].miningSpeed = 0.0001;
    }
  }

  var intX = 0;
  var intY = 0;
  
  delete scenes[i].scenery[0];

  for (var x = 0; x < scenes[i].width * scenes[i].height; x++) {
    if (x % 2 === 0) {
      intX += randomNumber(-1, 1);
    } else {
      intY += randomNumber(-1, 1);
    }

    if (intX < 0) {
      intX = 0;
    }
    if (intY < 0) {
      intY = 0;
    }
    if (intX > scenes[i].width) {
      intX = scenes[i].width;
    }
    if (intY > scenes[i].height) {
      intY = scenes[i].height;
    }

    if (intX + intY * scenes[i].height < scenes[i].scenery.length) {
      delete scenes[i].scenery[intX + intY * scenes[i].height];
    }
  }
}

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = scenes;