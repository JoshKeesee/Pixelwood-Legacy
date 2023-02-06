var ratio;
var readyToAnimate = false;
var costume;
var grass;
var dirt;
var path;
var rocks;
var tree;
var smallTree;
var flower;
var blueFlower;
var purpleFlower;
var house;
var plank;
var ladder;
var bed;
var furnace;
var chestClosed;
var chestOpen;
var glass;
var cave;
var sign;
var fountain;
var bean;
var fenceVertical;
var fenceHorizontal;
var fencePost;
var diamond;
var emerald;
var gold;
var iron;
var ruby;
var fountainWidth = 640;
var fountainHeight = 640;
var fountainFrame = 0;
const items = {};
items.sword = document.createElement("img");
items.sword.src = "/images/sword.png";
items.pickaxe = document.createElement("img");
items.pickaxe.src = "/images/pickaxe.png";
items.coal = document.createElement("img");
items.coal.src = "/images/coal.png";
items.torch = document.createElement("img");
items.torch.src = "/images/torch.png";
items.diamond = document.createElement("img");
items.diamond.src = "/images/diamond-ingot.png";
items.emerald = document.createElement("img");
items.emerald.src = "/images/emerald-ingot.png";
items.gold = document.createElement("img");
items.gold.src = "/images/gold-ingot.png";
items.iron = document.createElement("img");
items.iron.src = "/images/iron-ingot.png";
items.ruby = document.createElement("img");
items.ruby.src = "/images/ruby-ingot.png";

const images = [costume, grass, dirt, path, rocks, tree, smallTree, flower, blueFlower, purpleFlower, house, tree, ladder, bed, furnace, chestClosed, chestOpen, glass, cave, sign, fountain, bean, fenceVertical, fenceHorizontal, fencePost, emerald, diamond, gold, iron, ruby];
var counter = 0;

function incrementCounter() {
  counter++;

  if (counter === images.length - 1) {
    readyToAnimate = true;
  }
}

