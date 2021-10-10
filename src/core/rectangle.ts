const rectangle = (p) => {
  const [px, py] = p.position;
  const [ox, oy] = p.oldpos;
  const {width, height} = p;

  return {
    ...p,
    top: py,
    bottom: py + height,
    left: px,
    right: px + width,
    oldtop: oy,
    oldbottom: oy + height,
    oldleft: ox,
    oldright: ox + width,
  };
};

export {rectangle};
