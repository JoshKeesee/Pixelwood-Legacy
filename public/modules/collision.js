function colliding(r1, r2) {
  return !(r1.x > r2.x + r2.w || r1.x + r1.w < r2.x || r1.y > r2.y + r2.h || r1.y + r1.h < r2.y);
}

function colR(r1, r2) {
  return (r1.x - 2 < r2.x + r2.w && r1.x - 2 > r2.x + r2.w - 20);
}

function colL(r1, r2) {
  return (r1.x + r1.w + 2 > r2.x && r1.x + r1.w + 2 < r2.x + 20);
}

function colB(r1, r2) {
  return (r1.y - 2 < r2.y + r2.h && r1.y - 2 > r2.y + r2.h - 20);
}

function colT(r1, r2) {
  return (r1.y + r1.h + 2 > r2.y && r1.y + r1.h + 2 < r2.y + 20);
}