import { getProject, types } from "@theatre/core";

type Key = [number, number]; // [seconds, value]
const track = (id: string, name: string, keys: Key[]) => ({
  id,
  name,
  data: {
    type: "BasicKeyframedTrack",
    __debugName: `Scene:${name}`,
    keyframes: keys.map(([position, value], i) => ({
      id: `${id}k${i}`,
      position,
      connectedRight: true,
      handles: [0.5, 1, 0.5, 0],
      type: "bezier",
      value,
    })),
  },
});

export const SEQ_LENGTH = 10;

// Choreography authored as Theatre.js keyframes (normally exported from Theatre Studio).
const tracks = [
  track("t1", "camZ", [[0, 7.5], [3, 5.4], [6, 4.4], [10, 6.8]]),
  track("t2", "camY", [[0, 0.2], [5, -0.7], [10, 0.5]]),
  track("t3", "rotY", [[0, 0], [10, Math.PI * 1.6]]),
  track("t4", "twist", [[0, 0.25], [4, 1], [7, 0.45], [10, 1.5]]),
  track("t5", "mix", [[0, 0], [5, 0.55], [10, 1]]),
];

const state = {
  sheetsById: {
    Scroll: {
      staticOverrides: { byObject: {} },
      sequence: {
        subUnitsPerUnit: 30,
        length: SEQ_LENGTH,
        type: "PositionalSequence",
        tracksByObject: {
          Scene: {
            trackData: Object.fromEntries(tracks.map((t) => [t.id, t.data])),
            trackIdByPropPath: Object.fromEntries(
              tracks.map((t) => [JSON.stringify([t.name]), t.id]),
            ),
          },
        },
      },
    },
  },
  definitionVersion: "0.4.0",
  revisionHistory: [],
};

export function createScrollRig() {
  const project = getProject("Makura", { state: state as never });
  const sheet = project.sheet("Scroll");
  const scene = sheet.object("Scene", {
    camZ: types.number(7.5, { range: [2, 12] }),
    camY: 0.2,
    rotY: 0,
    twist: 0.25,
    mix: 0,
  });
  return { sheet, scene };
}
