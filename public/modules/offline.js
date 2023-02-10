const plainTypes = ["tree", "small-tree", "flower", "blue-flower", "purple-flower"];
const ores = ["emerald", "diamond", "gold", "iron", "ruby"];
const offlineScenes = [
  {
    width: 20,
    height: 10,
    type: "plains",
    scenery: [],
    num: 40,
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
    num: 20,
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
    num: 40,
  },
  {
    width: 20,
    height: 10,
    type: "plains",
    scenery: [],
    num: 40,
  },
];

for (var i = 0; i < offlineScenes.length; i++) {
  var scenery = offlineScenes[i].scenery;
  if (offlineScenes[i].type === "plains") {
    for (var x = 0; x < offlineScenes[i].num; x++) {
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
      
      offlineScenes[i].scenery[x] = {
        x: xCord,
        y: yCord,
        type: plainTypes[Math.floor(Math.random() * (plainTypes.length - 1))],
        opacity: 1,
        mining: 1,
        mined: false,
        miningSpeed: 0.01,
      }
    }
  } else if (offlineScenes[i].type === "cave") {
    updateCave(i);
  } else if (offlineScenes[i].type === "house") {
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

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3600,
  y: 200,
  type: "dirt",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3400,
  y: 200,
  type: "dirt",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3400,
  y: 400,
  type: "dirt",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3600,
  y: 400,
  type: "dirt",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3600,
  y: 600,
  type: "dirt",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3400,
  y: 600,
  type: "dirt",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3400,
  y: 100,
  type: "fence-horizontal",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3500,
  y: 100,
  type: "fence-horizontal",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3600,
  y: 100,
  type: "fence-horizontal",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3700,
  y: 100,
  type: "fence-horizontal",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3400,
  y: 800,
  type: "fence-horizontal",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3700,
  y: 800,
  type: "fence-horizontal",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3369,
  y: 100,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3369,
  y: 200,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3369,
  y: 300,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3369,
  y: 400,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3369,
  y: 500,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3369,
  y: 600,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3369,
  y: 700,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3800,
  y: 100,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3800,
  y: 200,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3800,
  y: 300,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3800,
  y: 400,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3800,
  y: 500,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3800,
  y: 600,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3800,
  y: 700,
  type: "fence-vertical",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3500,
  y: 800,
  type: "fence-post",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3670,
  y: 800,
  type: "fence-post",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3369,
  y: 800,
  type: "fence-post",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3800,
  y: 800,
  type: "fence-post",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2110,
  y: 1270,
  type: "fountain",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2500,
  y: 100,
  type: "house",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2500 + 275,
  y: 100 + 600 - 85,
  type: "exit",
  toScene: 1,
  toX: 2500 + 275,
  toY: 100 + 600 - 85,
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 1300,
  y: 100,
  type: "house",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 1300 + 275,
  y: 100 + 600 - 85,
  type: "exit",
  toScene: 5,
  toX: 2500 + 275,
  toY: 100 + 600 - 85,
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2750,
  y: 700,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 1550,
  y: 500,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 1550,
  y: 700,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 1550,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 1750,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 1950,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2150,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2150,
  y: 1100,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2150,
  y: 1300,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 1950,
  y: 1300,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2350,
  y: 1300,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 1950,
  y: 1500,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2150,
  y: 1500,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2350,
  y: 1500,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2150,
  y: 1700,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2150,
  y: 1800,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2150,
  y: 1990,
  type: "change",
  toScene: 7,
  toX: 2150,
  toY: 20,
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2350,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2550,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2750,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 2950,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3150,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3350,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3550,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3750,
  y: 900,
  type: "path",
};

offlineScenes[0].scenery[offlineScenes[0].scenery.length] = {
  x: 3950,
  y: 900,
  type: "change",
  toScene: 3,
  toX: 15,
  toY: 900,
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 0,
  y: 900,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: -190,
  y: 900,
  type: "change",
  toScene: 0,
  toX: 3850,
  toY: 900,
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 200,
  y: 900,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 400,
  y: 900,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 600,
  y: 900,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 100,
  y: 500,
  type: "small-tree",
  opacity: 1,
  mining: 1,
  mined: false,
  miningSpeed: 0.01,
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 600,
  y: 500,
  type: "small-tree",
  opacity: 1,
  mining: 1,
  mined: false,
  miningSpeed: 0.01,
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 800,
  y: 900,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 900,
  y: 800,
  type: "sign",
  text: "Cave",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 1000,
  y: 900,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 1000,
  y: 700,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 1000,
  y: 500,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 1000,
  y: 300,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 1000,
  y: 100,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 800,
  y: 100,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 600,
  y: 100,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 400,
  y: 100,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 100,
  y: 0,
  type: "cave",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 295,
  y: 125,
  type: "ladder",
  toScene: 4,
  toX: 0,
  toY: 0,
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 1900,
  y: 1875,
  type: "easter egg",
}

offlineScenes[4].scenery[offlineScenes[4].scenery.length] = {
  x: 0,
  y: -80,
  type: "ladder",
  toScene: 3,
  toX: 345,
  toY: 100,
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 800,
  y: 1100,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 800,
  y: 1300,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 800,
  y: 1500,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 800,
  y: 1700,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 800,
  y: 1800,
  type: "path",
};

offlineScenes[3].scenery[offlineScenes[3].scenery.length] = {
  x: 800,
  y: 1990,
  type: "change",
  toScene: 6,
  toX: 800,
  toY: 20,
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: 800,
  y: -190,
  type: "change",
  toScene: 3,
  toX: 800,
  toY: 1800,
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: 800,
  y: 0,
  type: "path",
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: 800,
  y: 200,
  type: "path",
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: 800,
  y: 400,
  type: "path",
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: 800,
  y: 600,
  type: "path",
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: 800,
  y: 800,
  type: "path",
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: 600,
  y: 800,
  type: "path",
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: 400,
  y: 800,
  type: "path",
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: 200,
  y: 800,
  type: "path",
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: 0,
  y: 800,
  type: "path",
};

offlineScenes[6].scenery[offlineScenes[6].scenery.length] = {
  x: -190,
  y: 800,
  type: "change",
  toScene: 7,
  toX: 3860,
  toY: 800,
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 3990,
  y: 800,
  type: "change",
  toScene: 6,
  toX: 20,
  toY: 800,
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 2150,
  y: -190,
  type: "change",
  toScene: 0,
  toX: 2150,
  toY: 1860,
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 2150,
  y: 0,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 2150,
  y: 200,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 2150,
  y: 400,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 2150,
  y: 600,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 2150,
  y: 800,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 2350,
  y: 800,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 2550,
  y: 800,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 2750,
  y: 800,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 2950,
  y: 800,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 3150,
  y: 800,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 3350,
  y: 800,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 3550,
  y: 800,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 3750,
  y: 800,
  type: "path",
};

offlineScenes[7].scenery[offlineScenes[7].scenery.length] = {
  x: 3800,
  y: 800,
  type: "path",
};

function updateCave(i) {
  for (var y = 0; y < offlineScenes[i].height; y++) {
    for (var x = 0; x < offlineScenes[i].width; x++) {
      offlineScenes[i].scenery[offlineScenes[i].scenery.length] = {
        x: 200 * x,
        y: 200 * y,
        type: "box",
        opacity: 1,
      }
    }
  }

  for (var x = 0; x < offlineScenes[i].num; x++) {
    var xCord = Math.floor(Math.random() * offlineScenes[i].width);
    var yCord = Math.floor(Math.random() * offlineScenes[i].height);
    
    offlineScenes[i].scenery[offlineScenes[i].scenery.length] = {
      x: xCord * 200,
      y: yCord * 200,
      type: ores[Math.floor(Math.random() * ores.length)],
      mining: 1,
      mined: false,
    }

    if (offlineScenes[i].scenery[offlineScenes[i].scenery.length - 1].type === "diamond") {
      offlineScenes[i].scenery[offlineScenes[i].scenery.length - 1].miningSpeed = 0.00001;
    } else if (offlineScenes[i].scenery[offlineScenes[i].scenery.length - 1].type === "emerald") {
      offlineScenes[i].scenery[offlineScenes[i].scenery.length - 1].miningSpeed = 0.000009;
    } else if (offlineScenes[i].scenery[offlineScenes[i].scenery.length - 1].type === "iron") {
      offlineScenes[i].scenery[offlineScenes[i].scenery.length - 1].miningSpeed = 0.001;
    } else if (offlineScenes[i].scenery[offlineScenes[i].scenery.length - 1].type === "gold") {
      offlineScenes[i].scenery[offlineScenes[i].scenery.length - 1].miningSpeed = 0.01;
    } else if (offlineScenes[i].scenery[offlineScenes[i].scenery.length - 1].type === "ruby") {
      offlineScenes[i].scenery[offlineScenes[i].scenery.length - 1].miningSpeed = 0.0001;
    }
  }

  var intX = 0;
  var intY = 0;
  
  delete offlineScenes[i].scenery[0];

  for (var x = 0; x < offlineScenes[i].width * offlineScenes[i].height; x++) {
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
    if (intX > offlineScenes[i].width) {
      intX = offlineScenes[i].width;
    }
    if (intY > offlineScenes[i].height) {
      intY = offlineScenes[i].height;
    }

    if (intX + intY * offlineScenes[i].height < offlineScenes[i].scenery.length) {
      delete offlineScenes[i].scenery[intX + intY * offlineScenes[i].height];
    }
  }
}

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}