// import {
//   IconLookup,
//   IconDefinition,
//   findIconDefinition,
// } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import styled from "styled-components";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";

// library.add(fas);

// const playLookup: IconLookup = { prefix: "fas", iconName: "play" };
// const pauseLookup: IconLookup = { prefix: "fas", iconName: "pause" };

// export const playIcon: IconDefinition = findIconDefinition(playLookup);
// export const pauseIcon: IconDefinition = findIconDefinition(pauseLookup);

// const volumeLookup: IconLookup = { prefix: "fas", iconName: "volume-low" };
// const muteVolumeLookup: IconLookup = { prefix: "fas", iconName: "volume-mute" };

// export const volumeIcon: IconDefinition = findIconDefinition(volumeLookup);
// export const muteVolumeIcon: IconDefinition =
//   findIconDefinition(muteVolumeLookup);

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import { FiVolume2, FiVolumeX } from "react-icons/fi";

export const VolumeIcon = FiVolume2;
export const MuteVolumeIcon = FiVolumeX;

export const PlayIcon = BsFillPlayFill;
export const PauseIcon = BsFillPauseFill;
