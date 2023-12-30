import { KarabinerRules, KeyCode, Modifiers } from "./types";
import { createHyperSubLayers, remap, remapFrom } from "./utils";

export const HyperKeyModifiers: Modifiers = {
    mandatory: [
        "left_command",
        "left_control",
        "left_shift",
        "left_option"
    ]
};

export default [
    // Define the Hyper key itself
    {
        description: "Hyper Key (⌃⌥⇧⌘)",
        manipulators: [
            {
                description: "Caps Lock -> Hyper Key",
                from: {
                    key_code: "caps_lock",
                },
                to: [
                    {
                        key_code: "left_shift",
                        modifiers: ["left_command", "left_control", "left_option"]
                    }
                ],
                to_if_alone: [
                    {
                        key_code: "caps_lock",
                    },
                ],
                type: "basic",
            },
        ],
    },
    remapFrom("h", HyperKeyModifiers, "left_arrow"),
    remapFrom("j", HyperKeyModifiers, "down_arrow"),
    remapFrom("k", HyperKeyModifiers, "up_arrow"),
    remapFrom("l", HyperKeyModifiers, "right_arrow"),
    ...createHyperSubLayers({
        // c = Musi*c* which isn't "m" because we want it to be on the left hand
        c: {
            p: remap("play_or_pause"),
            n: remap("fastforward"),
            b: remap("rewind"),
        },
        s: {
            u: remap("volume_increment"),
            j: remap("volume_decrement"),
            i: remap("display_brightness_increment"),
            k: remap("display_brightness_decrement"),
            l: remap("q", ["right_control", "right_command"]),
        },

    }),
] as KarabinerRules[];