function loadImages() {
  costume = document.createElement("img");
  costume.src = "/images/player.png";
  costume.onload = () => {
    ratio = costume.width / costume.height;
    costume.width = ratio * (500 * 4);
    costume.height = 500 * 4;
    incrementCounter();
  };
  grass = document.createElement("img");
  grass.src = "/images/grass.png";
  grass.onload = () => {
    ratio = grass.width / grass.height;
    grass.width = ratio * 200;
    grass.height = 200;
    incrementCounter();
  }
  dirt = document.createElement("img");
  dirt.src = "/images/dirt.png";
  dirt.onload = () => {
    ratio = dirt.width / dirt.height;
    dirt.width = ratio * 200;
    dirt.height = 200;
    incrementCounter();
  }
  path = document.createElement("img");
  path.src = "/images/path.png";
  path.onload = () => {
    ratio = path.width / path.height;
    path.width = ratio * 200;
    path.height = 200;
    incrementCounter();
  }
  rocks = document.createElement("img");
  rocks.src = "/images/rocks.png";
  rocks.onload = () => {
    rocks.width = 200;
    rocks.height = 200;
    incrementCounter();
  }
  tree = document.createElement("img");
  tree.src = "/images/tree.png";
  tree.onload = () => {
    ratio = tree.width / tree.height;
    tree.width = ratio * 400;
    tree.height = 400;
    incrementCounter();
  }
  smallTree = document.createElement("img");
  smallTree.src = "/images/small-tree.png";
  smallTree.onload = () => {
    ratio = smallTree.width / smallTree.height;
    smallTree.width = ratio * 400;
    smallTree.height = 400;
    incrementCounter();
  }
  flower = document.createElement("img");
  flower.src = "/images/flower.png";
  flower.onload = () => {
    ratio = flower.width / flower.height;
    flower.width = ratio * 80;
    flower.height = 80;
    incrementCounter();
  }
  blueFlower = document.createElement("img");
  blueFlower.src = "/images/blue-flower.png";
  blueFlower.onload = () => {
    ratio = blueFlower.width / blueFlower.height;
    blueFlower.width = ratio * 80;
    blueFlower.height = 80;
    incrementCounter();
  }
  purpleFlower = document.createElement("img");
  purpleFlower.src = "/images/purple-flower.png";
  purpleFlower.onload = () => {
    ratio = purpleFlower.width / purpleFlower.height;
    purpleFlower.width = ratio * 80;
    purpleFlower.height = 80;
    incrementCounter();
  }
  house = document.createElement("img");
  house.src = "/images/house.png";
  house.onload = () => {
    ratio = house.width / house.height;
    house.width = ratio * 700;
    house.height = 700;
    incrementCounter();
  }
  plank = document.createElement("img");
  plank.src = "/images/plank.png";
  plank.onload = () => {
    ratio = plank.width / plank.height;
    plank.width = ratio * 200;
    plank.height = 200;
    incrementCounter();
  }
  ladder = document.createElement("img");
  ladder.src = "/images/ladder.png";
  ladder.onload = () => {
    ladder.width = 200;
    ladder.height = 90;
    incrementCounter();
  }
  bed = document.createElement("img");
  bed.src = "/images/bed.png";
  bed.onload = () => {
    ratio = bed.width / bed.height;
    bed.width = ratio * 300;
    bed.height = 300;
    incrementCounter();
  }
  furnace = document.createElement("img");
  furnace.src = "/images/furnace.png";
  furnace.onload = () => {
    ratio = furnace.width / furnace.height;
    furnace.width = ratio * 100;
    furnace.height = 100;
    incrementCounter();
  }
  chestClosed = document.createElement("img");
  chestClosed.src = "/images/chest-closed.png";
  chestClosed.onload = () => {
    ratio = chestClosed.width / chestClosed.height;
    chestClosed.width = ratio * 100;
    chestClosed.height = 100;
    incrementCounter();
  }
  chestOpen = document.createElement("img");
  chestOpen.src = "/images/chest-open.png";
  chestOpen.onload = () => {
    ratio = 1600 / 1216;
    chestOpen.width = ratio * 100;
    chestOpen.height = 150;
    incrementCounter();
  }
  glass = document.createElement("img");
  glass.src = "/images/glass.png";
  glass.onload = () => {
    ratio = glass.width / glass.height;
    glass.width = ratio * 100;
    glass.height = 80;
    incrementCounter();
  }
  cave = document.createElement("img");
  cave.src = "/images/cave.png";
  cave.onload = () => {
    ratio = cave.width / cave.height;
    cave.width = ratio * 400;
    cave.height = 400;
    incrementCounter();
  }
  sign = document.createElement("img");
  sign.src = "/images/sign.png";
  sign.onload = () => {
    ratio = sign.width / sign.height;
    sign.width = ratio * 100;
    sign.height = 100;
    incrementCounter();
  }
  fountain = document.createElement("img");
  fountain.src = "/images/fountain.png";
  fountain.onload = () => {
    ratio = fountain.width / fountain.height;
    fountain.width = ratio * 100;
    fountain.height = 100;
    incrementCounter();
  }
  bean = document.createElement("img");
  bean.src = "/images/bean.jpg";
  bean.onload = () => {
    ratio = bean.width / bean.height;
    bean.width = ratio * 200;
    bean.height = 200;
    incrementCounter();
  }
  emerald = document.createElement("img");
  emerald.src = "/images/emerald.png";
  emerald.onload = () => {
    ratio = emerald.width / emerald.height;
    emerald.width = ratio * 200;
    emerald.height = 200;
    incrementCounter();
  }
  diamond = document.createElement("img");
  diamond.src = "/images/diamond.png";
  diamond.onload = () => {
    ratio = diamond.width / diamond.height;
    diamond.width = ratio * 200;
    diamond.height = 200;
    incrementCounter();
  }
  iron = document.createElement("img");
  iron.src = "/images/iron.png";
  iron.onload = () => {
    ratio = iron.width / iron.height;
    iron.width = ratio * 200;
    iron.height = 200;
    incrementCounter();
  }
  gold = document.createElement("img");
  gold.src = "/images/gold.png";
  gold.onload = () => {
    ratio = gold.width / gold.height;
    gold.width = ratio * 200;
    gold.height = 200;
    incrementCounter();
  }
  ruby = document.createElement("img");
  ruby.src = "/images/ruby.png";
  ruby.onload = () => {
    ratio = ruby.width / ruby.height;
    ruby.width = ratio * 200;
    ruby.height = 200;
    incrementCounter();
  }
  fenceHorizontal = document.createElement("img");
  fenceHorizontal.src = "/images/fence-horizontal.png";
  fenceHorizontal.onload = () => {
    ratio = fenceHorizontal.height / fenceHorizontal.width;
    fenceHorizontal.width = 100;
    fenceHorizontal.height = ratio * 100;
    incrementCounter();
    fencePost = document.createElement("img");
    fencePost.src = "/images/fence-post.png";
    fencePost.onload = () => {
      ratio = fencePost.width / fencePost.height;
      fencePost.width = ratio * fenceHorizontal.height;
      fencePost.height = fenceHorizontal.height;
      incrementCounter();
      fenceVertical = document.createElement("img");
      fenceVertical.src = "/images/fence-vertical.png";
      fenceVertical.onload = () => {
        ratio = fenceVertical.height / fenceVertical.width;
        fenceVertical.width = fencePost.width;
        fenceVertical.height = ratio * fencePost.width;
        incrementCounter();
      }
    }
  }
}